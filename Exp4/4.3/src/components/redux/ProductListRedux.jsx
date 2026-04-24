import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { PRODUCTS } from '../../data/ProductData';

export const ProductListRedux = () => {
  const dispatch = useDispatch();

  const handleAddItem = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Products</h3>
      <div style={productGridStyle}>
        {PRODUCTS.map((product) => (
          <div key={product.id} style={productCardStyle}>
            <p style={productNameStyle}>{product.name}</p>
            <p style={categoryStyle}>{product.category}</p>
            <button
              onClick={() => handleAddItem(product)}
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#28a745')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#2ecc71')}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px'
};

const titleStyle = {
  marginBottom: '15px',
  color: '#333'
};

const productGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '15px'
};

const productCardStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center'
};

const productNameStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  marginBottom: '8px',
  color: '#333'
};

const categoryStyle = {
  fontSize: '12px',
  color: '#888',
  marginBottom: '12px'
};

const buttonStyle = {
  padding: '8px 16px',
  fontSize: '12px',
  backgroundColor: '#2ecc71',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};
