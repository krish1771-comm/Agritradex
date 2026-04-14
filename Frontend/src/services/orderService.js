import API from '../utils/api';

export const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    console.log('Creating order with data:', orderData);
    try {
      const response = await API.post('/orders', orderData);
      console.log('Order created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Create order error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (id) => {
    try {
      const response = await API.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get order by ID error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get my orders (buyer)
  getMyOrders: async () => {
    try {
      console.log('Fetching my orders');
      const response = await API.get('/orders/myorders');
      console.log('Orders fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Get my orders error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get farmer orders
  getFarmerOrders: async () => {
    try {
      const response = await API.get('/orders/farmer/orders');
      return response.data;
    } catch (error) {
      console.error('Get farmer orders error:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update order status (farmer)
  updateOrderStatus: async (orderId, status, trackingNumber = '') => {
    try {
      const response = await API.put(`/orders/${orderId}/status`, { status, trackingNumber });
      return response.data;
    } catch (error) {
      console.error('Update order status error:', error.response?.data || error.message);
      throw error;
    }
  },
};