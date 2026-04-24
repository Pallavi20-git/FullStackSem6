import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const CartCountContext = () => {
  const { cartCount } = useContext(CartContext);

  return (
    <div style={containerStyle}>
      <span style={badgeStyle}>{cartCount}</span>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  alignItems: 'center'
};

const badgeStyle = {
  display: 'inline-block',
  backgroundColor: '#ff6b6b',
  color: 'white',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  lineHeight: '24px',
  textAlign: 'center',
  fontSize: '12px',
  fontWeight: 'bold'
};
