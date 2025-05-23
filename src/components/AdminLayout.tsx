import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  
  // Admin kontrolü
  useEffect(() => {
    if (!user) {
      router.push('/auth/login?returnUrl=/admin');
      return;
    }
    
    if (!isAdmin) {
      alert('Bu sayfaya erişim yetkiniz bulunmamaktadır. Sadece admin kullanıcıları erişebilir.');
      router.push('/');
    }
  }, [user, isAdmin, router]);
  
  // Aktif menü öğesini belirle
  const isActive = (path: string) => {
    return router.pathname.startsWith(path) ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-700 hover:text-white';
  };
  
  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-center text-gray-800">Yükleniyor</h2>
          <p className="text-center text-gray-600">Admin paneli yükleniyor, lütfen bekleyin...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-primary-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between h-16 px-4 bg-primary-900">
          {isSidebarOpen ? (
            <Link href="/admin" className="text-xl font-bold text-white">
              CafeConnect Admin
            </Link>
          ) : (
            <Link href="/admin" className="text-xl font-bold text-white">
              K360
            </Link>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-md text-primary-200 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>
        
        <nav className="mt-5">
          <div className="px-2 space-y-1">
            <Link href="/admin" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {isSidebarOpen && "Dashboard"}
            </Link>
            
            <Link href="/admin/users" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin/users')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {isSidebarOpen && "Kullanıcılar"}
            </Link>
            
            <Link href="/admin/brands" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin/brands')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {isSidebarOpen && "Markalar"}
            </Link>
            
            <Link href="/admin/campaigns" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin/campaigns')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              {isSidebarOpen && "Kampanyalar"}
            </Link>
            
            <Link href="/admin/branches" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin/branches')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {isSidebarOpen && "Şubeler"}
            </Link>
            
            <Link href="/admin/reports" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin/reports')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {isSidebarOpen && "Raporlar"}
            </Link>
            
            <Link href="/admin/settings" className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${isActive('/admin/settings')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {isSidebarOpen && "Ayarlar"}
            </Link>
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-full"
                src={user.profileImage || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)}
                alt={user.name}
              />
            </div>
            {isSidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user.name}</p>
                <button
                  onClick={logout}
                  className="text-xs font-medium text-primary-200 hover:text-white"
                >
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          
          <div className="flex items-center">
            <Link href="/" className="px-3 py-1 mr-4 text-sm text-gray-600 hover:text-primary-600">
              Siteye Dön
            </Link>
            
            <div className="relative">
              <button className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Bildirimler</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-6 overflow-auto bg-gray-100">
          {children}
        </main>
        
        <footer className="py-4 text-center text-sm text-gray-500 bg-white border-t border-gray-200">
          &copy; {new Date().getFullYear()} CafeConnect Admin Panel. Tüm hakları saklıdır.
        </footer>
      </div>
    </div>
  );
}
