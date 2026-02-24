import { Form, Row, Col, Button } from 'react-bootstrap';

const SummarySearch = ({ searchKeyword, setSearchKeyword, onSearch, onShowAll, isBusy }) => {
  return (
    <>
      <h3 className="subsection-title">Keyword Search</h3>
      <Row className="g-2 align-items-end">
        <Col md={7}>
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
        <Col md={3}>
          <Button type="button" className="w-100" variant="secondary" onClick={onSearch} disabled={isBusy}>
            Search
          </Button>
        </Col>
        <Col md={2}>
          <Button type="button" className="w-100" variant="outline-secondary" onClick={onShowAll} disabled={isBusy}>
            Show All
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SummarySearch;