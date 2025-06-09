/**
 * Haversine formülü kullanarak iki konum arasındaki mesafeyi hesaplar
 * @param lat1 Birinci konumun enlem değeri
 * @param lon1 Birinci konumun boylam değeri
 * @param lat2 İkinci konumun enlem değeri
 * @param lon2 İkinci konumun boylam değeri
 * @returns Metre cinsinden mesafe
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Dünya yarıçapı (metre)
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ radyan cinsinden
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // metre cinsinden
  return distance;
};

/**
 * Mesafeyi kullanıcı dostu bir formatta gösterir
 * @param distance Metre cinsinden mesafe
 * @returns Formatlanmış mesafe (1000m altı için metre, üstü için km)
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)} m`;
  } else {
    return `${(distance / 1000).toFixed(1)} km`;
  }
};
