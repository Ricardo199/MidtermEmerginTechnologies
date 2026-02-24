import AppHeader from './components/AppHeader';
import AddSummary from './components/AddSummary';

const App = () => {
  return (
    <main className="app-shell">
      <div className="app-content">
        <AppHeader />
        <AddSummary />
      </div>
    </main>
  );
};

export default App;