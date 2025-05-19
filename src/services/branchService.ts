import apiClient from './api';

// Şube tipi
export interface Branch {
  id: number;
  brand: string;
  brandId: number;
  name: string;
  address: string;
  distance?: string;
  isOpen: boolean;
  openHours: string;
  lat: number;
  lng: number;
  rating: number;
  crowdLevel: 'Az' | 'Orta' | 'Yoğun';
  amenities: string[];
  phoneNumber?: string;
  website?: string;
}

// Konum tipi
export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

// Şube servisi
const branchService = {
  // Tüm şubeleri getir
  getBranches: async (filters?: { brandId?: number, amenities?: string[], search?: string }): Promise<Branch[]> => {
    try {
      const response = await apiClient.get<Branch[]>('/branches', {
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching branches:', error);
      throw error;
    }
  },
  
  // Belirli bir şubeyi getir
  getBranchById: async (branchId: number): Promise<Branch> => {
    try {
      const response = await apiClient.get<Branch>(`/branches/${branchId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching branch ${branchId}:`, error);
      throw error;
    }
  },
  
  // Belirli bir markaya ait şubeleri getir
  getBranchesByBrand: async (brandId: number): Promise<Branch[]> => {
    try {
      const response = await apiClient.get<Branch[]>(`/brands/${brandId}/branches`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching branches for brand ${brandId}:`, error);
      throw error;
    }
  },
  
  // Yakındaki şubeleri getir
  getNearbyBranches: async (location: Location, radius: number = 5): Promise<Branch[]> => {
    try {
      const response = await apiClient.get<Branch[]>('/branches/nearby', {
        params: {
          lat: location.lat,
          lng: location.lng,
          radius // km cinsinden
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching nearby branches:', error);
      throw error;
    }
  },
  
  // Kullanıcının konumunu al (tarayıcı Geolocation API'sini kullanır)
  getUserLocation: (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  
  // Adres araması yap (Geocoding)
  searchAddress: async (query: string): Promise<Location[]> => {
    try {
      const response = await apiClient.get<Location[]>('/geocode', {
        params: { query }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching address "${query}":`, error);
      throw error;
    }
  },
  
  // Şube özelliklerini getir
  getAmenities: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<string[]>('/branches/amenities');
      return response.data;
    } catch (error) {
      console.error('Error fetching branch amenities:', error);
      throw error;
    }
  }
};

export default branchService;
