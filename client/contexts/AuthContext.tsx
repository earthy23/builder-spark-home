import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  role: 'member' | 'vip' | 'vip++' | 'mod' | 'admin';
  avatar?: string;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Default admin account
const DEFAULT_ADMIN: User = {
  id: 'admin_001',
  username: 'admin',
  email: 'admin@uec.com',
  displayName: 'Administrator',
  role: 'admin',
  joinDate: '2024-01-01T00:00:00Z'
};

// Mock user database
const MOCK_USERS: User[] = [
  DEFAULT_ADMIN,
  {
    id: 'user_001',
    username: 'steve_builder',
    email: 'steve@example.com',
    displayName: 'Steve Builder',
    role: 'vip',
    joinDate: '2023-06-15T00:00:00Z'
  },
  {
    id: 'user_002',
    username: 'alex_crafter',
    email: 'alex@example.com',
    displayName: 'Alex Crafter',
    role: 'vip++',
    joinDate: '2023-08-22T00:00:00Z'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('uec_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('uec_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (usernameOrEmail: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    let foundUser: User | undefined;
    
    if (usernameOrEmail === 'admin' && password === 'admin123') {
      foundUser = DEFAULT_ADMIN;
    } else {
      // Check against mock users (in real app, this would be an API call)
      foundUser = MOCK_USERS.find(u => 
        (u.username.toLowerCase() === usernameOrEmail.toLowerCase() || 
         u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
        password === 'demo123' // Demo password for all non-admin users
      );
    }
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('uec_user', JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if username or email already exists
    const existingUser = MOCK_USERS.find(u => 
      u.username.toLowerCase() === userData.username.toLowerCase() ||
      u.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (existingUser) {
      setLoading(false);
      return false; // User already exists
    }
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      username: userData.username,
      email: userData.email,
      displayName: userData.username,
      role: 'member',
      joinDate: new Date().toISOString()
    };
    
    // Add to mock database
    MOCK_USERS.push(newUser);
    
    // Log them in
    setUser(newUser);
    localStorage.setItem('uec_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uec_user');
    navigate('/');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
