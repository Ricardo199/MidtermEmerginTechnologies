import { Form, Row, Col, Button } from 'react-bootstrap';

const SummarySearch = ({ searchKeyword, setSearchKeyword, onSearch, isBusy }) => {
  return (
    <>
      <h3 className="subsection-title">Keyword Search</h3>
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
          <Button type="button" className="w-100" variant="secondary" onClick={onSearch} disabled={isBusy}>
            Search
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SummarySearch;