
import { User } from '@/types';

/**
 * Gets the current user from localStorage
 */
export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

/**
 * Saves user data to localStorage
 */
export const saveUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Removes user data from localStorage
 */
export const signOut = (): void => {
  localStorage.removeItem('user');
};

/**
 * Simulates email/password sign in
 */
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  // In a real app, this would be an API call to your authentication endpoint
  // For demo purposes, we'll simulate a successful login
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock user data
  return {
    email,
    name: email.split('@')[0]
  };
};

/**
 * Simulates Google sign in
 */
export const signInWithGoogle = async (): Promise<User> => {
  // In a real app, this would call the Google OAuth API
  // For demo purposes, we'll simulate a successful login
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock user data
  return {
    email: 'user@example.com',
    name: 'Google User',
    provider: 'google'
  };
};
