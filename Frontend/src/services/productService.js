import API from '../utils/api';

export const productService = {
  // Get all products with filters
  getProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.organic === true) params.append('organic', 'true');
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.farmer) params.append('farmer', filters.farmer);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    
    const response = await API.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await API.get(`/products/${id}`);
    return response.data;
  },

  // Create product (Farmer only)
  createProduct: async (productData) => {
    const response = await API.post('/products', productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await API.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  },

  // Get farmer's products
  getFarmerProducts: async () => {
    const response = await API.get('/products/farmer/me');
    return response.data;
  },

  // Add review
  addReview: async (productId, reviewData) => {
    const response = await API.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  },

  // Get product reviews
  getProductReviews: async (productId) => {
    const response = await API.get(`/products/${productId}/reviews`);
    return response.data;
  },

  // Mark review as helpful
  markReviewHelpful: async (reviewId) => {
    const response = await API.put(`/reviews/${reviewId}/helpful`);
    return response.data;
  },
};