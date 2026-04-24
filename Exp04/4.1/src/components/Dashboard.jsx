import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Counter } from './Counter';
import { ThemeToggle } from './ThemeToggle';

export const Dashboard = () => {
  // Consume global state to display theme
  const { theme } = useContext(GlobalContext);

  const bgColor = theme === 'light' ? '#ffffff' : '#1e1e1e';
  const textColor = theme === 'light' ? '#000000' : '#ffffff';

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        minHeight: '100vh',
        padding: '40px 20px',
        transition: 'all 0.3s'
      }}
    >
      <h1 style={{ marginBottom: '30px' }}>Global State Management Demo</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <ThemeToggle />
        <Counter />
      </div>
    </div>
  );
};
