import { useState } from 'react';
import {
  addSummary,
  getSummariesByKeyword,
  updateSummary,
  deleteSummary
} from './SummaryApi';

const AddSummary = () => {
  const [summaryID, setSummaryID] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState('');
  const [rating, setRating] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const buildPayload = () => ({
    summaryID,
    originalText,
    summary,
    keywords: keywords
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    rating: Number(rating),
    wordCount: Number(wordCount)
  });

  const handleAdd = async () => {
    try {
      setMessage('');
      const created = await addSummary(buildPayload());
      setMessage(`Added summary ${created.summaryID}`);
    } catch {
      setMessage('Add failed');
    }
  };

  const handleSearch = async () => {
    try {
      setMessage('');
      const summaries = await getSummariesByKeyword(searchKeyword);
      setResults(summaries ?? []);
      setMessage(`Found ${summaries?.length ?? 0} summaries`);
    } catch {
      setMessage('Search failed');
    }
  };

  const handleUpdate = async () => {
    try {
      setMessage('');
      const updated = await updateSummary(summaryID, buildPayload());
      setMessage(updated ? `Updated summary ${summaryID}` : 'Summary not found');
    } catch {
      setMessage('Update failed');
    }
  };

  const handleDelete = async () => {
    try {
      setMessage('');
      const deleted = await deleteSummary(summaryID);
      setMessage(deleted ? `Deleted summary ${summaryID}` : 'Summary not found');
    } catch {
      setMessage('Delete failed');
    }
  };

  return (
    <section>
      <h2>Summary Management</h2>

      <div className="field-grid">
        <input value={summaryID} onChange={(event) => setSummaryID(event.target.value)} placeholder="Summary ID" />
        <input value={originalText} onChange={(event) => setOriginalText(event.target.value)} placeholder="Original Text" />
        <input value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Summary" />
        <input value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="Keywords (comma-separated)" />
        <input value={rating} onChange={(event) => setRating(event.target.value)} placeholder="Rating" type="number" step="0.1" />
        <input value={wordCount} onChange={(event) => setWordCount(event.target.value)} placeholder="Word Count" type="number" />
      </div>

      <div className="button-row">
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <div className="search-row">
        <input
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="Search by keyword"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {message && <p>{message}</p>}

      <ul>
        {results.map((item) => (
          <li key={item.summaryID}>
            <strong>{item.summaryID}</strong>: {item.summary}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AddSummary;