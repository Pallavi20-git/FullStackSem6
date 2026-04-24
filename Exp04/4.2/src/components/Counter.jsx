import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../features/counter/counterSlice';

export const Counter = () => {
  // Access Redux state using useSelector
  const count = useSelector((state) => state.counter.value);

  // Access dispatch function
  const dispatch = useDispatch();

  return (
    <div style={containerStyle}>
      <h1>Redux Counter</h1>
      <div style={displayStyle}>
        <p style={labelStyle}>Count:</p>
        <p style={countStyle}>{count}</p>
      </div>
      <div style={buttonsStyle}>
        <button
          onClick={() => dispatch(decrement())}
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#dc3545')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(increment())}
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#27ae60')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#2ecc71')}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '12px',
  padding: '40px 20px',
  maxWidth: '500px',
  margin: '0 auto',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
};

const displayStyle = {
  marginBottom: '40px',
  textAlign: 'center'
};

const labelStyle = {
  fontSize: '18px',
  color: '#555',
  marginBottom: '10px'
};

const countStyle = {
  fontSize: '64px',
  fontWeight: 'bold',
  color: '#667eea',
  margin: 0
};

const buttonsStyle = {
  display: 'flex',
  gap: '15px'
};

const buttonStyle = {
  padding: '12px 30px',
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: '#2ecc71',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
};
