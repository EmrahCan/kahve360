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
    brand: 'Kahve Dünyası', 
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
  { id: 4, name: 'Kahve Dünyası' },
  { id: 5, name: 'Tchibo' },
  { id: 6, name: 'Espresso Lab' },
];

// Özellik filtreleme için özellikler
const amenities = ['Wi-Fi', 'Priz', 'Teras', 'Otopark'];

// Mesafe hesaplama fonksiyonu (Haversine formülü)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Dünya yarıçapı (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function Map() {
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [branchesWithDistance, setBranchesWithDistance] = useState(branches);
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Manuel konum girişi için
  const [manualLocation, setManualLocation] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualLocationStatus, setManualLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // Örnek konumlar - İstanbul'un popüler semtleri
  const popularLocations = [
    { name: 'Levent', lat: 41.0811, lng: 29.0111 },
    { name: 'Nişantaşı', lat: 41.0489, lng: 28.9872 },
    { name: 'Kadıköy', lat: 40.9926, lng: 29.0299 },
    { name: 'Beşiktaş', lat: 41.0435, lng: 29.0059 },
    { name: 'Bakırköy', lat: 40.9819, lng: 28.8772 },
    { name: 'Taksim', lat: 41.0370, lng: 28.9850 }
  ];
  
  // Kullanıcı konumunu alma
  useEffect(() => {
    const getUserLocation = async () => {
      // Önce konum yükleniyor durumuna geç
      setLocationStatus('loading');
      setLocationError(null);
      
      if (!navigator.geolocation) {
        setLocationStatus('error');
        setLocationError('Tarayıcınız konum özelliğini desteklemiyor.');
        return;
      }
      
      try {
        // Önce konum izni var mı kontrol et
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        
        if (permissionStatus.state === 'denied') {
          setLocationStatus('error');
          setLocationError('Konum izni reddedildi. Lütfen tarayıcı ayarlarınızdan konum iznini etkinleştirin.');
          return;
        }
        
        // Konum bilgisini al
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log('Konum alındı:', latitude, longitude);
            setUserLocation({ lat: latitude, lng: longitude });
            setLocationStatus('success');
            
            // Kullanıcı konumuna göre şubelerin mesafesini hesapla
            const updatedBranches = branches.map(branch => {
              const distance = calculateDistance(
                latitude, 
                longitude, 
                branch.lat, 
                branch.lng
              );
              
              return {
                ...branch,
                distance: distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`,
                distanceValue: distance // Sıralama için sayısal değer
              };
            });
            
            setBranchesWithDistance(updatedBranches);
          },
          (error) => {
            console.error('Konum alınamadı:', error.message);
            setLocationStatus('error');
            
            // Hata koduna göre daha anlaşılır mesajlar
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setLocationError('Konum izni reddedildi. Lütfen tarayıcı ayarlarınızdan konum iznini etkinleştirin.');
                break;
              case error.POSITION_UNAVAILABLE:
                setLocationError('Konum bilgisi alınamıyor. Lütfen daha sonra tekrar deneyin.');
                break;
              case error.TIMEOUT:
                setLocationError('Konum alımı zaman aşımına uğradı. Lütfen daha sonra tekrar deneyin.');
                break;
              default:
                setLocationError(`Konum alınamadı: ${error.message}`);
            }
            
            // Konum alınamazsa varsayılan mesafeleri kullan
            setBranchesWithDistance(branches);
          },
          // Daha kısa timeout ve yüksek doğruluk ayarları
          { timeout: 10000, enableHighAccuracy: true, maximumAge: 0 }
        );
      } catch (err) {
        console.error('Konum alma hatası:', err);
        setLocationStatus('error');
        setLocationError('Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        setBranchesWithDistance(branches);
      }
    };
    
    getUserLocation();
  }, []);

  // Filtreleme işlemi
  const filteredBranches = branchesWithDistance.filter(branch => {
    // Marka filtreleme
    if (selectedBrand !== null && branch.brandId !== selectedBrand) {
      return false;
    }
    
    // Özellik filtreleme
    if (selectedAmenities.length > 0 && !selectedAmenities.every(amenity => branch.amenities.includes(amenity))) {
      return false;
    }
    
    // Arama filtreleme
    if (searchQuery && !(
      branch.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false;
    }
    
    return true;
  });
  
  // Sıralama işlemi
  const sortedBranches = [...filteredBranches].sort((a, b) => {
    if (sortBy === 'distance') {
      // Mesafeye göre sıralama (distanceValue varsa onu kullan, yoksa string'den parse et)
      const aDistance = 'distanceValue' in a ? (a as any).distanceValue : parseFloat(a.distance);
      const bDistance = 'distanceValue' in b ? (b as any).distanceValue : parseFloat(b.distance);
      return aDistance - bDistance;
    } else {
      // Puana göre sıralama (azalan)
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
                {/* Konum Bilgisi */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Konum Bilgisi</h2>
                  {userLocation ? (
                    <>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Konumunuz Alındı</p>
                          <p className="text-xs text-gray-500">Enlem: {userLocation.lat.toFixed(4)}, Boylam: {userLocation.lng.toFixed(4)}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Yakınınızda:</span> {filteredBranches.length} kahve dükkanı bulundu
                      </p>
                      <p className="text-sm text-gray-500">
                        En yakını {sortedBranches.length > 0 ? `${sortedBranches[0].brand} - ${sortedBranches[0].name} (${sortedBranches[0].distance})` : ''}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">Konum Bilgisi Bekleniyor</p>
                          <p className="text-xs text-gray-500">Daha doğru sonuçlar için konum izni verin</p>
                        </div>
                      </div>
                      <button 
                        className="btn btn-sm btn-outline w-full mt-2"
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                              (position) => {
                                const { latitude, longitude } = position.coords;
                                setUserLocation({ lat: latitude, lng: longitude });
                              },
                              (error) => {
                                console.error('Konum alınamadı:', error.message);
                                alert('Konum bilgisi alınamadı. Lütfen tarayıcı izinlerini kontrol edin.');
                              }
                            );
                          }
                        }}
                      >
                        Konumu Al
                      </button>
                    </>
                  )}
                </div>

                {/* Filtreler */}
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
              </div>
              
              {/* Harita ve Şube Listesi */}
              <div className="lg:col-span-2">
                {/* Konum Durumu */}
                {locationStatus === 'loading' && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
                    <div className="flex items-center">
                      <div className="inline-block animate-spin mr-3 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <p className="text-blue-700">Konumunuz alınıyor... Bu işlem bir kaç saniye sürebilir.</p>
                    </div>
                  </div>
                )}
                
                {locationStatus === 'error' && locationError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414-1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm text-red-700">
                          {locationError}
                        </p>
                        <div className="mt-2 flex space-x-3">
                          <button 
                            className="inline-flex items-center text-xs font-medium text-red-700 hover:text-red-900"
                            onClick={() => {
                              setLocationStatus('idle');
                              // Konum alma işlemini tekrar başlat
                              if (navigator.geolocation) {
                                setLocationStatus('loading');
                                navigator.geolocation.getCurrentPosition(
                                  (position) => {
                                    const { latitude, longitude } = position.coords;
                                    setUserLocation({ lat: latitude, lng: longitude });
                                    setLocationStatus('success');
                                    
                                    const updatedBranches = branches.map(branch => {
                                      const distance = calculateDistance(
                                        latitude, longitude, branch.lat, branch.lng
                                      );
                                      return {
                                        ...branch,
                                        distance: distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`,
                                        distanceValue: distance
                                      };
                                    });
                                    
                                    setBranchesWithDistance(updatedBranches);
                                  },
                                  (error) => {
                                    console.error('Konum alınamadı (tekrar):', error);
                                    setLocationStatus('error');
                                    setLocationError(`Konum alınamadı: ${error.message}`);
                                  },
                                  { timeout: 10000, enableHighAccuracy: true }
                                );
                              }
                            }}
                          >
                            <svg className="mr-1.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                            </svg>
                            Tekrar Dene
                          </button>
                          <button 
                            className="inline-flex items-center text-xs font-medium text-primary hover:text-primary-dark"
                            onClick={() => setShowManualInput(!showManualInput)}
                          >
                            <svg className="mr-1.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                            {showManualInput ? 'Gizle' : 'Manuel Konum Gir'}
                          </button>
                        </div>
                        
                        {showManualInput && (
                          <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Konum Seç</h4>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                              {popularLocations.map((location) => (
                                <button
                                  key={location.name}
                                  className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md text-sm text-gray-700"
                                  onClick={() => {
                                    setUserLocation({ lat: location.lat, lng: location.lng });
                                    setLocationStatus('success');
                                    
                                    // Kullanıcı konumuna göre şubelerin mesafesini hesapla
                                    const updatedBranches = branches.map(branch => {
                                      const distance = calculateDistance(
                                        location.lat, 
                                        location.lng, 
                                        branch.lat, 
                                        branch.lng
                                      );
                                      
                                      return {
                                        ...branch,
                                        distance: distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`,
                                        distanceValue: distance // Sıralama için sayısal değer
                                      };
                                    });
                                    
                                    setBranchesWithDistance(updatedBranches);
                                  }}
                                >
                                  {location.name}
                                </button>
                              ))}
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <input 
                                type="text" 
                                placeholder="Örn: Levent, Kadıköy, vb."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                value={manualLocation}
                                onChange={(e) => setManualLocation(e.target.value)}
                              />
                              <button 
                                className="px-3 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary-dark"
                                onClick={async () => {
                                  if (!manualLocation.trim()) return;
                                  
                                  setManualLocationStatus('loading');
                                  
                                  try {
                                    // Geocoding API kullanarak konum adresini koordinatlara çevir
                                    // Not: Bu örnekte basitlik için sadece örnek konumlar kullanıyoruz
                                    const foundLocation = popularLocations.find(loc => 
                                      loc.name.toLowerCase().includes(manualLocation.toLowerCase())
                                    );
                                    
                                    if (foundLocation) {
                                      setUserLocation({ lat: foundLocation.lat, lng: foundLocation.lng });
                                      setLocationStatus('success');
                                      setManualLocationStatus('success');
                                      
                                      // Kullanıcı konumuna göre şubelerin mesafesini hesapla
                                      const updatedBranches = branches.map(branch => {
                                        const distance = calculateDistance(
                                          foundLocation.lat, 
                                          foundLocation.lng, 
                                          branch.lat, 
                                          branch.lng
                                        );
                                        
                                        return {
                                          ...branch,
                                          distance: distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`,
                                          distanceValue: distance
                                        };
                                      });
                                      
                                      setBranchesWithDistance(updatedBranches);
                                    } else {
                                      setManualLocationStatus('error');
                                      alert('Girdiğiniz konum bulunamadı. Lütfen önerilen konumlardan birini seçin.');
                                    }
                                  } catch (error) {
                                    console.error('Manuel konum hatası:', error);
                                    setManualLocationStatus('error');
                                  }
                                }}
                              >
                                Ara
                              </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">Not: Şu anda sadece önceden tanımlanmış konumlar desteklenmektedir.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {locationStatus === 'success' && userLocation && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          Konumunuz başarıyla alındı. Size en yakın şubeler listeleniyor.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Harita */}
                <div className="mb-6 bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
                  <DynamicMapView 
                    locations={sortedBranches}
                    center={userLocation ? [userLocation.lng, userLocation.lat] : undefined}
                    onMarkerClick={(location) => {
                      const element = document.getElementById(`branch-${location.id}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        element.classList.add('highlight');
                        setTimeout(() => {
                          element.classList.remove('highlight');
                        }, 2000);
                      }
                    }}
                  />
                </div>
                
                {/* Şube Listesi */}
                {sortedBranches.length > 0 ? (
                  <div className="space-y-4">
                    {sortedBranches.map(branch => (
                      <div key={branch.id} id={`branch-${branch.id}`} className="card card-hover p-6 transition-all duration-300">
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
