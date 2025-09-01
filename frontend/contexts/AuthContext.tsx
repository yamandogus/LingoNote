import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userService, UpdateUserRequest } from '../services/user';

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateUserRequest) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        apiService.setToken(storedToken);
        
        // Get user data
        const userData = await apiService.getUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password });
      
      await AsyncStorage.setItem('token', response.token);
      setToken(response.token);
      apiService.setToken(response.token);
      
      // Get user data
      const userData = await apiService.getUser();
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      await apiService.register({ username, email, password });
      
      // Kayıt başarılı olduktan sonra otomatik login yap
      await login(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUser(null);
      apiService.clearToken();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateProfile = async (data: UpdateUserRequest) => {
    try {
      const response = await userService.updateUser(data);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 