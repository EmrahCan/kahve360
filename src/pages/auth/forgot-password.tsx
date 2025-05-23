import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { forgotPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Lütfen e-posta adresinizi girin');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setError('Şifre sıfırlama bağlantısı gönderilemedi. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>Şifremi Unuttum - CafeConnect</title>
        <meta name="description" content="CafeConnect hesabınızın şifresini sıfırlayın" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-primary mb-2">Şifrenizi mi Unuttunuz?</h1>
                    <p className="text-gray-600">
                      E-posta adresinizi girin, şifre sıfırlama bağlantısını gönderelim.
                    </p>
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
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
                    
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Gönderiliyor...' : 'Şifre Sıfırlama Bağlantısı Gönder'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Bağlantı Gönderildi!</h2>
                  <p className="text-gray-600 mb-6">
                    Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi. 
                    Lütfen e-posta kutunuzu kontrol edin.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    E-postayı bulamıyor musunuz? Spam klasörünü kontrol edin veya tekrar deneyin.
                  </p>
                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn btn-outline"
                    >
                      Tekrar Dene
                    </button>
                    <Link href="/auth/login" className="btn btn-primary">
                      Giriş Sayfasına Dön
                    </Link>
                  </div>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  <Link href="/auth/login" className="text-primary hover:text-primary-dark font-medium">
                    Giriş sayfasına dön
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
