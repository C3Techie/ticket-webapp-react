export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
};

// src/utils/validation.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateTicketTitle = (title: string): string | null => {
  if (!title.trim()) return 'Title is required';
  if (title.length < 3) return 'Title must be at least 3 characters';
  if (title.length > 150) return 'Title must be less than 150 characters';
  return null;
};

export const validateTicketDescription = (description: string): string | null => {
  if (description && description.length > 1000) {
    return 'Description must be less than 1000 characters';
  }
  return null;
};