import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MapView from '@/components/MapView';
import dynamic from 'next/dynamic';

// Harita bileşenini istemci tarafında dinamik olarak yükleme
const DynamicMapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-2">Harita yükleniyor...</p>
      </div>
    </div>
  )
});

// Şube verileri
const branches = [
  { 
    id: 1, 
    brand: 'Starbucks', 
    brandId: 1,
    name: 'Levent', 
    address: 'Büyükdere Cad. No:185 Levent/İstanbul', 
    distance: '0.3 km', 
    isOpen: true, 
    openHours: '07:00 - 22:00',
    lat: 41.0811,
    lng: 29.0111,
    rating: 4.2,
    crowdLevel: 'Orta',
    amenities: ['Wi-Fi', 'Priz', 'Teras']
  },
  { 
    id: 2, 
    brand: 'Starbucks', 
    brandId: 1,
    name: 'Kanyon AVM', 
    address: 'Kanyon AVM Zemin Kat No:123 Levent/İstanbul', 
    distance: '0.7 km', 
    isOpen: true, 
    openHours: '10:00 - 22:00',
    lat: 41.0794,
    lng: 29.0119,
    rating: 4.5,
    crowdLevel: 'Yoğun',
    amenities: ['Wi-Fi', 'Priz', 'Otopark']
  },
  { 
    id: 3, 
    brand: 'Starbucks', 
    brandId: 1,
    name: 'Maslak', 
    address: 'Büyükdere Cad. No:237 Maslak/İstanbul', 
    distance: '1.5 km', 
    isOpen: true, 
    openHours: '07:30 - 21:00',
    lat: 41.1111,
    lng: 29.0222,
    rating: 4.0,
    crowdLevel: 'Az',
    amenities: ['Wi-Fi', 'Priz', 'Otopark']
  },
  { 
    id: 4, 
    brand: 'Gloria Jeans', 
    brandId: 2,
    name: 'Kanyon AVM', 
    address: 'Kanyon AVM 1. Kat No:45 Levent/İstanbul', 
    distance: '0.5 km', 
    isOpen: true, 
    openHours: '10:00 - 22:00',
    lat: 41.0795,
    lng: 29.0120,
    rating: 4.3,
    crowdLevel: 'Orta',
    amenities: ['Wi-Fi', 'Priz']
  },
  { 
    id: 5, 
    brand: 'Gloria Jeans', 
    brandId: 2,
    name: 'Zorlu Center', 
    address: 'Zorlu Center AVM Zemin Kat Beşiktaş/İstanbul', 
    distance: '3.2 km', 
    isOpen: true, 
    openHours: '10:00 - 22:00',
    lat: 41.0667,
    lng: 29.0167,
    rating: 4.4,
    crowdLevel: 'Yoğun',
    amenities: ['Wi-Fi', 'Priz', 'Otopark', 'Teras']
  },
  { 
    id: 6, 
    brand: 'Coffee Lab', 
    brandId: 4,
    name: 'Maslak', 
    address: 'Büyükdere Cad. No:245 Maslak/İstanbul', 
    distance: '1.2 km', 
    isOpen: true, 
    openHours: '08:00 - 20:00',
    lat: 41.1115,
    lng: 29.0225,
    rating: 4.7,
    crowdLevel: 'Az',
    amenities: ['Wi-Fi', 'Priz', 'Teras']
  },
  { 
    id: 7, 
    brand: 'Caribou Coffee', 
    brandId: 3,
    name: 'Nişantaşı', 
    address: 'Teşvikiye Cad. No:12 Nişantaşı/İstanbul', 
    distance: '4.5 km', 
    isOpen: true, 
    openHours: '08:00 - 23:00',
    lat: 41.0489,
    lng: 28.9872,
    rating: 4.6,
    crowdLevel: 'Yoğun',
    amenities: ['Wi-Fi', 'Priz', 'Teras']
  },
  { 
    id: 8, 
    brand: 'Tchibo', 
    brandId: 5,
    name: 'Cevahir AVM', 
    address: 'Cevahir AVM 1. Kat No:123 Şişli/İstanbul', 
    distance: '5.2 km', 
    isOpen: true, 
    openHours: '10:00 - 22:00',
    lat: 41.0628,
    lng: 28.9947,
    rating: 4.1,
    crowdLevel: 'Orta',
    amenities: ['Wi-Fi', 'Priz']
  }
];

// Marka filtreleme için markalar
const brands = [
  { id: 1, name: 'Starbucks' },
  { id: 2, name: 'Gloria Jeans' },
  { id: 3, name: 'Caribou Coffee' },
  { id: 4, name: 'Coffee Lab' },
  { id: 5, name: 'Tchibo' },
  { id: 6, name: 'Espresso Lab' },
];

// Özellik filtreleme için özellikler
const amenities = ['Wi-Fi', 'Priz', 'Teras', 'Otopark'];

export default function Map() {
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  
  // Filtreleme işlemi
  const filteredBranches = branches.filter(branch => {
    // Marka filtresi
    if (selectedBrand !== null && branch.brandId !== selectedBrand) {
      return false;
    }
    
    // Özellik filtresi
    if (selectedAmenities.length > 0) {
      const hasAllAmenities = selectedAmenities.every(amenity => 
        branch.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }
    
    // Arama filtresi
    if (searchQuery && !branch.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !branch.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !branch.address.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Sıralama işlemi
  const sortedBranches = [...filteredBranches].sort((a, b) => {
    if (sortBy === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else {
      return b.rating - a.rating;
    }
  });
  
  // Özellik seçme/kaldırma
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };
  
  // Tüm filtreleri temizle
  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedAmenities([]);
    setSearchQuery('');
  };
  
  return (
    <>
      <Head>
        <title>Şube Bulucu - CafeConnect</title>
        <meta name="description" content="CafeConnect ile size en yakın kahve dükkanlarını bulun." />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-accent py-10">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start mb-10">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Şube Bulucu</h1>
                <p className="text-gray-600 max-w-2xl">
                  Size en yakın kahve dükkanlarını bulun, çalışma saatlerini ve özelliklerini görüntüleyin.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Şube veya adres ara..."
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Filtreler */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Filtreler</h2>
                    
                    {(selectedBrand !== null || selectedAmenities.length > 0 || searchQuery) && (
                      <button 
                        className="text-primary font-medium hover:text-primary-dark flex items-center"
                        onClick={clearFilters}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Temizle
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
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
                                className="w-4 h-4 object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                  e.currentTarget.parentElement!.innerHTML = `${brand.name.charAt(0)}`;
                                }}
                              />
                            </span>
                            {brand.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Özellikler</label>
                      <div className="space-y-2">
                        {amenities.map(amenity => (
                          <div key={amenity} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`amenity-${amenity}`}
                              checked={selectedAmenities.includes(amenity)}
                              onChange={() => toggleAmenity(amenity)}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sıralama</label>
                      <div className="flex gap-2">
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            sortBy === 'distance' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => setSortBy('distance')}
                        >
                          Uzaklık
                        </button>
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            sortBy === 'rating' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          onClick={() => setSortBy('rating')}
                        >
                          Puan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Konumunuz</h2>
                  <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Harita görünümü</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Mevcut konum:</p>
                    <p className="font-medium">Levent, İstanbul</p>
                  </div>
                  <button className="btn btn-outline w-full mt-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Konumu Güncelle
                  </button>
                </div>
              </div>
              
              {/* Harita ve Şube Listesi */}
              <div className="lg:col-span-2">
                {/* Harita */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                  <div className="h-96 rounded-lg overflow-hidden">
                    <DynamicMapView 
                      locations={sortedBranches.map(branch => ({
                        id: branch.id,
                        brand: branch.brand,
                        name: branch.name,
                        address: branch.address,
                        lat: branch.lat,
                        lng: branch.lng,
                        isOpen: branch.isOpen
                      }))}
                      onMarkerClick={(location) => {
                        // Seçilen şubeyi vurgulama işlemi burada yapılabilir
                        console.log('Seçilen şube:', location);
                      }}
                    />
                  </div>
                </div>
                
                {/* Şube Listesi */}
                {sortedBranches.length > 0 ? (
                  <div className="space-y-4">
                    {sortedBranches.map(branch => (
                      <div key={branch.id} className="card card-hover p-6">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="font-bold text-lg text-gray-800 mr-3">{branch.brand} - {branch.name}</h3>
                              <div className={`badge ${branch.isOpen ? 'badge-secondary' : 'bg-gray-300'}`}>
                                {branch.isOpen ? 'Açık' : 'Kapalı'}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-2">{branch.address}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {branch.amenities.map(amenity => (
                                <span key={amenity} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium mr-4">Çalışma Saatleri: {branch.openHours}</span>
                              <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {branch.rating}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 flex flex-col items-end">
                            <div className="text-lg font-bold text-primary mb-2">{branch.distance}</div>
                            <div className="text-sm text-gray-500 mb-4">Yoğunluk: {branch.crowdLevel}</div>
                            <div className="flex gap-2">
                              <button className="btn btn-outline py-2 px-4">Yol Tarifi</button>
                              <Link href={`/brands/${branch.brandId}`} className="btn btn-primary py-2 px-4">
                                Detaylar
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                    <div className="text-5xl mb-4">☕</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Şube Bulunamadı</h3>
                    <p className="text-gray-600 mb-6">Arama kriterlerinize uygun şube bulunamadı.</p>
                    <button 
                      className="btn btn-outline"
                      onClick={clearFilters}
                    >
                      Filtreleri Temizle
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
