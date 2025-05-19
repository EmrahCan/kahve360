// API istemcisi için temel yapılandırma
import axios from 'axios';

// API temel URL'si (gerçek uygulamada çevresel değişkenlerden alınır)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.kahve360.com';

// Axios istemcisi oluşturma
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek araya giricisi (interceptor) - kimlik doğrulama token'ını ekler
apiClient.interceptors.request.use(
  (config) => {
    // LocalStorage'dan token'ı al (tarayıcı tarafında)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('kahve360_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Yanıt araya giricisi - hata işleme ve token yenileme
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // 401 Unauthorized hatası ve token yenileme denemesi yapılmamışsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Token yenileme isteği
        const refreshToken = localStorage.getItem('kahve360_refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });
          
          const { token } = response.data;
          
          // Yeni token'ı kaydet
          localStorage.setItem('kahve360_token', token);
          
          // Orijinal isteği yeni token ile tekrar gönder
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Token yenileme başarısız olursa, kullanıcıyı çıkış yapmaya yönlendir
        localStorage.removeItem('kahve360_token');
        localStorage.removeItem('kahve360_refresh_token');
        localStorage.removeItem('kahve360_user');
        
        // Tarayıcı tarafında çalışıyorsa, giriş sayfasına yönlendir
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
