import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Demo kullanıcı listesi
const demoUsers = [
  { id: '1', name: 'Demo Kullanıcı', email: 'demo@example.com', phone: '+90 555 123 4567', role: 'admin', status: 'active', createdAt: '2025-04-15' },
  { id: '2', name: 'Ali Yılmaz', email: 'ali@example.com', phone: '+90 555 234 5678', role: 'user', status: 'active', createdAt: '2025-04-20' },
  { id: '3', name: 'Ayşe Demir', email: 'ayse@example.com', phone: '+90 555 345 6789', role: 'user', status: 'active', createdAt: '2025-04-25' },
  { id: '4', name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '+90 555 456 7890', role: 'user', status: 'inactive', createdAt: '2025-05-01' },
  { id: '5', name: 'Zeynep Şahin', email: 'zeynep@example.com', phone: '+90 555 567 8901', role: 'user', status: 'active', createdAt: '2025-05-05' },
];

export default function EditUser() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    // Gerçek uygulamada, kullanıcının admin olup olmadığını kontrol et
    if (user) {
      // Demo için her giriş yapmış kullanıcıyı admin kabul ediyoruz
      setIsAdmin(true);
    } else {
      // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
      router.push('/auth/login?returnUrl=' + router.asPath);
    }
  }, [user, router]);
  
  useEffect(() => {
    // ID varsa kullanıcı verilerini yükle
    if (id && isAdmin) {
      // Gerçek uygulamada, burada API çağrısı yapılır
      // Şimdilik demo için simüle ediyoruz
      const foundUser = demoUsers.find(user => user.id === id);
      
      if (foundUser) {
        setUserData(foundUser);
        setName(foundUser.name);
        setEmail(foundUser.email);
        setPhone(foundUser.phone);
        setRole(foundUser.role);
        setStatus(foundUser.status);
      } else {
        setError('Kullanıcı bulunamadı');
      }
    }
  }, [id, isAdmin]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!name || !email) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      
      // Gerçek uygulamada, burada API çağrısı yapılır
      // Şimdilik demo için simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Kullanıcı güncellendi:', {
        id,
        name,
        email,
        phone,
        role,
        status
      });
      
      // Başarılı mesajı göster
      setSuccess(true);
      
      // 2 saniye sonra kullanıcı listesine yönlendir
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
      
    } catch (err) {
      console.error('Kullanıcı güncelleme hatası:', err);
      setError('Kullanıcı güncellenemedi. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-primary mb-4">Yükleniyor...</h1>
              <p className="text-gray-600">Admin paneli yükleniyor, lütfen bekleyin.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!userData && !error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-primary mb-4">Kullanıcı Yükleniyor...</h1>
              <p className="text-gray-600">Kullanıcı bilgileri yükleniyor, lütfen bekleyin.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Kullanıcı Düzenle - Kahve360 Admin</title>
        <meta name="description" content="Kahve360 Kullanıcı Düzenleme" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-primary">Kullanıcı Düzenle</h1>
                <Link href="/admin/users" className="btn btn-outline">
                  Kullanıcı Listesine Dön
                </Link>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
                  Kullanıcı başarıyla güncellendi. Kullanıcı listesine yönlendiriliyorsunuz...
                </div>
              )}
              
              {userData && (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ad Soyad <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="input w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ad Soyad"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta Adresi <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="input w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefon Numarası
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="input w-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Kullanıcı Rolü <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        className="input w-full"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      >
                        <option value="user">Kullanıcı</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Durum <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="status"
                        className="input w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                      >
                        <option value="active">Aktif</option>
                        <option value="inactive">Pasif</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kayıt Tarihi
                      </label>
                      <input
                        type="text"
                        className="input w-full bg-gray-50"
                        value={userData.createdAt}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">Şifre Değiştirme</h3>
                    <p className="text-gray-600 mb-4">Şifreyi değiştirmek için aşağıdaki alanları doldurun. Değiştirmek istemiyorsanız boş bırakın.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Yeni Şifre
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          className="input w-full"
                          placeholder="Yeni şifre"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Yeni Şifre Tekrar
                        </label>
                        <input
                          id="confirmNewPassword"
                          type="password"
                          className="input w-full"
                          placeholder="Yeni şifreyi tekrar girin"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-4 mt-8">
                    <Link href="/admin/users" className="btn btn-outline">
                      İptal
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
