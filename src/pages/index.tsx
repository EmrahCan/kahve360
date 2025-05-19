import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Kahve markaları verileri
const brands = [
  { id: 1, name: 'Starbucks', logo: '/starbucks.png', points: 450, campaigns: 5 },
  { id: 2, name: 'Gloria Jeans', logo: '/gloriajeans.png', points: 320, campaigns: 3 },
  { id: 3, name: 'Caribou Coffee', logo: '/caribou.png', points: 180, campaigns: 2 },
  { id: 4, name: 'Coffee Lab', logo: '/coffeelab.png', points: 210, campaigns: 4 },
  { id: 5, name: 'Tchibo', logo: '/tchibo.png', points: 150, campaigns: 2 },
  { id: 6, name: 'Espresso Lab', logo: '/espressolab.png', points: 280, campaigns: 3 },
];

// Aktif kampanyalar
const campaigns = [
  { 
    id: 1, 
    brand: 'Starbucks', 
    title: '2. içecek %50 indirimli', 
    description: 'Hafta içi 14:00-17:00 arası geçerlidir',
    expiryDate: '31 Mayıs 2025',
    image: '/campaign1.jpg'
  },
  { 
    id: 2, 
    brand: 'Gloria Jeans', 
    title: 'Kahve + Sandviç 150 TL', 
    description: 'Tüm şubelerde geçerlidir',
    expiryDate: '15 Haziran 2025',
    image: '/campaign2.jpg'
  },
  { 
    id: 3, 
    brand: 'Coffee Lab', 
    title: 'Yeni üyelere ilk kahve hediye', 
    description: 'Uygulama üzerinden siparişlerde geçerlidir',
    expiryDate: '30 Haziran 2025',
    image: '/campaign3.jpg'
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>CafeConnect - Tüm Kahve Markaları Tek Uygulamada</title>
        <meta name="description" content="CafeConnect ile tüm kahve markalarını tek uygulamada takip edin, kampanyalardan haberdar olun ve sadakat puanlarınızı biriktirin." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    Tüm Kahve Markaları <br />
                    <span className="text-secondary">Tek Uygulamada</span>
                  </h1>
                  <p className="text-lg mb-8 text-gray-100">
                    Kahve360 ile favori kahve markalarınızın kampanyalarını takip edin, 
                    sadakat puanlarınızı biriktirin ve size en yakın şubeleri bulun.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/register" className="btn bg-secondary text-primary-dark hover:bg-secondary-dark font-bold">
                      Hemen Başla
                    </Link>
                    <Link href="/brands" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                      Markaları Keşfet
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative w-full max-w-md h-[500px]">
                    <div className="absolute top-0 right-0 w-64 h-96 bg-white rounded-2xl shadow-lg transform rotate-6">
                      <div className="p-4 h-full flex flex-col">
                        <div className="w-10 h-10 rounded-full bg-white mb-3 flex items-center justify-center overflow-hidden border border-gray-100">
                          <img 
                            src="/starbucks.png" 
                            alt="Starbucks logosu"
                            className="w-8 h-8 object-contain p-1"
                            loading="eager"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<div class="text-white font-bold">S</div>`;
                              e.currentTarget.parentElement!.classList.add('bg-primary');
                            }}
                          />
                        </div>
                        <h3 className="font-bold text-[#006241]">Starbucks</h3>
                        <div className="mt-3 bg-gray-100 rounded-lg p-3 flex-grow">
                          <div className="text-xs text-gray-500 mb-1">Sadakat Puanı</div>
                          <div className="text-xl font-bold text-primary">450 <span className="text-sm font-normal">puan</span></div>
                          <div className="mt-4 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-secondary rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">500 puana 50 puan kaldı</div>
                          
                          <div className="mt-6">
                            <div className="text-xs text-gray-500 mb-1">Aktif Kampanyalar</div>
                            <div className="space-y-2">
                              <div className="bg-white p-2 rounded-lg text-xs shadow-sm">
                                2. içecek %50 indirimli
                              </div>
                              <div className="bg-white p-2 rounded-lg text-xs shadow-sm">
                                Hafta sonu kahvaltı menüsü 2 kişilik
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-64 h-96 bg-white rounded-2xl shadow-lg transform -rotate-3">
                      <div className="p-4 h-full flex flex-col">
                        <div className="w-10 h-10 rounded-full bg-white mb-3 flex items-center justify-center overflow-hidden border border-gray-100">
                          <img 
                            src="/gloriajeans.png" 
                            alt="Gloria Jeans logosu"
                            className="w-8 h-8 object-contain p-1"
                            loading="eager"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<div class="text-white font-bold">G</div>`;
                              e.currentTarget.parentElement!.classList.add('bg-[#8B4513]');
                            }}
                          />
                        </div>
                        <h3 className="font-bold text-[#8B4513]">Gloria Jeans</h3>
                        <div className="mt-3 bg-gray-100 rounded-lg p-3 flex-grow">
                          <div className="text-xs text-gray-500 mb-1">Sadakat Puanı</div>
                          <div className="text-xl font-bold text-[#8B4513]">320 <span className="text-sm font-normal">puan</span></div>
                          <div className="mt-4 h-2 bg-gray-200 rounded-full">
                            <div className="h-2 bg-[#D2B48C] rounded-full" style={{ width: '32%' }}></div>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">1000 puana 680 puan kaldı</div>
                          
                          <div className="mt-6">
                            <div className="text-xs text-gray-500 mb-1">Aktif Kampanyalar</div>
                            <div className="space-y-2">
                              <div className="bg-white p-2 rounded-lg text-xs shadow-sm">
                                Kahve + Sandviç 150 TL
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-accent">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">Neden CafeConnect?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  CafeConnect, kahve tutkunları için tasarlanmış, tüm kahve markalarını tek bir platformda buluşturan yenilikçi bir uygulamadır.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="card card-hover p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Tek Uygulamada Çoklu Marka</h3>
                  <p className="text-gray-600">
                    Farklı kahve markalarının kampanyalarını, sadakat kartlarını ve şubelerini tek bir uygulamada takip edin.
                  </p>
                </div>
                
                <div className="card card-hover p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Sadakat Puanları</h3>
                  <p className="text-gray-600">
                    Tüm markalardan kazandığınız sadakat puanlarını tek bir yerden takip edin ve fırsatları kaçırmayın.
                  </p>
                </div>
                
                <div className="card card-hover p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Şube Bulucu</h3>
                  <p className="text-gray-600">
                    Size en yakın kahve dükkanlarını harita üzerinde görün, çalışma saatlerini ve yoğunluk durumunu öğrenin.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Brands Section */}
          <section className="py-16 bg-white">
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4 md:mb-0">Markalar</h2>
                <Link href="/brands" className="btn btn-outline">
                  Tüm Markaları Gör
                </Link>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {brands.map((brand) => (
                  <Link key={brand.id} href={`/brands/${brand.id}`}>
                    <div className="card card-hover p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 overflow-hidden border border-gray-100">
                        {brand.logo ? (
                          <img 
                            src={brand.logo}
                            alt={`${brand.name} logosu`}
                            className="w-12 h-12 object-contain p-1"
                            loading="eager"
                            onError={(e) => {
                              // Logo yüklenemezse ilk harfi göster
                              (e.target as HTMLImageElement).style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<div class="font-bold text-2xl text-primary">${brand.name.charAt(0)}</div>`;
                            }}
                          />
                        ) : (
                          <div className="font-bold text-2xl text-primary">{brand.name.charAt(0)}</div>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-800 mb-2">{brand.name}</h3>
                      <div className="text-sm text-gray-500 mb-3">{brand.points} puan</div>
                      <div className="badge badge-secondary">{brand.campaigns} kampanya</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Campaigns Section */}
          <section className="py-16 bg-accent">
            <div className="container">
              <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <h2 className="text-3xl font-bold text-primary mb-4 md:mb-0">Güncel Kampanyalar</h2>
                <Link href="/campaigns" className="btn btn-outline">
                  Tüm Kampanyaları Gör
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaigns.map((campaign) => (
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
                        <div className="badge badge-primary">{campaign.brand}</div>
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
            </div>
          </section>

          {/* Map Preview Section */}
          <section className="py-16 bg-white">
            <div className="container">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                  <h2 className="text-3xl font-bold text-primary mb-4">Size En Yakın Kahveciler</h2>
                  <p className="text-gray-600 mb-6">
                    Kahve360 ile konumunuza en yakın kahve dükkanlarını anında bulun. Çalışma saatlerini, 
                    yoğunluk durumunu ve kullanıcı yorumlarını görüntüleyin.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-accent rounded-lg">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold mr-4">S</div>
                      <div className="flex-grow">
                        <h3 className="font-medium">Starbucks - Levent</h3>
                        <p className="text-sm text-gray-500">0.3 km uzaklıkta</p>
                      </div>
                      <div className="badge badge-secondary">Açık</div>
                    </div>
                    <div className="flex items-center p-4 bg-accent rounded-lg">
                      <div className="w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center text-white font-bold mr-4">G</div>
                      <div className="flex-grow">
                        <h3 className="font-medium">Gloria Jeans - Kanyon AVM</h3>
                        <p className="text-sm text-gray-500">0.5 km uzaklıkta</p>
                      </div>
                      <div className="badge badge-secondary">Açık</div>
                    </div>
                    <div className="flex items-center p-4 bg-accent rounded-lg">
                      <div className="w-10 h-10 bg-[#654321] rounded-full flex items-center justify-center text-white font-bold mr-4">C</div>
                      <div className="flex-grow">
                        <h3 className="font-medium">Coffee Lab - Maslak</h3>
                        <p className="text-sm text-gray-500">1.2 km uzaklıkta</p>
                      </div>
                      <div className="badge badge-secondary">Açık</div>
                    </div>
                  </div>
                  <Link href="/map" className="btn btn-primary mt-6">
                    Haritayı Aç
                  </Link>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-lg h-96 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl font-bold text-gray-400">Harita Görünümü</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-primary text-white">
            <div className="container text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Kahve Deneyiminizi Dönüştürün</h2>
              <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
                Kahve360 ile tüm kahve markalarını tek uygulamada yönetin, kampanyaları kaçırmayın ve sadakat puanlarınızı biriktirin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn bg-white text-primary hover:bg-gray-100 font-bold">
                  Hemen Ücretsiz Üye Ol
                </Link>
                <Link href="/about" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                  Daha Fazla Bilgi
                </Link>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
