import API from '../utils/api';

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    const response = await API.get('/categories');
    return response.data;
  },

  // Get main categories (no parent)
  getMainCategories: async () => {
    const response = await API.get('/categories/main');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const response = await API.get(`/categories/${id}`);
    return response.data;
  },

  // Get category by slug
  getCategoryBySlug: async (slug) => {
    const response = await API.get(`/categories/slug/${slug}`);
    return response.data;
  },

  // Create category (Admin only)
  createCategory: async (categoryData) => {
    const response = await API.post('/categories', categoryData);
    return response.data;
  },

  // Update category (Admin only)
  updateCategory: async (id, categoryData) => {
    const response = await API.put(`/categories/${id}`, categoryData);
    return response.data;
  },

  // Delete category (Admin only)
  deleteCategory: async (id) => {
    const response = await API.delete(`/categories/${id}`);
    return response.data;
  },
};