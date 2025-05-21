import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LogoTest = () => {
  const [logoStatuses, setLogoStatuses] = useState<{[key: number]: boolean}>({});
  
  // Logo bilgileri ve renkleri
  const logos = [
    { id: 1, name: 'Starbucks', path: '/starbucks.png', color: '#006241' },
    { id: 2, name: 'Gloria Jeans', path: '/gloriajeans.png', color: '#8B4513' },
    { id: 3, name: 'Caribou Coffee', path: '/caribou.png', color: '#7A5C61' },
    { id: 4, name: 'Kahve Dünyası', path: '/kahvedunyasi.png', color: '#8D2C1F' },
    { id: 5, name: 'Tchibo', path: '/tchibo.png', color: '#00205B' },
    { id: 6, name: 'Espresso Lab', path: '/espressolab.png', color: '#4B2E39' },
  ];
  
  useEffect(() => {
    // Başlangıçta tüm logoların durumunu kontrol et
    const checkImages = async () => {
      // Sadece client-side'da çalıştığından emin ol
      if (typeof window === 'undefined') return;
      
      const statuses: {[key: number]: boolean} = {};
      
      for (const logo of logos) {
        try {
          // Logo yükleme testi
          const img = new Image();
          img.src = logo.path;
          await new Promise((resolve, reject) => {
            img.onload = () => resolve(true);
            img.onerror = () => reject(false);
          });
          statuses[logo.id] = true;
        } catch (e) {
          statuses[logo.id] = false;
        }
      }
      
      setLogoStatuses(statuses);
    };
    
    checkImages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container py-10">
        <h1 className="text-3xl font-bold text-primary mb-8">Logo Test Sayfası</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {logos.map((logo) => (
            <div key={logo.id} className="card p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden border border-gray-200 shadow-sm relative">
                {/* Logo görüntüleme - Renkli arka plan üzerinde harf */}
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: logo.color }}
                >
                  <span className="font-bold text-3xl text-white">{logo.name.charAt(0)}</span>
                </div>
                
                {/* Gerçek logo yükleme denemesi - görünmez */}
                <img 
                  src={logo.path}
                  alt={`${logo.name} logosu`}
                  className="hidden"
                  loading="eager"
                  onLoad={(e) => {
                    // Logo başarıyla yüklenirse göster
                    console.log(`${logo.name} logosu başarıyla yüklendi`);
                    const parent = e.currentTarget.parentElement;
                    if (parent && parent.firstChild) {
                      // Renkli arka planı kaldır
                      parent.firstChild.remove();
                      // Logoyu görünür yap
                      (e.target as HTMLImageElement).className = "w-20 h-20 object-contain p-2";
                    }
                    // Durum güncelleme
                    setLogoStatuses(prev => ({ ...prev, [logo.id]: true }));
                  }}
                  onError={(e) => {
                    // Logo yüklenemedi, zaten fallback görüntüleniyor
                    console.log(`${logo.name} logosu yüklenemedi`);
                    setLogoStatuses(prev => ({ ...prev, [logo.id]: false }));
                  }}
                />
              </div>
              <h3 className="font-bold text-gray-800">{logo.name}</h3>
              <p className="text-sm text-gray-500 mt-2">Dosya: {logo.path}</p>
              <p className="text-xs mt-1">
                {logoStatuses[logo.id] === undefined ? (
                  "Kontrol ediliyor..."
                ) : logoStatuses[logo.id] ? (
                  <span className="text-green-500">✓ Yüklendi</span>
                ) : (
                  <span className="text-red-500">✗ Yüklenemedi</span>
                )}
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-accent p-6 rounded-lg">
          <h2 className="text-xl font-bold text-primary mb-4">Logo Hata Ayıklama</h2>
          <p className="mb-4">
            Bu sayfa, tüm logoların doğru şekilde görüntülenip görüntülenmediğini test etmek için oluşturulmuştur.
            Eğer bir logo görüntülenemiyorsa, ilgili markanın baş harfi gösterilecektir.
          </p>
          <div className="space-y-2">
            <p><strong>Öneriler:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Logo dosyalarının doğru isimde olduğundan emin olun</li>
              <li>Logo dosyalarının geçerli resim formatında olduğunu kontrol edin</li>
              <li>Logo dosyalarının boyutunun uygun olduğunu kontrol edin</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LogoTest;
