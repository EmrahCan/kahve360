export interface Location {
  lat: number;
  lng: number;
}

export interface Branch {
  id: string;
  brand: string;
  name: string;
  address: string;
  location: Location;
  amenities?: string[];
  photos?: string[];
  distance?: number; // Kullanıcı konumundan mesafe (metre)
}
