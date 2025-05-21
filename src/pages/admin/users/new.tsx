import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewUser() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Gerçek uygulamada, kullanıcının admin olup olmadığını kontrol et
    if (user) {
      // Demo için her giriş yapmış kullanıcıyı admin kabul ediyoruz
      setIsAdmin(true);
    } else {
      // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
      router.push('/auth/login?returnUrl=/admin/users/new');
    }
  }, [user, router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form doğrulama
    if (!name || !email || !password || !confirmPassword) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }
    
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      
      // Gerçek uygulamada, burada API çağrısı yapılır
      // Şimdilik demo için simüle ediyoruz
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Yeni kullanıcı oluşturuldu:', {
        name,
        email,
        phone,
        password,
        role
      });
      
      // Başarılı mesajı göster
      setSuccess(true);
      
      // Formu temizle
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');
      setRole('user');
      
      // 2 saniye sonra kullanıcı listesine yönlendir
      setTimeout(() => {
        router.push('/admin/users');
      }, 2000);
      
    } catch (err) {
      console.error('Kullanıcı oluşturma hatası:', err);
      setError('Kullanıcı oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
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
  
  return (
    <>
      <Head>
        <title>Yeni Kullanıcı Ekle - Kahve360 Admin</title>
        <meta name="description" content="Kahve360 Yeni Kullanıcı Ekleme" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-primary">Yeni Kullanıcı Ekle</h1>
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
                  Kullanıcı başarıyla oluşturuldu. Kullanıcı listesine yönlendiriliyorsunuz...
                </div>
              )}
              
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
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="input w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="En az 6 karakter"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre Tekrar <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className="input w-full"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Şifrenizi tekrar girin"
                      required
                    />
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
                    {isLoading ? 'Kaydediliyor...' : 'Kullanıcı Oluştur'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
