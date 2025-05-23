import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      console.log('Giriş yapılıyor:', email, password);
      await login(email, password);
      // Başarılı giriş sonrası yönlendirme AuthContext içinde yapılıyor
      router.push('/');
    } catch (err) {
      console.error('Giriş hatası:', err);
      setError('Giriş yapılamadı. Lütfen e-posta ve şifrenizi kontrol edin.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Giriş Yap - CafeConnect</title>
        <meta name="description" content="CafeConnect hesabınıza giriş yapın" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-primary mb-2">CafeConnect'a Hoş Geldiniz</h1>
                <p className="text-gray-600">
                  Hesabınıza giriş yaparak tüm kahve markalarını tek uygulamada yönetin.
                </p>
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta Adresi
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Şifre
                    </label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                      Şifremi Unuttum
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Hesabınız yok mu?{' '}
                  <Link href="/auth/register" className="text-primary hover:text-primary-dark font-medium">
                    Kayıt Ol
                  </Link>
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-500 mb-4">
                  Veya şununla devam et
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 btn bg-[#4267B2] text-white hover:bg-[#365899]">
                    Facebook
                  </button>
                  <button className="flex-1 btn bg-[#DB4437] text-white hover:bg-[#C53829]">
                    Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
