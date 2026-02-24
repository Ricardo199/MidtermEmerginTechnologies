import AppHeader from './components/AppHeader';
import AddSummary from './components/AddSummary';
import { Container, Row, Col } from 'react-bootstrap';

// Top-level page layout.
const App = () => {
  return (
    <main className="app-shell">
      <Container className="app-content py-4">
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <AppHeader />
            <AddSummary />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default App;