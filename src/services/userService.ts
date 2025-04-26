
import { User } from '@/types';
import { api } from './api';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  getCurrentUser: async (): Promise<User | null> => {
    try {
      // In production: return api.get('/user/profile');
      await delay(300);
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },
  
  login: async (userData: User): Promise<User> => {
    try {
      // In production: return api.post('/auth/login', credentials);
      await delay(500);
      // Store user data in localStorage for development
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('authToken', 'fake-auth-token-' + Date.now());
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  },
  
  logout: async (): Promise<void> => {
    try {
      // In production: return api.post('/auth/logout');
      await delay(300);
      
      // Preserve theme setting
      const theme = localStorage.getItem('closet-keeper-theme');
      const sidebarState = localStorage.getItem('sidebarState');
      
      // Clear auth data
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      
      // Restore theme and sidebar settings
      if (theme) {
        localStorage.setItem('closet-keeper-theme', theme);
      }
      
      if (sidebarState) {
        localStorage.setItem('sidebarState', sidebarState);
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },
  
  register: async (userData: Omit<User, 'id'>): Promise<User> => {
    try {
      // In production: return api.post('/auth/register', userData);
      await delay(700);
      const newUser = {
        ...userData,
        id: crypto.randomUUID()
      } as User;
      
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
};
