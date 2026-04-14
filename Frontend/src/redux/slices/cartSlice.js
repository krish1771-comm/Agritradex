import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      return {
        items: parsed.items || [],
        totalQuantity: parsed.totalQuantity || 0,
        totalAmount: parsed.totalAmount || 0,
      };
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      
      state.totalQuantity = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
      state.totalAmount = state.items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
      
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      }));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalQuantity = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
      state.totalAmount = state.items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
      
      localStorage.setItem('cart', JSON.stringify({
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      }));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item && quantity > 0) {
        item.quantity = quantity;
        state.totalQuantity = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
        state.totalAmount = state.items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
        
        localStorage.setItem('cart', JSON.stringify({
          items: state.items,
          totalQuantity: state.totalQuantity,
          totalAmount: state.totalAmount,
        }));
      } else if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
        state.totalAmount = state.items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 0)), 0);
        
        localStorage.setItem('cart', JSON.stringify({
          items: state.items,
          totalQuantity: state.totalQuantity,
          totalAmount: state.totalAmount,
        }));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;