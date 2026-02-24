import { Table, Badge } from 'react-bootstrap';

const SummaryResults = ({ results }) => {
  return (
    <>
      <div className="results-header">
        <h3 className="subsection-title mb-0">Results</h3>
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
    </>
  );
};

export default SummaryResults;