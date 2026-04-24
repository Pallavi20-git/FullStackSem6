import { GlobalProvider } from './context/GlobalContext';
import { Dashboard } from './components/Dashboard';

export default function App() {
  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  );
}
