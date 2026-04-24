import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export const ThemeToggle = () => {
  // Consume global state - theme
  const { theme, toggleTheme } = useContext(GlobalContext);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Theme Component</h2>
      <p style={{ fontSize: '18px', marginBottom: '15px' }}>
        Current Theme: <strong>{theme.toUpperCase()}</strong>
      </p>
      <button onClick={toggleTheme} style={buttonStyle}>
        Toggle Theme
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.2s'
};
