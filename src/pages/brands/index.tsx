import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Tip tanımlamaları
interface Campaign {
  id: number;
  title: string;
  description: string;
  expiryDate: string;
  image: string;
}

interface Branch {
  id: number;
  name: string;
  address: string;
  distance: string;
  isOpen: boolean;
  openHours: string;
}

interface Transaction {
  id: number;
  date: string;
  amount: string;
  points: string;
  location: string;
}

interface Brand {
  id: number;
  name: string;
  logo: string;
  color: string;
  points: number;
  totalPoints: number;
  nextReward: string;
  pointsToNextReward: number;
  description: string;
  campaigns: Campaign[];
  branches: Branch[];
  transactions: Transaction[];
}

// Marka verileri (gerçek uygulamada API'den gelecek)
const brands: Brand[] = [
  {
    id: 1,
    name: 'Starbucks',
    logo: '/starbucks.png',
    color: '#006241',
    points: 450,
    totalPoints: 1000,
    nextReward: 'Grande Boy İçecek',
    pointsToNextReward: 50,
    description: 'Starbucks, 1971 yılında Seattle\'da kurulmuş, dünya çapında en büyük kahve zincirlerinden biridir. Yüksek kaliteli kahve çekirdekleri ve çeşitli içecek seçenekleriyle bilinir.',
    campaigns: [
      { 
        id: 1, 
        title: '2. içecek %50 indirimli', 
        description: 'Hafta içi 14:00-17:00 arası geçerlidir',
        expiryDate: '31 Mayıs 2025',
        image: '/campaign1.jpg'
      },
      { 
        id: 2, 
        title: 'Hafta sonu kahvaltı menüsü 2 kişilik', 
        description: 'Cumartesi ve Pazar günleri 09:00-12:00 arası geçerlidir',
        expiryDate: '30 Haziran 2025',
        image: '/campaign2.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Levent', address: 'Büyükdere Cad. No:185 Levent/İstanbul', distance: '0.3 km', isOpen: true, openHours: '07:00 - 22:00' },
      { id: 2, name: 'Kanyon AVM', address: 'Kanyon AVM Zemin Kat No:123 Levent/İstanbul', distance: '0.7 km', isOpen: true, openHours: '10:00 - 22:00' }
    ],
    transactions: [
      { id: 1, date: '15 Mayıs 2025', amount: '120 TL', points: '+12', location: 'Levent' },
      { id: 2, date: '10 Mayıs 2025', amount: '85 TL', points: '+8', location: 'Kanyon AVM' }
    ]
  },
  {
    id: 2,
    name: 'Gloria Jeans',
    logo: '/gloriajeans.png',
    color: '#8B4513',
    points: 320,
    totalPoints: 1000,
    nextReward: 'Medium Boy İçecek',
    pointsToNextReward: 180,
    description: 'Gloria Jean\'s Coffees, Avustralya merkezli uluslararası bir kahve zinciridir. Özel kahve karışımları ve çeşitli soğuk-sıcak içecekleriyle tanınır.',
    campaigns: [
      { 
        id: 1, 
        title: 'Kahve + Sandviç 150 TL', 
        description: 'Tüm şubelerde geçerlidir',
        expiryDate: '15 Haziran 2025',
        image: '/campaign1.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Kanyon AVM', address: 'Kanyon AVM 1. Kat No:45 Levent/İstanbul', distance: '0.5 km', isOpen: true, openHours: '10:00 - 22:00' }
    ],
    transactions: [
      { id: 1, date: '12 Mayıs 2025', amount: '95 TL', points: '+9', location: 'Kanyon AVM' }
    ]
  },
  {
    id: 3,
    name: 'Caribou Coffee',
    logo: '/caribou.png',
    color: '#7A5C61',
    points: 180,
    totalPoints: 1000,
    nextReward: 'Small Boy İçecek',
    pointsToNextReward: 70,
    description: 'Caribou Coffee, 1992 yılında Minnesota\'da kurulmuş, Amerika\'nın en büyük ikinci kahve zinciridir. El yapımı içecekleri ve sıcak ortamıyla bilinir.',
    campaigns: [
      { 
        id: 1, 
        title: 'Öğrenci indirimi %20', 
        description: 'Öğrenci kimliği göstererek tüm içeceklerde %20 indirim',
        expiryDate: '31 Ağustos 2025',
        image: '/campaign6.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Zorlu Center', address: 'Zorlu Center AVM Zemin Kat No:42 Zincirlikuyu/İstanbul', distance: '1.2 km', isOpen: true, openHours: '10:00 - 22:00' }
    ],
    transactions: [
      { id: 1, date: '8 Mayıs 2025', amount: '65 TL', points: '+6', location: 'Zorlu Center' }
    ]
  },
  {
    id: 4,
    name: 'Kahve Dünyası',
    logo: '/kahvedunyasi.png',
    color: '#8D2C1F',
    points: 210,
    totalPoints: 1000,
    nextReward: 'Çikolata Hediye',
    pointsToNextReward: 90,
    description: 'Kahve Dünyası, Türkiye\'nin önde gelen kahve zincirlerinden biridir. Türk kahvesi, çikolata ve tatlı çeşitleriyle tanınır.',
    campaigns: [
      { 
        id: 1, 
        title: 'Yeni üyelere ilk kahve hediye', 
        description: 'Uygulama üzerinden siparişlerde geçerlidir',
        expiryDate: '30 Haziran 2025',
        image: '/campaign3.jpg'
      },
      { 
        id: 2, 
        title: 'Kahve çekirdeği alana fincan hediye', 
        description: '250gr ve üzeri kahve çekirdeği alımlarında özel tasarım fincan hediye',
        expiryDate: '15 Temmuz 2025',
        image: '/campaign8.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Maslak', address: 'Büyükdere Cad. No:237 Maslak/İstanbul', distance: '1.2 km', isOpen: true, openHours: '08:00 - 21:00' },
      { id: 2, name: 'İstinye Park', address: 'İstinye Park AVM 1. Kat No:25 İstinye/İstanbul', distance: '3.5 km', isOpen: true, openHours: '10:00 - 22:00' }
    ],
    transactions: [
      { id: 1, date: '14 Mayıs 2025', amount: '110 TL', points: '+11', location: 'Maslak' }
    ]
  },
  {
    id: 5,
    name: 'Tchibo',
    logo: '/tchibo.png',
    color: '#00205B',
    points: 150,
    totalPoints: 1000,
    nextReward: 'French Press Hediye',
    pointsToNextReward: 350,
    description: 'Tchibo, Almanya merkezli bir kahve markasıdır. Kahve ürünleri, ev eşyaları ve giyim ürünleri satışı yapar.',
    campaigns: [
      { 
        id: 1, 
        title: 'İkinci içecek 1 TL', 
        description: 'Hafta içi 15:00-18:00 arası geçerlidir',
        expiryDate: '30 Haziran 2025',
        image: '/campaign5.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Akasya AVM', address: 'Akasya AVM 1. Kat No:52 Acıbadem/İstanbul', distance: '8.5 km', isOpen: true, openHours: '10:00 - 22:00' }
    ],
    transactions: [
      { id: 1, date: '5 Mayıs 2025', amount: '85 TL', points: '+8', location: 'Akasya AVM' }
    ]
  },
  {
    id: 6,
    name: 'Espresso Lab',
    logo: '/espressolab.png',
    color: '#4B2E39',
    points: 280,
    totalPoints: 1000,
    nextReward: 'Espresso Bardağı Hediye',
    pointsToNextReward: 220,
    description: 'Espresso Lab, özel kahve çekirdekleri ve demleme yöntemleriyle tanınan butik bir kahve zinciridir. Kahve tutkunları için üçüncü dalga kahve deneyimi sunar.',
    campaigns: [
      { 
        id: 1, 
        title: 'Doğum gününde kahve hediye', 
        description: 'Doğum gününüzde kimlik göstererek dilediğiniz içeceği ücretsiz alabilirsiniz',
        expiryDate: '31 Aralık 2025',
        image: '/campaign7.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Bebek', address: 'Cevdet Paşa Cad. No:53/A Bebek/İstanbul', distance: '7.2 km', isOpen: true, openHours: '08:00 - 23:00' }
    ],
    transactions: [
      { id: 1, date: '9 Mayıs 2025', amount: '75 TL', points: '+7', location: 'Bebek' }
    ]
  }
];

// Filtreleme kategorileri
const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'popular', name: 'Popüler' },
  { id: 'nearby', name: 'Yakındakiler' },
  { id: 'rewards', name: 'Ödül Fırsatları' }
];

export default function Brands() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Markaları filtreleme
  const filteredBrands = brands.filter(brand => {
    if (searchQuery && !brand.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedCategory === 'popular') {
      return brand.points > 200; // Popüler markaları puanlarına göre filtreleme
    }
    
    if (selectedCategory === 'nearby') {
      // Yakındaki şubeleri olan markaları filtreleme (en az bir şubesi 2km'den yakın olanlar)
      return brand.branches.some(branch => parseFloat(branch.distance) < 2);
    }
    
    if (selectedCategory === 'rewards') {
      // Ödül fırsatı yakın olan markaları filtreleme
      return brand.pointsToNextReward < 100;
    }
    
    return true;
  });

  return (
    <>
      <Head>
        <title>Kahve Markaları | CafeConnect</title>
        <meta name="description" content="CafeConnect uygulamasındaki tüm kahve markalarını keşfedin, kampanyalardan haberdar olun ve sadakat puanlarınızı biriktirin." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-primary text-white py-12">
            <div className="container">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Kahve Markaları</h1>
              <p className="text-lg text-gray-100 max-w-3xl">
                Tüm favori kahve markalarınız tek bir uygulamada. Kampanyaları takip edin, 
                sadakat puanlarınızı biriktirin ve size en yakın şubeleri bulun.
              </p>
            </div>
          </section>
          
          {/* Brands Section */}
          <section className="py-12 bg-gray-50">
            <div className="container">
              {/* Filters */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Markalar</h2>
                  
                  <div className="relative w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Marka ara..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔍
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedCategory === category.id 
                          ? 'bg-primary text-white' 
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Brands Grid */}
              {filteredBrands.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBrands.map(brand => (
                    <Link href={`/brands/${brand.id}`} key={brand.id}>
                      <div className="card card-hover overflow-hidden h-full">
                        <div className="h-40 relative" style={{ backgroundColor: brand.color }}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center overflow-hidden">
                              <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: brand.color }}
                              >
                                <span className="font-bold text-3xl text-white">{brand.name.charAt(0)}</span>
                              </div>
                              
                              {/* Gerçek logo yükleme denemesi - görünmez */}
                              <img 
                                src={brand.logo}
                                alt={`${brand.name} logosu`}
                                className="hidden"
                                loading="eager"
                                onLoad={(e) => {
                                  // Logo başarıyla yüklenirse göster
                                  const parent = e.currentTarget.parentElement;
                                  if (parent) {
                                    // Renkli arka planı kaldır
                                    parent.firstChild?.remove();
                                    // Logoyu görünür yap
                                    (e.target as HTMLImageElement).className = "w-20 h-20 object-contain p-2";
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-xl text-gray-800 mb-2">{brand.name}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{brand.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Sadakat Puanı</div>
                              <div className="font-bold text-primary">{brand.points} / {brand.totalPoints}</div>
                            </div>
                            
                            <div className="badge badge-accent">
                              {brand.campaigns.length} Kampanya
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Sonraki Ödül: {brand.nextReward}</div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: `${((brand.totalPoints - brand.pointsToNextReward) / brand.totalPoints) * 100}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {brand.pointsToNextReward} puan daha gerekiyor
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <div className="text-5xl mb-4">☕</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Marka Bulunamadı</h3>
                  <p className="text-gray-600 mb-6">Arama kriterlerinize uygun marka bulunamadı.</p>
                  <button 
                    className="btn btn-outline"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                  >
                    Filtreleri Temizle
                  </button>
                </div>
              )}
            </div>
          </section>
          
          {/* CTA Section */}
          <section className="py-12 bg-accent">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-primary mb-3">Tüm Markalar Tek Uygulamada</h2>
                  <p className="text-gray-600">
                    CafeConnect ile tüm kahve markalarının sadakat kartlarını tek bir uygulamada toplayın. 
                    Artık cüzdanınızda onlarca kart taşımanıza gerek yok!
                  </p>
                </div>
                <div>
                  <Link href="/register" className="btn btn-primary">
                    Hemen Üye Ol
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
