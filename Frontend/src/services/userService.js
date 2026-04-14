import API from '../utils/api';

export const userService = {
  // Get user by ID (admin)
  getUserById: async (id) => {
    const response = await API.get(`/users/${id}`);
    return response.data;
  },

  // Get farmer public profile
  getFarmerPublicProfile: async (farmerId) => {
    const response = await API.get(`/users/farmer/${farmerId}`);
    return response.data;
  },

  // Get user stats (farmer)
  getUserStats: async () => {
    const response = await API.get('/users/stats/me');
    return response.data;
  },
};