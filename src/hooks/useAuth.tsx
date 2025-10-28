import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthSession } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure demo account is always available
    const registeredUsers = storage.get<Array<{ email: string; password: string; name: string; id: string }>>('ticketapp_users') || [];
    const demoUser = registeredUsers.find(u => u.email === 'demo@example.com');
    
    if (!demoUser) {
      registeredUsers.push({
        id: '1',
        email: 'demo@example.com',
        password: 'password',
        name: 'Demo User'
      });
      storage.set('ticketapp_users', registeredUsers);
    }

    // Check for existing session
    const session = storage.get<AuthSession>('ticketapp_session');
    if (session && new Date(session.expires_at) > new Date()) {
      setUser(session.user);
    } else {
      storage.remove('ticketapp_session');
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check registered users (demo account is always present)
    const registeredUsers = storage.get<Array<{ email: string; password: string; name: string; id: string }>>('ticketapp_users') || [];
    const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const user: User = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      const session: AuthSession = {
        token: 'demo-token',
        user,
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      };
      
      storage.set('ticketapp_session', session);
      setUser(user);
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const registeredUsers = storage.get<Array<{ email: string; password: string; name: string; id: string }>>('ticketapp_users') || [];
    const existingUser = registeredUsers.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'User with this email already exists' };
    }
    
    // Create new user
    const userId = Date.now().toString();
    const newUser = { id: userId, email, password, name };
    registeredUsers.push(newUser);
    storage.set('ticketapp_users', registeredUsers);
    
    // Create session
    const user: User = { id: userId, email, name };
    const session: AuthSession = {
      token: 'demo-token',
      user,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    
    storage.set('ticketapp_session', session);
    setUser(user);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    storage.remove('ticketapp_session');
    setUser(null);
    navigate('/');
  }, [navigate]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};