import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export const Counter = () => {
  // Consume global state using useContext
  const { count, incrementCount, decrementCount, resetCount } = useContext(GlobalContext);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Counter Component</h2>
      <p style={{ fontSize: '24px', marginBottom: '20px' }}>
        Count: <strong>{count}</strong>
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={decrementCount} style={buttonStyle}>
          Decrease
        </button>
        <button onClick={incrementCount} style={buttonStyle}>
          Increase
        </button>
        <button onClick={resetCount} style={buttonStyle}>
          Reset
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.2s'
};
