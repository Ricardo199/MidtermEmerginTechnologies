import { Card, Form, Alert } from 'react-bootstrap';
import { useSummaryManager } from './summary/useSummaryManager';
import SummaryForm from './summary/SummaryForm';
import SummaryActions from './summary/SummaryActions';
import SummarySearch from './summary/SummarySearch';
import SummaryResults from './summary/SummaryResults';

const AddSummary = () => {
  const {
    formState,
    updateField,
    searchKeyword,
    setSearchKeyword,
    results,
    message,
    messageType,
    isBusy,
    autoWordCount,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleSearch,
    handleShowAll,
    handleEditSummary
  } = useSummaryManager();

  return (
    <Card className="panel-card">
      <Card.Body>
        <h2 className="section-title mb-3">Summary Management</h2>

        <Form onSubmit={(event) => event.preventDefault()}>
          <SummaryForm
            formState={formState}
            autoWordCount={autoWordCount}
            onFieldChange={updateField}
          />
          <SummaryActions
            isBusy={isBusy}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </Form>

        <hr className="my-4" />

        <SummarySearch
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          onSearch={handleSearch}
          onShowAll={handleShowAll}
          isBusy={isBusy}
        />

        {message && (
          <Alert className="mt-3 mb-3" variant={messageType} role="status" aria-live="polite">
            {message}
          </Alert>
        )}

        <SummaryResults results={results} onEdit={handleEditSummary} />
      </Card.Body>
    </Card>
  );
};

export default AddSummary;