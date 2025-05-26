import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  credits: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  socialLogin: (provider: 'google' | 'facebook') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration purposes
const MOCK_USER: User = {
  id: 'user-1',
  email: 'demo@retinaseo.com',
  name: 'Demo User',
  avatar: 'https://i.pravatar.cc/150?img=12',
  plan: 'pro',
  credits: 250,
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate loading user from local storage or token
    const storedUser = localStorage.getItem('retina-user');
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('retina-user');
      }
    }
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would validate credentials with your backend
    if (email && password) {
      setUser(MOCK_USER);
      localStorage.setItem('retina-user', JSON.stringify(MOCK_USER));
      return;
    }
    
    throw new Error('Invalid credentials');
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would register the user with your backend
    if (email && password && name) {
      const newUser = { ...MOCK_USER, email, name };
      setUser(newUser);
      localStorage.setItem('retina-user', JSON.stringify(newUser));
      return;
    }
    
    throw new Error('Registration failed');
  };

  const socialLogin = async (provider: 'google' | 'facebook') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would handle OAuth flow
    setUser(MOCK_USER);
    localStorage.setItem('retina-user', JSON.stringify(MOCK_USER));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('retina-user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isInitializing,
        login, 
        register, 
        logout,
        socialLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}