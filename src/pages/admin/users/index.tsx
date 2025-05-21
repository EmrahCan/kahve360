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

export default function UserManagement() {
  const [users, setUsers] = useState(demoUsers);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Gerçek uygulamada, kullanıcının admin olup olmadığını kontrol et
    if (user) {
      // Demo için her giriş yapmış kullanıcıyı admin kabul ediyoruz
      setIsAdmin(true);
    } else {
      // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
      router.push('/auth/login?returnUrl=/admin/users');
    }
  }, [user, router]);
  
  // Kullanıcıları filtrele
  const filteredUsers = users.filter(user => {
    // Arama filtresi
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    // Durum filtresi
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    // Rol filtresi
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });
  
  // Kullanıcı silme fonksiyonu
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };
  
  // Kullanıcı durumunu değiştirme fonksiyonu
  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'active' ? 'inactive' : 'active'
        };
      }
      return user;
    }));
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
        <title>Kullanıcı Yönetimi - Kahve360 Admin</title>
        <meta name="description" content="Kahve360 Kullanıcı Yönetimi" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-primary">Kullanıcı Yönetimi</h1>
                  <p className="text-gray-600">Toplam {users.length} kullanıcı, {filteredUsers.length} sonuç gösteriliyor</p>
                </div>
                <div className="flex gap-4">
                  <Link href="/admin" className="btn btn-outline">
                    Admin Panele Dön
                  </Link>
                  <Link href="/admin/users/new" className="btn btn-primary">
                    Yeni Kullanıcı Ekle
                  </Link>
                </div>
              </div>
              
              {/* Filtreleme ve Arama */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="İsim, e-posta veya telefon ara..."
                    className="input w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    className="input w-full"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="inactive">Pasif</option>
                  </select>
                </div>
                <div>
                  <select
                    className="input w-full"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="all">Tüm Roller</option>
                    <option value="admin">Admin</option>
                    <option value="user">Kullanıcı</option>
                  </select>
                </div>
              </div>
              
              {/* Kullanıcı Tablosu */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">İsim</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">E-posta</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Telefon</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Rol</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Durum</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Kayıt Tarihi</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-500">{user.id}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{user.phone}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role === 'admin' ? 'Admin' : 'Kullanıcı'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? 'Aktif' : 'Pasif'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{user.createdAt}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          <div className="flex gap-2">
                            <Link href={`/admin/users/${user.id}`} className="text-blue-600 hover:text-blue-800">
                              Düzenle
                            </Link>
                            <button 
                              className="text-gray-600 hover:text-gray-800"
                              onClick={() => handleToggleStatus(user.id)}
                            >
                              {user.status === 'active' ? 'Pasifleştir' : 'Aktifleştir'}
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Sil
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Arama kriterlerinize uygun kullanıcı bulunamadı.</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
