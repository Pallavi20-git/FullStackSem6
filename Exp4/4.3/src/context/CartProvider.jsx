import { useState } from 'react';
import { CartContext } from './CartContext';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cart,
    cartCount,
    addItem,
    removeItem
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
