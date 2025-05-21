import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TempLogos = () => {
  const logos = [
    { id: 1, name: 'Starbucks', color: '#006241' },
    { id: 2, name: 'Gloria Jeans', color: '#8B4513' },
    { id: 3, name: 'Caribou Coffee', color: '#7A5C61' },
    { id: 4, name: 'Coffee Lab', color: '#5E3023' },
    { id: 5, name: 'Tchibo', color: '#00205B' },
    { id: 6, name: 'Espresso Lab', color: '#4B2E39' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container py-10">
        <h1 className="text-3xl font-bold text-primary mb-8">Geçici Logo Oluşturucu</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
          {logos.map((logo) => (
            <div key={logo.id} className="card p-6 flex flex-col items-center text-center">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mb-4 overflow-hidden border border-gray-200 shadow-sm"
                style={{ backgroundColor: logo.color }}
              >
                <span className="text-white font-bold text-3xl">{logo.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-gray-800">{logo.name}</h3>
              <p className="text-sm text-gray-500 mt-2">Renk: {logo.color}</p>
              <p className="mt-4">
                <button 
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                  onClick={() => {
                    // Canvas oluştur
                    const canvas = document.createElement('canvas');
                    canvas.width = 200;
                    canvas.height = 200;
                    const ctx = canvas.getContext('2d');
                    
                    if (ctx) {
                      // Arka planı doldur
                      ctx.fillStyle = logo.color;
                      ctx.beginPath();
                      ctx.arc(100, 100, 100, 0, Math.PI * 2);
                      ctx.fill();
                      
                      // Harfi ekle
                      ctx.fillStyle = 'white';
                      ctx.font = 'bold 120px Arial';
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'middle';
                      ctx.fillText(logo.name.charAt(0), 100, 100);
                      
                      // PNG olarak indir
                      const link = document.createElement('a');
                      link.download = `${logo.name.toLowerCase().replace(' ', '')}.png`;
                      link.href = canvas.toDataURL('image/png');
                      link.click();
                    }
                  }}
                >
                  PNG Olarak İndir
                </button>
              </p>
            </div>
          ))}
        </div>
        
        <div className="bg-accent p-6 rounded-lg">
          <h2 className="text-xl font-bold text-primary mb-4">Logo Oluşturma Yardımcısı</h2>
          <p className="mb-4">
            Bu sayfa, eksik logolar için geçici logo oluşturmanıza yardımcı olur.
            Her marka için renkli bir daire içinde markanın baş harfini içeren basit bir logo oluşturabilirsiniz.
          </p>
          <div className="space-y-2">
            <p><strong>Kullanım:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>İndirmek istediğiniz logo için "PNG Olarak İndir" düğmesine tıklayın</li>
              <li>İndirilen dosyayı public klasörüne taşıyın</li>
              <li>Dosya adının doğru olduğundan emin olun (örn. starbucks.png)</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TempLogos;
