import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRCodeCard from '@/components/QRCodeCard';
import { useAuth } from '@/contexts/AuthContext';

// Sadakat kartı verileri
const loyaltyCards = [
  {
    id: 1,
    brand: 'Starbucks',
    brandId: 1,
    logo: '/starbucks.png',
    color: '#006241',
    points: 450,
    totalPoints: 1000,
    nextReward: 'Grande Boy İçecek',
    pointsToNextReward: 50,
    recentTransactions: [
      { id: 1, date: '15 Mayıs 2025', amount: '120 TL', points: '+12', location: 'Levent' },
      { id: 2, date: '10 Mayıs 2025', amount: '85 TL', points: '+8', location: 'Kanyon AVM' }
    ]
  },
  {
    id: 2,
    brand: 'Gloria Jeans',
    brandId: 2,
    logo: '/gloriajeans.png',
    color: '#8B4513',
    points: 320,
    totalPoints: 1000,
    nextReward: 'Medium Boy İçecek',
    pointsToNextReward: 180,
    recentTransactions: [
      { id: 1, date: '12 Mayıs 2025', amount: '110 TL', points: '+11', location: 'Kanyon AVM' },
      { id: 2, date: '5 Mayıs 2025', amount: '75 TL', points: '+7', location: 'Zorlu Center' }
    ]
  },
  {
    id: 3,
    brand: 'Caribou Coffee',
    brandId: 3,
    logo: '/caribou.png',
    color: '#7E392F',
    points: 180,
    totalPoints: 500,
    nextReward: 'Dilediğiniz İçecek',
    pointsToNextReward: 70,
    recentTransactions: [
      { id: 1, date: '14 Mayıs 2025', amount: '95 TL', points: '+9', location: 'Nişantaşı' }
    ]
  },
  {
    id: 4,
    brand: 'Coffee Lab',
    brandId: 4,
    logo: '/coffeelab.png',
    color: '#654321',
    points: 210,
    totalPoints: 600,
    nextReward: 'Filtre Kahve',
    pointsToNextReward: 40,
    recentTransactions: [
      { id: 1, date: '11 Mayıs 2025', amount: '105 TL', points: '+10', location: 'Maslak' },
      { id: 2, date: '3 Mayıs 2025', amount: '65 TL', points: '+6', location: 'Maslak' }
    ]
  },
  {
    id: 5,
    brand: 'Tchibo',
    brandId: 5,
    logo: '/tchibo.png',
    color: '#000000',
    points: 150,
    totalPoints: 500,
    nextReward: 'Çekirdek Kahve 250gr',
    pointsToNextReward: 100,
    recentTransactions: [
      { id: 1, date: '8 Mayıs 2025', amount: '80 TL', points: '+8', location: 'Cevahir AVM' }
    ]
  }
];

export default function Loyalty() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { user } = useAuth();
  
  // Kullanıcı kimliği (gerçek uygulamada bu kullanıcı oturumundan alınır)
  const userId = user?.id || 'demo-user';
  
  // Toplam puan hesaplama
  const totalPoints = loyaltyCards.reduce((sum, card) => sum + card.points, 0);
  
  // QR kod gösterme
  const showQRCode = (cardId: number) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };
  
  return (
    <>
      <Head>
        <title>Sadakat Kartlarım - CafeConnect</title>
        <meta name="description" content="CafeConnect ile tüm kahve markalarındaki sadakat puanlarınızı tek bir yerden yönetin." />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-primary mb-2">Sadakat Kartlarım</h1>
              <p className="text-gray-600 max-w-2xl">
                Tüm kahve markalarındaki sadakat puanlarınızı tek bir yerden yönetin ve takip edin.
              </p>
            </div>
            
            {/* Toplam Puan Özeti */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Toplam CafeConnect Puanı</h2>
                  <p className="text-gray-600">Tüm markalardan kazandığınız toplam puan</p>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <div className="text-4xl font-bold text-primary">{totalPoints}</div>
                  <div className="text-sm text-gray-500">puan</div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-accent rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{loyaltyCards.length}</div>
                  <div className="text-sm text-gray-600">Aktif Kart</div>
                </div>
                <div className="bg-accent rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-gray-600">Bu Ay Kazanılan</div>
                </div>
                <div className="bg-accent rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-gray-600">Kullanılan Ödül</div>
                </div>
                <div className="bg-accent rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-sm text-gray-600">Bekleyen Ödül</div>
                </div>
              </div>
            </div>
            
            {/* Sadakat Kartları */}
            <div className="space-y-6">
              {loyaltyCards.map(card => {
                const progressPercentage = (card.points / card.totalPoints) * 100;
                const isActive = activeCard === card.id;
                
                return (
                  <div key={card.id} className="card card-hover overflow-hidden">
                    <div className="p-6" style={{ backgroundColor: card.color, color: 'white' }}>
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 overflow-hidden">
                            {card.logo ? (
                              <img 
                                src={card.logo} 
                                alt={`${card.brand} logosu`}
                                className="w-8 h-8 object-contain p-1"
                                loading="eager"
                                onError={(e) => {
                                  // Logo yüklenemezse ilk harfi göster
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  e.currentTarget.parentElement!.innerHTML = `<div class="font-bold text-xl" style="color: ${card.color}">${card.brand.charAt(0)}</div>`;
                                }}
                              />
                            ) : (
                              <div className="font-bold text-xl" style={{ color: card.color }}>{card.brand.charAt(0)}</div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{card.brand}</h3>
                            <p className="text-white/80 text-sm">Sadakat Kartı</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-center mr-6">
                            <div className="text-3xl font-bold">{card.points}</div>
                            <div className="text-white/80 text-sm">Puan</div>
                          </div>
                          <button 
                            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                            onClick={() => showQRCode(card.id)}
                          >
                            {isActive ? 'QR Kodu Gizle' : 'QR Kodu Göster'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span>İlerleme</span>
                          <span>{card.points} / {card.totalPoints}</span>
                        </div>
                        <div className="h-3 bg-white/20 rounded-full">
                          <div 
                            className="h-3 bg-white rounded-full" 
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
                        <div>
                          <div className="text-sm text-white/80">Sonraki Ödül</div>
                          <div className="font-medium">{card.nextReward}</div>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <div className="text-sm text-white/80">Kalan Puan</div>
                          <div className="font-medium">{card.pointsToNextReward} puan</div>
                        </div>
                      </div>
                    </div>
                    
                    {isActive && (
                      <div className="p-6 bg-white border-t border-gray-100">
                        <div className="flex flex-col md:flex-row items-center">
                          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
                            <QRCodeCard 
                              cardId={card.id}
                              brand={card.brand}
                              userId={userId}
                            />
                          </div>
                          <div className="md:w-2/3 md:pl-6">
                            <h4 className="text-lg font-bold text-gray-800 mb-3">Son İşlemler</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puan</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şube</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {card.recentTransactions.map(transaction => (
                                    <tr key={transaction.id}>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{transaction.date}</td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{transaction.amount}</td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-green-600">{transaction.points}</td>
                                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{transaction.location}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <Link href={`/brands/${card.brandId}`} className="text-primary font-medium hover:text-primary-dark">
                                Tüm İşlemleri Gör
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4 bg-white border-t border-gray-100 flex justify-between">
                      <Link href={`/brands/${card.brandId}`} className="text-primary font-medium hover:text-primary-dark">
                        Marka Detayları
                      </Link>
                      <Link href={`/brands/${card.brandId}#campaigns`} className="text-primary font-medium hover:text-primary-dark">
                        Kampanyaları Gör
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Yeni Kart Ekleme */}
            <div className="mt-8 card card-hover p-6 border-2 border-dashed border-gray-300 bg-white/50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Yeni Kart Ekle</h3>
              <p className="text-gray-600 max-w-md">
                Henüz Kahve360'a eklenmemiş bir kahve markasının sadakat kartını ekleyin.
              </p>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
