import { Form, Row, Col } from 'react-bootstrap';

const SummaryForm = ({ formState, autoWordCount, onFieldChange }) => {
  return (
    <>
      <h3 className="subsection-title">Summary Details</h3>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label htmlFor="summaryId">Summary ID</Form.Label>
            <Form.Control
              id="summaryId"
              value={formState.summaryID}
              onChange={(event) => onFieldChange('summaryID', event.target.value)}
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
              value={formState.originalText}
              onChange={(event) => onFieldChange('originalText', event.target.value)}
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
              value={formState.summary}
              onChange={(event) => onFieldChange('summary', event.target.value)}
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
              value={formState.keywords}
              onChange={(event) => onFieldChange('keywords', event.target.value)}
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
              value={formState.rating}
              onChange={(event) => onFieldChange('rating', event.target.value)}
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
              value={formState.wordCount}
              onChange={(event) => onFieldChange('wordCount', event.target.value)}
              placeholder={String(autoWordCount)}
              type="number"
              min="0"
            />
            <Form.Text muted>Leave empty to use detected count.</Form.Text>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default SummaryForm;