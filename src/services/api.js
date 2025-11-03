// services/api.js
// API service for making authenticated requests

const API_URL = process.env.REACT_APP_API_URL || '/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('incdrops_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('incdrops_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('incdrops_token');
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async signup(name, email, password) {
    const data = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async logout() {
    this.clearToken();
    localStorage.removeItem('incdrops_user');
  }

  // User endpoints
  async getProfile() {
    return this.request('/user/profile', {
      method: 'GET',
    });
  }

  async updateProfile(name, email) {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ name, email }),
    });
  }

  async updateSubscription(tier) {
    return this.request('/user/subscription', {
      method: 'PUT',
      body: JSON.stringify({ tier }),
    });
  }
}

export default new ApiService();
