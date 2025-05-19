import { useState } from 'react';
import QRCode from 'react-qr-code';

interface QRCodeCardProps {
  cardId: number;
  brand: string;
  userId: string;
}

const QRCodeCard = ({ cardId, brand, userId }: QRCodeCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // QR kodun içeriği (gerçek uygulamada bu daha karmaşık bir veri yapısı olabilir)
  const qrValue = JSON.stringify({
    app: 'Kahve360',
    cardId,
    brand,
    userId,
    timestamp: new Date().toISOString()
  });
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${isExpanded ? 'scale-110' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <QRCode
          value={qrValue}
          size={isExpanded ? 200 : 160}
          level="H"
          fgColor="#6A3B2B"
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-1">
          {isExpanded ? 'Küçültmek için tıklayın' : 'Büyütmek için tıklayın'}
        </p>
        <p className="text-xs text-gray-500">
          Son güncelleme: {new Date().toLocaleString('tr-TR')}
        </p>
      </div>
    </div>
  );
};

export default QRCodeCard;
