import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LogoTest = () => {
  const logos = [
    { id: 1, name: 'Starbucks', path: '/starbucks.png' },
    { id: 2, name: 'Gloria Jeans', path: '/gloriajeans.png' },
    { id: 3, name: 'Caribou Coffee', path: '/caribou.png', altPath: '/cariboucoffee.png' },
    { id: 4, name: 'Coffee Lab', path: '/coffeelab.png' },
    { id: 5, name: 'Tchibo', path: '/tchibo.png' },
    { id: 6, name: 'Espresso Lab', path: '/espressolab.png' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container py-10">
        <h1 className="text-3xl font-bold text-primary mb-8">Logo Test Sayfası</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {logos.map((logo) => (
            <div key={logo.id} className="card p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 overflow-hidden border border-gray-200 shadow-sm">
                <img 
                  src={logo.path}
                  alt={`${logo.name} logosu`}
                  className="w-20 h-20 object-contain p-2"
                  loading="eager"
                  onError={(e) => {
                    // Alternatif yol varsa onu dene
                    if ('altPath' in logo && logo.altPath) {
                      (e.target as HTMLImageElement).src = logo.altPath as string;
                    } else {
                      // Logo yüklenemezse ilk harfi göster
                      (e.target as HTMLImageElement).style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<div class="font-bold text-3xl text-primary">${logo.name.charAt(0)}</div>`;
                    }
                  }}
                />
              </div>
              <h3 className="font-bold text-gray-800">{logo.name}</h3>
              <p className="text-sm text-gray-500 mt-2">Dosya: {logo.path}</p>
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
