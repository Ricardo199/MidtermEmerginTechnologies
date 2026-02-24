import { useEffect, useMemo, useState } from 'react';
import {
  getAllSummaries,
  addSummary,
  getSummariesByKeyword,
  updateSummary,
  deleteSummary
} from '../SummaryApi';

// Initial state used when creating a new summary.
const defaultFormState = {
  summaryID: '',
  originalText: '',
  summary: '',
  keywords: '',
  rating: '',
  wordCount: ''
};

export const useSummaryManager = () => {
  // UI and form state.
  const [formState, setFormState] = useState(defaultFormState);
  const [editingSummaryID, setEditingSummaryID] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [isMessageFading, setIsMessageFading] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  // Parse keywords from comma-separated input.
  const keywordList = useMemo(
    () =>
      formState.keywords
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    [formState.keywords]
  );

  // Compute a fallback word count from original text.
  const autoWordCount = useMemo(() => {
    const text = formState.originalText.trim();
    return text ? text.split(/\s+/).length : 0;
  }, [formState.originalText]);

  // Generic field setter for controlled inputs.
  const updateField = (name, value) => {
    if (name === 'summaryID' && value !== editingSummaryID) {
      setEditingSummaryID('');
    }

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Normalized payload shape expected by GraphQL mutations.
  const payload = {
    summaryID: formState.summaryID,
    originalText: formState.originalText,
    summary: formState.summary,
    keywords: keywordList,
    rating: Number(formState.rating),
    wordCount: Number(formState.wordCount || autoWordCount)
  };

  // Basic client-side validation before write operations.
  const validatePayload = () => {
    if (!payload.summaryID.trim() || !payload.originalText.trim() || !payload.summary.trim()) {
      return 'Summary ID, Original Text, and Summary are required.';
    }

    if (keywordList.length === 0) {
      return 'Please provide at least one keyword.';
    }

    if (Number.isNaN(payload.rating) || payload.rating < 1 || payload.rating > 5) {
      return 'Rating must be between 1 and 5.';
    }

    if (Number.isNaN(payload.wordCount) || payload.wordCount < 0) {
      return 'Word count must be 0 or greater.';
    }

    return null;
  };

  // Shared wrapper for async actions with message handling.
  const runWithStatus = async (work, failureText) => {
    try {
      setIsBusy(true);
      setMessage('');
      setIsMessageFading(false);
      setMessageType('success');
      await work();
    } catch {
      setIsMessageFading(false);
      setMessageType('danger');
      setMessage(failureText);
    } finally {
      setIsBusy(false);
    }
  };

  // Load full summary list from API.
  const loadAllSummaries = async () => {
    const summaries = await getAllSummaries();
    setResults(summaries ?? []);
  };

  // Initial data fetch.
  useEffect(() => {
    runWithStatus(async () => {
      await loadAllSummaries();
      setMessage(`Loaded summaries`);
    }, 'Failed to load summaries');
  }, []);

  // Fade out success messages after a short delay.
  useEffect(() => {
    if (!message || messageType !== 'success') {
      setIsMessageFading(false);
      return;
    }

    const fadeTimeoutId = setTimeout(() => {
      setIsMessageFading(true);
    }, 1800);

    const clearTimeoutId = setTimeout(() => {
      setMessage('');
      setIsMessageFading(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimeoutId);
      clearTimeout(clearTimeoutId);
    };
  }, [message, messageType]);

  // Create summary flow.
  const handleAdd = async () => {
    const validationError = validatePayload();
    if (validationError) {
      setMessageType('danger');
      setMessage(validationError);
      return;
    }

    await runWithStatus(async () => {
      const created = await addSummary(payload);
      await loadAllSummaries();
      setMessage(`Added summary ${created.summaryID}`);
    }, 'Add failed');
  };

  // Update summary flow.
  const handleUpdate = async () => {
    const validationError = validatePayload();
    if (validationError) {
      setMessageType('danger');
      setMessage(validationError);
      return;
    }

    await runWithStatus(async () => {
      const updated = await updateSummary(payload.summaryID, payload);
      await loadAllSummaries();
      if (updated) {
        setFormState(defaultFormState);
        setEditingSummaryID('');
      }
      setMessage(updated ? `Updated summary ${payload.summaryID}` : 'Summary not found');
    }, 'Update failed');
  };

  // Delete summary flow.
  const handleDeleteSummary = async (summaryID) => {
    const confirmed = window.confirm(`Delete summary ${summaryID}? This action cannot be undone.`);
    if (!confirmed) {
      return;
    }

    await runWithStatus(async () => {
      const deleted = await deleteSummary(summaryID);
      await loadAllSummaries();
      if (formState.summaryID === summaryID) {
        setFormState(defaultFormState);
        setEditingSummaryID('');
      }
      setMessage(deleted ? `Deleted summary ${summaryID}` : 'Summary not found');
    }, 'Delete failed');
  };

  // Search by keyword. Empty query restores full list.
  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      await runWithStatus(async () => {
        await loadAllSummaries();
        setMessage('Showing all summaries');
      }, 'Failed to load summaries');
      return;
    }

    await runWithStatus(async () => {
      const summaries = await getSummariesByKeyword(searchKeyword);
      setResults(summaries ?? []);
      setMessage(`Found ${summaries?.length ?? 0} summaries`);
    }, 'Search failed');
  };

  // Explicitly restore full list.
  const handleShowAll = async () => {
    await runWithStatus(async () => {
      await loadAllSummaries();
      setMessage('Showing all summaries');
    }, 'Failed to load summaries');
  };

  // Load selected row data into form for editing.
  const handleEditSummary = (summaryItem) => {
    setFormState({
      summaryID: summaryItem.summaryID ?? '',
      originalText: summaryItem.originalText ?? '',
      summary: summaryItem.summary ?? '',
      keywords: (summaryItem.keywords ?? []).join(', '),
      rating: summaryItem.rating != null ? String(summaryItem.rating) : '',
      wordCount: summaryItem.wordCount != null ? String(summaryItem.wordCount) : ''
    });
    setEditingSummaryID(summaryItem.summaryID ?? '');

    setMessageType('success');
    setMessage(`Loaded summary ${summaryItem.summaryID} into form for editing`);
  };

  // Update is enabled only when editing an existing row.
  const canUpdate =
    Boolean(editingSummaryID) && formState.summaryID.trim() === editingSummaryID;

  return {
    formState,
    updateField,
    searchKeyword,
    setSearchKeyword,
    results,
    message,
    messageType,
    isMessageFading,
    isBusy,
    canUpdate,
    autoWordCount,
    handleAdd,
    handleUpdate,
    handleDeleteSummary,
    handleSearch,
    handleShowAll,
    handleEditSummary
  };
};