import { useMemo, useState } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Stack,
  Alert,
  Table,
  Badge
} from 'react-bootstrap';
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
  const [messageType, setMessageType] = useState('success');
  const [isBusy, setIsBusy] = useState(false);

  const keywordList = useMemo(
    () =>
      keywords
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    [keywords]
  );

  const autoWordCount = useMemo(() => {
    return originalText.trim() ? originalText.trim().split(/\s+/).length : 0;
  }, [originalText]);

  const buildPayload = () => ({
    summaryID,
    originalText,
    summary,
    keywords: keywordList,
    rating: Number(rating),
    wordCount: Number(wordCount || autoWordCount)
  });

  const validatePayload = () => {
    if (!summaryID.trim() || !originalText.trim() || !summary.trim()) {
      return 'Summary ID, Original Text, and Summary are required.';
    }

    if (keywordList.length === 0) {
      return 'Please provide at least one keyword.';
    }

    const ratingValue = Number(rating);
    if (Number.isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      return 'Rating must be between 1 and 5.';
    }

    const wordCountValue = Number(wordCount || autoWordCount);
    if (Number.isNaN(wordCountValue) || wordCountValue < 0) {
      return 'Word count must be 0 or greater.';
    }

    return null;
  };

  const handleAdd = async () => {
    const validationError = validatePayload();
    if (validationError) {
      setMessageType('danger');
      setMessage(validationError);
      return;
    }

    try {
      setIsBusy(true);
      setMessage('');
      setMessageType('success');
      const created = await addSummary(buildPayload());
      setMessage(`Added summary ${created.summaryID}`);
    } catch {
      setMessageType('danger');
      setMessage('Add failed');
    } finally {
      setIsBusy(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsBusy(true);
      setMessage('');
      setMessageType('success');
      const summaries = await getSummariesByKeyword(searchKeyword);
      setResults(summaries ?? []);
      setMessage(`Found ${summaries?.length ?? 0} summaries`);
    } catch {
      setMessageType('danger');
      setMessage('Search failed');
    } finally {
      setIsBusy(false);
    }
  };

  const handleUpdate = async () => {
    const validationError = validatePayload();
    if (validationError) {
      setMessageType('danger');
      setMessage(validationError);
      return;
    }

    try {
      setIsBusy(true);
      setMessage('');
      setMessageType('success');
      const updated = await updateSummary(summaryID, buildPayload());
      setMessage(updated ? `Updated summary ${summaryID}` : 'Summary not found');
    } catch {
      setMessageType('danger');
      setMessage('Update failed');
    } finally {
      setIsBusy(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsBusy(true);
      setMessage('');
      setMessageType('success');
      const deleted = await deleteSummary(summaryID);
      setMessage(deleted ? `Deleted summary ${summaryID}` : 'Summary not found');
    } catch {
      setMessageType('danger');
      setMessage('Delete failed');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Card className="panel-card">
      <Card.Body>
        <h2 className="section-title">Summary Management</h2>

        <Form onSubmit={(event) => event.preventDefault()}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="summaryId">Summary ID</Form.Label>
                <Form.Control
                  id="summaryId"
                  value={summaryID}
                  onChange={(event) => setSummaryID(event.target.value)}
                  placeholder="e.g. S-001"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="originalText">Original Text</Form.Label>
                <Form.Control
                  id="originalText"
                  value={originalText}
                  onChange={(event) => setOriginalText(event.target.value)}
                  placeholder="Original content"
                  required
                />
                <Form.Text muted>Detected words: {autoWordCount}</Form.Text>
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label htmlFor="summaryText">Summary</Form.Label>
                <Form.Control
                  id="summaryText"
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  placeholder="Short summary"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor="keywords">Keywords</Form.Label>
                <Form.Control
                  id="keywords"
                  value={keywords}
                  onChange={(event) => setKeywords(event.target.value)}
                  placeholder="keyword1, keyword2"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label htmlFor="rating">Rating</Form.Label>
                <Form.Control
                  id="rating"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  placeholder="1.0 - 5.0"
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label htmlFor="wordCount">Word Count</Form.Label>
                <Form.Control
                  id="wordCount"
                  value={wordCount}
                  onChange={(event) => setWordCount(event.target.value)}
                  placeholder={String(autoWordCount)}
                  type="number"
                  min="0"
                />
                <Form.Text muted>Leave empty to use detected count.</Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Stack direction="horizontal" gap={2} className="mt-3 flex-wrap">
            <Button type="button" onClick={handleAdd} disabled={isBusy}>Add</Button>
            <Button type="button" variant="warning" onClick={handleUpdate} disabled={isBusy}>Update</Button>
            <Button type="button" variant="danger" onClick={handleDelete} disabled={isBusy}>Delete</Button>
          </Stack>
        </Form>

        <hr />

        <Row className="g-2 align-items-end">
          <Col md={8}>
            <Form.Group>
              <Form.Label htmlFor="keywordSearch">Find by Keyword</Form.Label>
              <Form.Control
                id="keywordSearch"
                value={searchKeyword}
                onChange={(event) => setSearchKeyword(event.target.value)}
                placeholder="Enter a keyword"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button type="button" className="w-100" variant="secondary" onClick={handleSearch} disabled={isBusy}>
              Search
            </Button>
          </Col>
        </Row>

        {message && (
          <Alert className="mt-3 mb-3" variant={messageType} role="status" aria-live="polite">
            {message}
          </Alert>
        )}

        <div className="results-header">
          <h3 className="mb-0">Results</h3>
          <Badge bg="dark">{results.length}</Badge>
        </div>

        <Table responsive bordered hover size="sm" className="mt-2 mb-0">
          <caption className="table-caption">Summary search results</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Summary</th>
              <th>Keywords</th>
              <th>Rating</th>
              <th>Words</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-3">No summaries to display</td>
              </tr>
            ) : (
              results.map((item) => (
                <tr key={item.summaryID}>
                  <td>{item.summaryID}</td>
                  <td>{item.summary}</td>
                  <td>{(item.keywords ?? []).join(', ')}</td>
                  <td>{item.rating}</td>
                  <td>{item.wordCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default AddSummary;