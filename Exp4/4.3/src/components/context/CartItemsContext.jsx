import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const CartItemsContext = () => {
  const { cart, removeItem } = useContext(CartContext);

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Cart Items</h3>
      {cart.length === 0 ? (
        <p style={emptyStyle}>No items in cart</p>
      ) : (
        <div style={itemsListStyle}>
          {cart.map((item) => (
            <div key={item.id} style={itemStyle}>
              <div style={itemInfoStyle}>
                <p style={itemNameStyle}>{item.name}</p>
                <p style={quantityStyle}>Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                style={removeButtonStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#c82333')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#dc3545')}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px'
};

const titleStyle = {
  marginBottom: '15px',
  color: '#333'
};

const emptyStyle = {
  color: '#999',
  fontStyle: 'italic'
};

const itemsListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f9f9f9',
  borderRadius: '4px',
  borderLeft: '4px solid #007bff'
};

const itemInfoStyle = {
  flex: 1
};

const itemNameStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333',
  margin: 0
};

const quantityStyle = {
  fontSize: '12px',
  color: '#666',
  margin: '4px 0 0 0'
};

const removeButtonStyle = {
  padding: '6px 12px',
  fontSize: '12px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};
