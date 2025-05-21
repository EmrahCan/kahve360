import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Gerçek uygulamada, kullanıcının admin olup olmadığını kontrol et
    // Şimdilik demo için basit bir kontrol yapıyoruz
    if (user) {
      // Demo için her giriş yapmış kullanıcıyı admin kabul ediyoruz
      setIsAdmin(true);
    } else {
      // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
      router.push('/auth/login?returnUrl=/admin');
    }
  }, [user, router]);
  
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
        <title>Admin Panel - Kahve360</title>
        <meta name="description" content="Kahve360 Admin Paneli" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-primary">Admin Panel</h1>
                <div className="flex gap-4">
                  <button 
                    className="btn btn-outline"
                    onClick={() => router.push('/admin/users')}
                  >
                    Kullanıcı Yönetimi
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => router.push('/admin/brands')}
                  >
                    Marka Yönetimi
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => router.push('/admin/campaigns')}
                  >
                    Kampanya Yönetimi
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h2 className="text-lg font-semibold text-blue-800 mb-2">Kullanıcılar</h2>
                  <p className="text-4xl font-bold text-blue-600 mb-4">152</p>
                  <p className="text-sm text-blue-500">Son 30 günde 24 yeni kullanıcı</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                  <h2 className="text-lg font-semibold text-green-800 mb-2">Markalar</h2>
                  <p className="text-4xl font-bold text-green-600 mb-4">6</p>
                  <p className="text-sm text-green-500">Son 30 günde 1 yeni marka</p>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                  <h2 className="text-lg font-semibold text-purple-800 mb-2">Kampanyalar</h2>
                  <p className="text-4xl font-bold text-purple-600 mb-4">18</p>
                  <p className="text-sm text-purple-500">5 aktif kampanya</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Hızlı İşlemler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    className="btn btn-primary"
                    onClick={() => router.push('/admin/users/new')}
                  >
                    Yeni Kullanıcı Ekle
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => router.push('/admin/brands/new')}
                  >
                    Yeni Marka Ekle
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => router.push('/admin/campaigns/new')}
                  >
                    Yeni Kampanya Ekle
                  </button>
                  <button 
                    className="btn btn-outline"
                    onClick={() => router.push('/admin/reports')}
                  >
                    Raporları Görüntüle
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
