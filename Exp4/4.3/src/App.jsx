import { useState } from 'react';
import { CartProvider } from './context/CartProvider';
import { ProductListContext } from './components/context/ProductListContext';
import { CartItemsContext } from './components/context/CartItemsContext';
import { CartCountContext } from './components/context/CartCountContext';
import { ProductListRedux } from './components/redux/ProductListRedux';
import { CartItemsRedux } from './components/redux/CartItemsRedux';
import { CartCountRedux } from './components/redux/CartCountRedux';

export default function App() {
  const [activeTab, setActiveTab] = useState('context');

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Shopping Cart Comparison</h1>
        <p style={subtitleStyle}>Context API vs Redux Toolkit</p>
      </header>

      <nav style={navStyle}>
        <button
          onClick={() => setActiveTab('context')}
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === 'context' ? '#007bff' : '#6c757d',
            color: 'white'
          }}
        >
          Context API Implementation
        </button>
        <button
          onClick={() => setActiveTab('redux')}
          style={{
            ...tabButtonStyle,
            backgroundColor: activeTab === 'redux' ? '#007bff' : '#6c757d',
            color: 'white'
          }}
        >
          Redux Toolkit Implementation
        </button>
      </nav>

      <main style={mainStyle}>
        {activeTab === 'context' ? (
          <CartProvider>
            <ContextVersion />
          </CartProvider>
        ) : (
          <ReduxVersion />
        )}
      </main>
    </div>
  );
}

const ContextVersion = () => (
  <div style={versionStyle}>
    <div style={headerRowStyle}>
      <h2 style={versionTitleStyle}>Context API</h2>
      <div style={cartCountContainerStyle}>
        Cart Items: <CartCountContext />
      </div>
    </div>
    <div style={contentStyle}>
      <ProductListContext />
      <CartItemsContext />
    </div>
  </div>
);

const ReduxVersion = () => (
  <div style={versionStyle}>
    <div style={headerRowStyle}>
      <h2 style={versionTitleStyle}>Redux Toolkit</h2>
      <div style={cartCountContainerStyle}>
        Cart Items: <CartCountRedux />
      </div>
    </div>
    <div style={contentStyle}>
      <ProductListRedux />
      <CartItemsRedux />
    </div>
  </div>
);

const appStyle = {
  minHeight: '100vh',
  backgroundColor: '#f5f5f5'
};

const headerStyle = {
  backgroundColor: '#222',
  color: 'white',
  padding: '30px 20px',
  textAlign: 'center',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
};

const titleStyle = {
  fontSize: '32px',
  margin: '0 0 10px 0'
};

const subtitleStyle = {
  fontSize: '16px',
  color: '#aaa',
  margin: 0
};

const navStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  padding: '20px',
  backgroundColor: '#fff'
};

const tabButtonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.3s',
  fontWeight: 'bold'
};

const mainStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px'
};

const versionStyle = {
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden'
};

const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderBottom: '1px solid #eee',
  backgroundColor: '#f9f9f9'
};

const versionTitleStyle = {
  margin: 0,
  color: '#333'
};

const cartCountContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '16px',
  color: '#333'
};

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  padding: '20px',
  minHeight: '500px'
};
