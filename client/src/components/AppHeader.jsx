import { Card } from 'react-bootstrap';

const AppHeader = () => {
  return (
    <Card className="mb-4 header-card">
      <Card.Body className="app-header">
        <h1 className="mb-2">Summary Manager</h1>
        <p className="mb-0">
          Manage summaries with a clean React Vite UI backed by your GraphQL API.
        </p>
      </Card.Body>
    </Card>
  );
};

export default AppHeader;