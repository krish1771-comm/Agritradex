import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cart = JSON.parse(savedCart);
        setCartItems(cart.items || []);
        setTotalAmount(cart.totalAmount || 0);
        setTotalQuantity(cart.totalQuantity || 0);
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({
      items: cartItems,
      totalAmount,
      totalQuantity,
    }));
  }, [cartItems, totalAmount, totalQuantity]);

  const updateTotals = (items) => {
    const newTotalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const newTotalAmount = items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0);
    setTotalQuantity(newTotalQuantity);
    setTotalAmount(newTotalAmount);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity }];
      }
      
      updateTotals(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== productId);
      updateTotals(newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      updateTotals(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
    setTotalQuantity(0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalAmount,
      totalQuantity,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};