import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { User } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

// Define the shape of our context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest('GET', '/api/auth/me');
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest('POST', '/api/auth/login', { username, password });
      const userData = await response.json();
      setUser(userData);
      setLocation('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest('POST', '/api/auth/register', { username, email, password });
      const userData = await response.json();
      setUser(userData);
      setLocation('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setLocation('/login');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher-order component to protect routes
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const WithAuth: React.FC<P> = (props) => {
    const { user, loading } = useAuth();
    const [, setLocation] = useLocation();
    
    useEffect(() => {
      if (!loading && !user) {
        setLocation('/login');
      }
    }, [user, loading, setLocation]);
    
    if (loading) {
      return <div className="flex items-center justify-center min-h-[70vh]">Loading...</div>;
    }
    
    if (!user) {
      return null;
    }
    
    return <Component {...props} />;
  };
  
  return WithAuth;
};