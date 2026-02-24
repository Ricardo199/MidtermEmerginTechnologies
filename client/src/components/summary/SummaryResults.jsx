import { Table, Badge, Button } from 'react-bootstrap';

const SummaryResults = ({ results, onEdit, onDelete, isBusy }) => {
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
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
                <td colSpan={6} className="text-center py-3">No summaries to display</td>
            </tr>
          ) : (
            results.map((item) => (
              <tr key={item.summaryID}>
                <td>{item.summaryID}</td>
                <td>{item.summary}</td>
                <td>{(item.keywords ?? []).join(', ')}</td>
                <td>{item.rating}</td>
                <td>{item.wordCount}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button type="button" size="sm" variant="outline-primary" onClick={() => onEdit(item)}>
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline-danger"
                        onClick={() => onDelete(item.summaryID)}
                        disabled={isBusy}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default SummaryResults;