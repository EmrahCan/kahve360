import apiClient from './api';

// Kullanıcı tipi
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

// Giriş yanıt tipi
interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Kimlik doğrulama servisi
const authService = {
  // Giriş
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      
      const { user, token, refreshToken } = response.data;
      
      // Token ve kullanıcı bilgilerini kaydet
      localStorage.setItem('kahve360_token', token);
      localStorage.setItem('kahve360_refresh_token', refreshToken);
      localStorage.setItem('kahve360_user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Kayıt
  register: async (name: string, email: string, password: string): Promise<User> => {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/register', {
        name,
        email,
        password,
      });
      
      const { user, token, refreshToken } = response.data;
      
      // Token ve kullanıcı bilgilerini kaydet
      localStorage.setItem('kahve360_token', token);
      localStorage.setItem('kahve360_refresh_token', refreshToken);
      localStorage.setItem('kahve360_user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  
  // Çıkış
  logout: () => {
    localStorage.removeItem('kahve360_token');
    localStorage.removeItem('kahve360_refresh_token');
    localStorage.removeItem('kahve360_user');
  },
  
  // Şifre sıfırlama
  forgotPassword: async (email: string): Promise<void> => {
    try {
      await apiClient.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },
  
  // Şifre sıfırlama doğrulama
  resetPassword: async (token: string, password: string): Promise<void> => {
    try {
      await apiClient.post('/auth/reset-password', {
        token,
        password,
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },
  
  // Kullanıcı bilgilerini getir
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    
    const userJson = localStorage.getItem('kahve360_user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },
  
  // Kullanıcı oturumunu kontrol et
  isAuthenticated: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('kahve360_token');
  },
};

export default authService;
