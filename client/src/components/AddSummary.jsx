import { useState } from 'react';
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

        <Form>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Summary ID</Form.Label>
                <Form.Control
                  value={summaryID}
                  onChange={(event) => setSummaryID(event.target.value)}
                  placeholder="e.g. S-001"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Original Text</Form.Label>
                <Form.Control
                  value={originalText}
                  onChange={(event) => setOriginalText(event.target.value)}
                  placeholder="Original content"
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Summary</Form.Label>
                <Form.Control
                  value={summary}
                  onChange={(event) => setSummary(event.target.value)}
                  placeholder="Short summary"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Keywords</Form.Label>
                <Form.Control
                  value={keywords}
                  onChange={(event) => setKeywords(event.target.value)}
                  placeholder="keyword1, keyword2"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  placeholder="1.0 - 5.0"
                  type="number"
                  step="0.1"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Word Count</Form.Label>
                <Form.Control
                  value={wordCount}
                  onChange={(event) => setWordCount(event.target.value)}
                  placeholder="0"
                  type="number"
                />
              </Form.Group>
            </Col>
          </Row>

          <Stack direction="horizontal" gap={2} className="mt-3 flex-wrap">
            <Button onClick={handleAdd} disabled={isBusy}>Add</Button>
            <Button variant="warning" onClick={handleUpdate} disabled={isBusy}>Update</Button>
            <Button variant="danger" onClick={handleDelete} disabled={isBusy}>Delete</Button>
          </Stack>
        </Form>

        <hr />

        <Row className="g-2 align-items-end">
          <Col md={8}>
            <Form.Group>
              <Form.Label>Find by Keyword</Form.Label>
              <Form.Control
                value={searchKeyword}
                onChange={(event) => setSearchKeyword(event.target.value)}
                placeholder="Enter a keyword"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button className="w-100" variant="secondary" onClick={handleSearch} disabled={isBusy}>
              Search
            </Button>
          </Col>
        </Row>

        {message && (
          <Alert className="mt-3 mb-3" variant={messageType}>
            {message}
          </Alert>
        )}

        <div className="results-header">
          <h3 className="mb-0">Results</h3>
          <Badge bg="dark">{results.length}</Badge>
        </div>

        <Table responsive bordered hover size="sm" className="mt-2 mb-0">
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