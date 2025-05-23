import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Kullanıcı tipi tanımı
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isAdminState, setIsAdminState] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  
  // Kullanıcıları API'den getir
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Kullanıcılar getirilirken bir hata oluştu');
      }
      
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError('Kullanıcılar yüklenirken bir hata oluştu: ' + (err as Error).message);
      console.error('Kullanıcıları getirme hatası:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    // Kullanıcının admin olup olmadığını kontrol et
    if (!user) {
      // Kullanıcı giriş yapmamışsa giriş sayfasına yönlendir
      router.push('/auth/login?returnUrl=/admin/users');
      return;
    }
    
    if (isAdmin) {
      setIsAdminState(true);
      // Kullanıcıları getir
      fetchUsers();
    } else {
      // Admin olmayan kullanıcıları ana sayfaya yönlendir
      alert('Bu sayfaya erişim yetkiniz bulunmamaktadır. Sadece admin kullanıcıları erişebilir.');
      router.push('/');
    }
  }, [user, isAdmin, router]);
  
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
  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Kullanıcı silinirken bir hata oluştu');
        }
        
        // Kullanıcı listesini güncelle
        setUsers(users.filter(user => user.id !== userId));
        alert('Kullanıcı başarıyla silindi');
      } catch (err) {
        alert('Kullanıcı silinirken bir hata oluştu: ' + (err as Error).message);
        console.error('Kullanıcı silme hatası:', err);
      }
    }
  };
  
  // Kullanıcı durumunu değiştirme fonksiyonu
  const handleToggleStatus = async (userId: string) => {
    try {
      // İlgili kullanıcıyı bul
      const userToUpdate = users.find(user => user.id === userId);
      
      if (!userToUpdate) return;
      
      // Yeni durumu belirle
      const newStatus = userToUpdate.status === 'active' ? 'inactive' : 'active';
      
      // API'ye güncelleme isteği gönder
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });
      
      if (!response.ok) {
        throw new Error('Kullanıcı durumu güncellenirken bir hata oluştu');
      }
      
      // Kullanıcı listesini güncelle
      setUsers(users.map(user => {
        if (user.id === userId) {
          return {
            ...user,
            status: newStatus
          };
        }
        return user;
      }));
    } catch (err) {
      alert('Kullanıcı durumu güncellenirken bir hata oluştu: ' + (err as Error).message);
      console.error('Kullanıcı durumu güncelleme hatası:', err);
    }
  };
  

  
  if (!isAdminState) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-primary mb-4">Yükleniyor...</h1>
              <p className="text-gray-600">Kullanıcı yönetimi paneli yükleniyor, lütfen bekleyin.</p>
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
        <title>Kullanıcı Yönetimi - CafeConnect Admin</title>
        <meta name="description" content="CafeConnect Kullanıcı Yönetimi" />
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
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
                  <p className="text-gray-600">Kullanıcılar yükleniyor...</p>
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <div className="text-red-500 mb-2">❌</div>
                  <p className="text-red-500">{error}</p>
                  <button 
                    className="btn btn-sm btn-primary mt-4"
                    onClick={fetchUsers}
                  >
                    Tekrar Dene
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto border rounded-lg">
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
