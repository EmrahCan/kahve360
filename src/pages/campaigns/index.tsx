import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Kampanya verileri
const allCampaigns = [
  { 
    id: 1, 
    brand: 'Starbucks', 
    brandId: 1,
    title: '2. içecek %50 indirimli', 
    description: 'Hafta içi 14:00-17:00 arası geçerlidir. Aynı veya daha düşük fiyatlı ikinci içecek için geçerlidir.',
    expiryDate: '31 Mayıs 2025',
    image: '/campaign1.jpg',
    category: 'İçecek'
  },
  { 
    id: 2, 
    brand: 'Gloria Jeans', 
    brandId: 2,
    title: 'Kahve + Sandviç 150 TL', 
    description: 'Tüm şubelerde geçerlidir. Medium boy içecek ve klasik sandviç seçenekleri için geçerlidir.',
    expiryDate: '15 Haziran 2025',
    image: '/campaign2.jpg',
    category: 'Kombo'
  },
  { 
    id: 3, 
    brand: 'Kahve Dünyası', 
    brandId: 4,
    title: 'Yeni üyelere ilk kahve hediye', 
    description: 'Uygulama üzerinden siparişlerde geçerlidir. Sadece yeni üye olan kullanıcılar için geçerlidir.',
    expiryDate: '30 Haziran 2025',
    image: '/campaign3.jpg',
    category: 'İçecek'
  },
  { 
    id: 4, 
    brand: 'Starbucks', 
    brandId: 1,
    title: 'Hafta sonu kahvaltı menüsü 2 kişilik', 
    description: 'Cumartesi ve Pazar günleri 09:00-12:00 arası geçerlidir. 2 kişilik kahvaltı menüsü ve 2 adet filtre kahve içerir.',
    expiryDate: '30 Haziran 2025',
    image: '/campaign4.jpg',
    category: 'Kahvaltı'
  },
  { 
    id: 5, 
    brand: 'Tchibo', 
    brandId: 5,
    title: 'İkinci içecek 1 TL', 
    description: 'Hafta içi 15:00-18:00 arası geçerlidir. Aynı veya daha düşük fiyatlı ikinci içecek için geçerlidir.',
    expiryDate: '30 Haziran 2025',
    image: '/campaign5.jpg',
    category: 'İçecek'
  },
  { 
    id: 6, 
    brand: 'Caribou Coffee', 
    brandId: 3,
    title: 'Öğrenci indirimi %20', 
    description: 'Öğrenci kimliği göstererek tüm içeceklerde %20 indirim. Diğer kampanyalarla birleştirilemez.',
    expiryDate: '31 Ağustos 2025',
    image: '/campaign6.jpg',
    category: 'İndirim'
  },
  { 
    id: 7, 
    brand: 'Espresso Lab', 
    brandId: 6,
    title: 'Doğum gününde kahve hediye', 
    description: 'Doğum gününüzde kimlik göstererek dilediğiniz içeceği ücretsiz alabilirsiniz.',
    expiryDate: '31 Aralık 2025',
    image: '/campaign7.jpg',
    category: 'Hediye'
  },
  { 
    id: 8, 
    brand: 'Kahve Dünyası', 
    brandId: 4,
    title: 'Kahve çekirdeği alana fincan hediye', 
    description: '250gr ve üzeri kahve çekirdeği alımlarında özel tasarım fincan hediye.',
    expiryDate: '15 Temmuz 2025',
    image: '/campaign8.jpg',
    category: 'Hediye'
  },
];

// Marka filtreleme için markalar
const brands = [
  { id: 1, name: 'Starbucks' },
  { id: 2, name: 'Gloria Jeans' },
  { id: 3, name: 'Caribou Coffee' },
  { id: 4, name: 'Kahve Dünyası' },
  { id: 5, name: 'Tchibo' },
  { id: 6, name: 'Espresso Lab' },
];

// Kategori filtreleme için kategoriler
const categories = ['İçecek', 'Kombo', 'Kahvaltı', 'İndirim', 'Hediye'];

export default function Campaigns() {
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filtreleme işlemi
  const filteredCampaigns = allCampaigns.filter(campaign => {
    // Marka filtresi
    if (selectedBrand !== null && campaign.brandId !== selectedBrand) {
      return false;
    }
    
    // Kategori filtresi
    if (selectedCategory !== null && campaign.category !== selectedCategory) {
      return false;
    }
    
    // Arama filtresi
    if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !campaign.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Tüm filtreleri temizle
  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSearchQuery('');
  };
  
  return (
    <>
      <Head>
        <title>Kampanyalar - CafeConnect</title>
        <meta name="description" content="CafeConnect ile tüm kahve markalarının güncel kampanyalarını takip edin." />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start mb-10">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Kampanyalar</h1>
                <p className="text-gray-600 max-w-2xl">
                  Tüm kahve markalarının güncel kampanyalarını tek bir yerden takip edin ve fırsatları kaçırmayın.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Kampanya veya marka ara..."
                    className="input pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filtreler */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">Filtreler</h2>
                
                {(selectedBrand !== null || selectedCategory !== null || searchQuery) && (
                  <button 
                    className="text-primary font-medium hover:text-primary-dark flex items-center"
                    onClick={clearFilters}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Filtreleri Temizle
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Markalar</label>
                  <div className="flex flex-wrap gap-2">
                    {brands.map(brand => (
                      <button
                        key={brand.id}
                        className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                          selectedBrand === brand.id 
                            ? 'bg-primary text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedBrand(selectedBrand === brand.id ? null : brand.id)}
                      >
                        <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <img 
                            src={`/${brand.name.toLowerCase().replace(/ /g, '')}.png`} 
                            alt={`${brand.name} logosu`}
                            className="w-4 h-4 object-contain p-0.5"
                            loading="eager"
                            onError={(e) => {
                              // Caribou Coffee için özel durum
                              if (brand.name === 'Caribou Coffee') {
                                (e.target as HTMLImageElement).src = '/caribou.png';
                              } else {
                                (e.target as HTMLImageElement).style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = `${brand.name.charAt(0)}`;
                              }
                            }}
                          />
                        </span>
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kategoriler</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedCategory === category 
                            ? 'bg-secondary text-primary-dark' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Kampanya Listesi */}
            {filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map(campaign => (
                  <div key={campaign.id} className="card card-hover overflow-hidden">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img 
                        src={campaign.image} 
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Resim yüklenemezse varsayılan görünüm göster
                          (e.target as HTMLImageElement).style.display = 'none';
                          e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                          e.currentTarget.parentElement!.innerHTML = `<div class="text-2xl font-bold text-gray-400">${campaign.brand}</div>`;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-gray-800">{campaign.title}</h3>
                        <Link href={`/brands/${campaign.brandId}`}>
                          <div className="badge badge-primary">{campaign.brand}</div>
                        </Link>
                      </div>
                      <p className="text-gray-600 mb-4">{campaign.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Son tarih:</span> {campaign.expiryDate}
                        </div>
                        <Link href={`/campaigns/${campaign.id}`} className="text-primary font-medium hover:text-primary-dark">
                          Detaylar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="text-5xl mb-4">☕</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Kampanya Bulunamadı</h3>
                <p className="text-gray-600 mb-6">Arama kriterlerinize uygun kampanya bulunamadı.</p>
                <button 
                  className="btn btn-outline"
                  onClick={clearFilters}
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
