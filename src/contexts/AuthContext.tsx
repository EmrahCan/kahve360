import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

// Kullanıcı tipi
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
}

// Kimlik doğrulama bağlamı için tip
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
}

// Varsayılan değerler
const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => { throw new Error('AuthContext henüz başlatılmadı'); },
  register: async () => { throw new Error('AuthContext henüz başlatılmadı'); },
  logout: () => {},
  forgotPassword: async () => {},
};

// Context oluşturma
const AuthContext = createContext<AuthContextType>(defaultContext);

// Context hook'u
export const useAuth = () => useContext(AuthContext);

// Provider bileşeni
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Sayfa yüklendiğinde oturum durumunu kontrol et
  useEffect(() => {
    // Gerçek uygulamada, burada localStorage veya JWT token kontrolü yapılır
    const checkAuth = () => {
      const storedUser = localStorage.getItem('kahve360_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Giriş fonksiyonu
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('AuthContext: Giriş işlemi başlatılıyor');
      
      // Gerçek uygulamada, burada API çağrısı yapılır
      // Şimdilik demo için simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo kullanıcı - test için her zaman başarılı giriş yapıyoruz
      const demoUser: User = {
        id: '1',
        name: 'Demo Kullanıcı',
        email: email,
        phone: '+90 555 123 4567',
        profileImage: '/profile-demo.png'
      };
      
      // Kullanıcı bilgilerini kaydet
      localStorage.setItem('kahve360_user', JSON.stringify(demoUser));
      setUser(demoUser);
      console.log('AuthContext: Kullanıcı girişi başarılı', demoUser);
      
      // Başarılı giriş mesajı
      return demoUser;
    } catch (error) {
      console.error('AuthContext: Giriş hatası:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Kayıt fonksiyonu
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      console.log('AuthContext: Kayıt işlemi başlatılıyor');
      
      // Gerçek uygulamada, burada API çağrısı yapılır
      // Şimdilik demo için simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo kullanıcı
      const demoUser: User = {
        id: '1',
        name: name,
        email: email,
        phone: '+90 555 123 4567',
        profileImage: '/profile-demo.png'
      };
      
      // Kullanıcı bilgilerini kaydet
      localStorage.setItem('kahve360_user', JSON.stringify(demoUser));
      setUser(demoUser);
      console.log('AuthContext: Kullanıcı kaydı başarılı', demoUser);
      
      // Başarılı kayıt mesajı
      return demoUser;
    } catch (error) {
      console.error('AuthContext: Kayıt hatası:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Çıkış fonksiyonu
  const logout = () => {
    localStorage.removeItem('kahve360_user');
    setUser(null);
    router.push('/');
  };

  // Şifre sıfırlama fonksiyonu
  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      
      // Gerçek uygulamada, burada API çağrısı yapılır
      // Şimdilik demo için simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Başarılı mesajı
      console.log(`Şifre sıfırlama bağlantısı ${email} adresine gönderildi`);
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Context değerleri
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
