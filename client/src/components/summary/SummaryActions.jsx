import { Button, ButtonGroup } from 'react-bootstrap';

const SummaryActions = ({ isBusy, onAdd, onUpdate, onDelete }) => {
  return (
    <div className="actions-row mt-3">
      <ButtonGroup aria-label="Summary actions">
        <Button type="button" onClick={onAdd} disabled={isBusy}>Add</Button>
        <Button type="button" variant="warning" onClick={onUpdate} disabled={isBusy}>Update</Button>
        <Button type="button" variant="danger" onClick={onDelete} disabled={isBusy}>Delete</Button>
      </ButtonGroup>
    </div>
  );
};

export default SummaryActions;