import { Button, ButtonGroup } from 'react-bootstrap';

const SummaryActions = ({ isBusy, onAdd, onUpdate }) => {
  return (
    <div className="actions-row mt-3">
      <ButtonGroup aria-label="Summary actions">
        <Button type="button" onClick={onAdd} disabled={isBusy}>Add</Button>
        <Button type="button" variant="warning" onClick={onUpdate} disabled={isBusy}>Update</Button>
      </ButtonGroup>
    </div>
  );
};

export default SummaryActions;