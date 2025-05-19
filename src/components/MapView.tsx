import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Not: Gerçek uygulamada bu API anahtarı çevresel değişkenlerden alınmalıdır
// Bu sadece demo amaçlıdır
mapboxgl.accessToken = 'pk.eyJ1Ijoia2FodmUzNjAiLCJhIjoiY2xzYW1wbGVrZXkiOiJzYW1wbGVtYXBib3hhcGlrZXkifQ.samplekey';

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
  center = [29.0111, 41.0811], // İstanbul varsayılan merkez
  zoom = 13,
  onMarkerClick 
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Haritayı başlat
  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center,
      zoom: zoom
    });

    // Navigasyon kontrollerini ekle
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Kullanıcı konumu kontrolü
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    // Temizleme işlemi
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Konumları haritaya ekle
  useEffect(() => {
    if (!map.current) return;

    // Önceki işaretçileri temizle
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Yeni işaretçileri ekle
    locations.forEach(location => {
      // Özel işaretçi elementi oluştur
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = location.isOpen ? '#D4A574' : '#ccc';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontWeight = 'bold';
      el.style.color = 'white';
      el.style.fontSize = '12px';
      el.innerText = location.brand.charAt(0);

      // Popup oluştur
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 4px;">${location.brand} - ${location.name}</h3>
          <p style="font-size: 12px; margin-bottom: 4px;">${location.address}</p>
          <p style="font-size: 12px; color: ${location.isOpen ? 'green' : 'red'};">
            ${location.isOpen ? 'Açık' : 'Kapalı'}
          </p>
        </div>
      `);

      // İşaretçi oluştur ve haritaya ekle
      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current!);

      // Tıklama olayını ekle
      el.addEventListener('click', () => {
        if (onMarkerClick) {
          onMarkerClick(location);
        }
      });

      // İşaretçiyi referansa ekle
      markers.current.push(marker);
    });

    // Haritayı işaretçileri içerecek şekilde ayarla (eğer işaretçi varsa)
    if (locations.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      
      locations.forEach(location => {
        bounds.extend([location.lng, location.lat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [locations, onMarkerClick]);

  return (
    <div ref={mapContainer} className="h-full w-full rounded-lg" />
  );
};

export default MapView;
