import { useState } from 'react';
import { useRouter } from 'next/router';
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

interface BrandsData {
  [key: string]: Brand;
}

// Marka verileri (gerçek uygulamada API'den gelecek)
const brandsData: BrandsData = {
  '1': {
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
      },
      { 
        id: 3, 
        title: 'Yeni üyelere ilk kahve bedava', 
        description: 'Sadece mobil uygulama üzerinden geçerlidir',
        expiryDate: '31 Temmuz 2025',
        image: '/campaign3.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Levent', address: 'Büyükdere Cad. No:185 Levent/İstanbul', distance: '0.3 km', isOpen: true, openHours: '07:00 - 22:00' },
      { id: 2, name: 'Kanyon AVM', address: 'Kanyon AVM Zemin Kat No:123 Levent/İstanbul', distance: '0.7 km', isOpen: true, openHours: '10:00 - 22:00' },
      { id: 3, name: 'Maslak', address: 'Büyükdere Cad. No:237 Maslak/İstanbul', distance: '1.5 km', isOpen: true, openHours: '07:30 - 21:00' }
    ],
    transactions: [
      { id: 1, date: '15 Mayıs 2025', amount: '120 TL', points: '+12', location: 'Levent' },
      { id: 2, date: '10 Mayıs 2025', amount: '85 TL', points: '+8', location: 'Kanyon AVM' },
      { id: 3, date: '5 Mayıs 2025', amount: '150 TL', points: '+15', location: 'Maslak' },
      { id: 4, date: '1 Mayıs 2025', amount: '95 TL', points: '+9', location: 'Levent' }
    ]
  },
  '2': {
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
      },
      { 
        id: 2, 
        title: 'İkinci içecek 1 TL', 
        description: 'Hafta içi 15:00-18:00 arası geçerlidir',
        expiryDate: '30 Haziran 2025',
        image: '/campaign2.jpg'
      }
    ],
    branches: [
      { id: 1, name: 'Kanyon AVM', address: 'Kanyon AVM 1. Kat No:45 Levent/İstanbul', distance: '0.5 km', isOpen: true, openHours: '10:00 - 22:00' },
      { id: 2, name: 'Zorlu Center', address: 'Zorlu Center AVM Zemin Kat Beşiktaş/İstanbul', distance: '3.2 km', isOpen: true, openHours: '10:00 - 22:00' }
    ],
    transactions: [
      { id: 1, date: '12 Mayıs 2025', amount: '110 TL', points: '+11', location: 'Kanyon AVM' },
      { id: 2, date: '5 Mayıs 2025', amount: '75 TL', points: '+7', location: 'Zorlu Center' },
      { id: 3, date: '28 Nisan 2025', amount: '130 TL', points: '+13', location: 'Kanyon AVM' }
    ]
  }
};

export default function BrandDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = useState('campaigns');
  
  // Sayfa yüklenirken id henüz mevcut olmayabilir
  if (!id || !brandsData[id as string]) {
    return (
      <>
        <Header />
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold text-primary">Yükleniyor...</h2>
        </div>
        <Footer />
      </>
    );
  }
  
  const brand: Brand = brandsData[id as string];
  const progressPercentage = (brand.points / brand.totalPoints) * 100;
  
  return (
    <>
      <Head>
        <title>{brand.name} - CafeConnect</title>
        <meta name="description" content={`${brand.name} kampanyaları, sadakat puanları ve şubeleri - CafeConnect`} />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Brand Header */}
          <section className="py-10" style={{ backgroundColor: brand.color, color: 'white' }}>
            <div className="container">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8 overflow-hidden">
                  {brand.logo ? (
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logosu`}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        // Logo yüklenemezse ilk harfi göster
                        (e.target as HTMLImageElement).style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<div class="font-bold text-4xl" style="color: ${brand.color}">${brand.name.charAt(0)}</div>`;
                      }}
                    />
                  ) : (
                    <div className="font-bold text-4xl" style={{ color: brand.color }}>{brand.name.charAt(0)}</div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{brand.name}</h1>
                  <p className="text-white/80 max-w-2xl">{brand.description}</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Loyalty Card Section */}
          <section className="py-10 bg-white">
            <div className="container">
              <div className="card bg-gradient-to-r from-primary to-primary-dark text-white p-6 md:p-8 rounded-2xl max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Sadakat Kartı</h2>
                    <p className="text-white/80">{brand.name}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-4xl font-bold">{brand.points}</div>
                    <div className="text-white/80 text-sm">Toplam Puan</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>İlerleme</span>
                    <span>{brand.points} / {brand.totalPoints}</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full">
                    <div 
                      className="h-3 bg-secondary rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <div className="text-sm text-white/80">Sonraki Ödül</div>
                    <div className="font-medium">{brand.nextReward}</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-sm text-white/80">Kalan Puan</div>
                    <div className="font-medium">{brand.pointsToNextReward} puan</div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                      <div className="text-center font-medium">QR Kodu Göster</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Tabs Section */}
          <section className="py-10 bg-accent">
            <div className="container">
              <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                <button 
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'campaigns' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
                  onClick={() => setActiveTab('campaigns')}
                >
                  Kampanyalar
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'branches' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
                  onClick={() => setActiveTab('branches')}
                >
                  Şubeler
                </button>
                <button 
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'transactions' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  İşlem Geçmişi
                </button>
              </div>
              
              {/* Campaigns Tab */}
              {activeTab === 'campaigns' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {brand.campaigns.map((campaign: Campaign) => (
                    <div key={campaign.id} className="card card-hover overflow-hidden">
                      <div className="h-40 bg-gray-200 relative overflow-hidden">
                        <img 
                          src={campaign.image} 
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Resim yüklenemezse varsayılan görünüm göster
                            (e.target as HTMLImageElement).style.display = 'none';
                            e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                            e.currentTarget.parentElement!.innerHTML = `<div class="text-xl font-bold text-gray-400">${campaign.title}</div>`;
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{campaign.title}</h3>
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
              )}
              
              {/* Branches Tab */}
              {activeTab === 'branches' && (
                <div className="space-y-4">
                  {brand.branches.map((branch: Branch) => (
                    <div key={branch.id} className="card card-hover p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-bold text-lg text-gray-800 mr-3">{brand.name} - {branch.name}</h3>
                            <div className={`badge ${branch.isOpen ? 'badge-secondary' : 'bg-gray-300'}`}>
                              {branch.isOpen ? 'Açık' : 'Kapalı'}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{branch.address}</p>
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Çalışma Saatleri:</span> {branch.openHours}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col items-end">
                          <div className="text-lg font-bold text-primary mb-2">{branch.distance}</div>
                          <button className="btn btn-outline py-2 px-4">Yol Tarifi Al</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Transactions Tab */}
              {activeTab === 'transactions' && (
                <div className="card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puan</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şube</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {brand.transactions.map((transaction: Transaction) => (
                          <tr key={transaction.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{transaction.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{transaction.points}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{transaction.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
