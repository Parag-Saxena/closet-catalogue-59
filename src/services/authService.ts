
import { User } from '@/types';

/**
 * Gets the current user from localStorage
 */
export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      
      // If user exists in localStorage, ensure sidebar visibility
      if (parsedUser) {
        localStorage.setItem('sidebar-state', 'open');
      }
      
      return parsedUser;
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      return null;
    }
  }
  return null;
};

/**
 * Saves user data to localStorage
 */
export const saveUser = (user: User): void => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
    
    // When saving user, also set sidebar to be open
    if (user) {
      localStorage.setItem('sidebar-state', 'open');
    }
  } catch (e) {
    console.error('Error saving user to localStorage', e);
  }
};

/**
 * Removes user data from localStorage
 */
export const signOut = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('sidebar-state');
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
  const user = {
    email,
    name: email.split('@')[0]
  };
  
  // Save user to localStorage
  saveUser(user);
  
  return user;
};

/**
 * Simulates Google sign in
 */
export const signInWithGoogle = async (): Promise<User> => {
  // In a real app, this would call the Google OAuth API
  // For demo purposes, we'll simulate a successful login
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock user data with a random name to simulate different Google users
  const randomSuffix = Math.floor(Math.random() * 1000);
  const user = {
    email: `user${randomSuffix}@gmail.com`,
    name: `Google User ${randomSuffix}`,
    provider: 'google'
  };
  
  // Save user to localStorage
  saveUser(user);
  
  return user;
};

/**
 * Simulates sending a forgot password email
 */
export const requestPasswordReset = async (email: string): Promise<boolean> => {
  // In a real app, this would send an email with a reset link
  // For demo purposes, we'll simulate a successful email send
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Password reset requested for: ${email}`);
  
  return true;
};

/**
 * Simulates resetting a password with a token
 */
export const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
  // In a real app, this would validate the token and update the password
  // For demo purposes, we'll simulate a successful password reset
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log(`Password reset with token: ${token}`);
  
  return true;
};

/**
 * Simulates verifying an account with a token
 */
export const verifyAccount = async (token: string): Promise<boolean> => {
  // In a real app, this would validate the token and activate the account
  // For demo purposes, we'll simulate a successful account verification
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log(`Account verified with token: ${token}`);
  
  return true;
};

/**
 * Simulates changing a password for a logged-in user
 */
export const changePassword = async (
  userId: string, 
  currentPassword: string, 
  newPassword: string
): Promise<boolean> => {
  // In a real app, this would validate the current password and update to the new password
  // For demo purposes, we'll simulate a successful password change
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`Password changed for user: ${userId}`);
  
  return true;
};
