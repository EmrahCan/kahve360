import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox API anahtarı - CafeConnect hesabının token'ı
const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2FmZWNvbm5lY3QiLCJhIjoiY21heWJ2aDBiMDh2eDJrcXptZTRmYzUyYiJ9.Tt36Frt7ppNSHUeRJ9bqcw';

interface MapLocation {
  id: number;
  brand: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  isOpen: boolean;
}

interface MapViewProps {
  locations: MapLocation[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (location: MapLocation) => void;
}

const MapView = ({ 
  locations, 
  center = [29.0111, 41.0811], // İstanbul varsayılan merkez (longitude, latitude)
  zoom = 13,
  onMarkerClick 
}: MapViewProps) => {
  const [popupInfo, setPopupInfo] = useState<MapLocation | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Konsola API anahtarını yazdır (hata ayıklama için)
  console.log('Mapbox API Key:', MAPBOX_TOKEN);
  
  return (
    <div className="h-full w-full rounded-lg">
      {mapError ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-100 rounded-lg">
          <div className="text-center p-4">
            <p className="text-red-500 font-medium mb-2">Harita yüklenirken bir hata oluştu:</p>
            <p className="text-gray-700">{mapError}</p>
          </div>
        </div>
      ) : (
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{
            longitude: center[0],
            latitude: center[1],
            zoom: zoom
          }}
          style={{ width: '100%', height: '100%', borderRadius: '0.5rem' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          onLoad={() => {
            console.log('Harita başarıyla yüklendi');
            setMapLoaded(true);
          }}
          onError={(e: any) => {
            console.error('Harita yükleme hatası:', e);
            setMapError(e.error?.message || 'Harita yüklenemedi. Lütfen daha sonra tekrar deneyin.');
          }}
        >
        {/* Navigasyon kontrolleri */}
        <NavigationControl position="top-right" />
        <GeolocateControl 
          position="top-right" 
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
        
        {/* Konum işaretçileri */}
        {locations.map(location => (
          <Marker 
            key={location.id}
            longitude={location.lng}
            latitude={location.lat}
            anchor="center"
            onClick={e => {
              // Tıklama olayını durdur
              e.originalEvent.stopPropagation();
              setPopupInfo(location);
              if (onMarkerClick) {
                onMarkerClick(location);
              }
            }}
          >
            <div 
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: location.isOpen ? '#D4A574' : '#ccc',
                border: '3px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '12px'
              }}
            >
              {location.brand.charAt(0)}
            </div>
          </Marker>
        ))}
        
        {/* Popup bilgisi */}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
            closeOnClick={false}
            offset={25}
          >
            <div style={{ padding: '8px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {popupInfo.brand} - {popupInfo.name}
              </h3>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>
                {popupInfo.address}
              </p>
              <p style={{ 
                fontSize: '12px', 
                color: popupInfo.isOpen ? 'green' : 'red'
              }}>
                {popupInfo.isOpen ? 'Açık' : 'Kapalı'}
              </p>
            </div>
          </Popup>
        )}
      </Map>
      )}
    </div>
  );
};

export default MapView;
