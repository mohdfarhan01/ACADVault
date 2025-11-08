import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/updateprofile', data),
  changePassword: (data) => api.put('/auth/changepassword', data),
};

// Activity APIs
export const activityAPI = {
  getAll: (params) => api.get('/activities', { params }),
  getOne: (id) => api.get(`/activities/${id}`),
  getMy: () => api.get('/activities/my-activities'),
  create: (data) => api.post('/activities', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
};

// Verification APIs
export const verificationAPI = {
  getPending: () => api.get('/verification/pending'),
  verify: (activityId, data) => api.put(`/verification/${activityId}/verify`, data),
  reject: (activityId, data) => api.put(`/verification/${activityId}/reject`, data),
  scanQR: (data) => api.post('/verification/scan', data),
};

// Portfolio APIs
export const portfolioAPI = {
  getMy: () => api.get('/portfolio/my-portfolio'),
  update: (data) => api.put('/portfolio/my-portfolio', data),
  getByStudent: (studentId) => api.get(`/portfolio/student/${studentId}`),
  generatePDF: () => api.post('/portfolio/generate-pdf'),
  getPublic: (studentId) => api.get(`/portfolio/public/${studentId}`),
};

// Event APIs
export const eventAPI = {
  getAll: (params) => api.get('/events', { params }),
  getOne: (id) => api.get(`/events/${id}`),
  getMy: () => api.get('/events/my-events'),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  register: (id) => api.post(`/events/${id}/register`),
  markAttendance: (id, studentId) => api.put(`/events/${id}/attendance/${studentId}`),
};

// Report APIs
export const reportAPI = {
  getAll: () => api.get('/reports'),
  getOne: (id) => api.get(`/reports/${id}`),
  generate: (data) => api.post('/reports', data),
  download: (id) => api.get(`/reports/${id}/download`),
};

// Admin APIs
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  updateUserStatus: (userId, data) => api.put(`/admin/users/${userId}/status`, data),
  createInstitutionalActivity: (data) => api.post('/admin/institutional-activities', data),
  getInstitutionalActivities: (params) => api.get('/admin/institutional-activities', { params }),
};

// Recruiter APIs
export const recruiterAPI = {
  searchStudents: (params) => api.get('/recruiters/search', { params }),
  getPortfolio: (studentId) => api.get(`/recruiters/portfolio/${studentId}`),
  saveStudent: (studentId) => api.post(`/recruiters/save-student/${studentId}`),
};

// Student APIs
export const studentAPI = {
  getDashboard: () => api.get('/students/dashboard'),
  getAnalytics: () => api.get('/students/analytics'),
};

export default api;
