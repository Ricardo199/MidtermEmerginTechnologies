import { Button, ButtonGroup } from 'react-bootstrap';

// Create/update action buttons.
const SummaryActions = ({ isBusy, canUpdate, onAdd, onUpdate }) => {
  return (
    <div className="actions-row mt-3">
      <ButtonGroup aria-label="Summary actions">
        <Button type="button" onClick={onAdd} disabled={isBusy}>Add</Button>
        <Button type="button" variant="warning" onClick={onUpdate} disabled={isBusy || !canUpdate}>Update</Button>
      </ButtonGroup>
    </div>
  );
};

export default SummaryActions;