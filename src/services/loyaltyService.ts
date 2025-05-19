import apiClient from './api';

// Sadakat kartı tipi
export interface LoyaltyCard {
  id: number;
  brand: string;
  brandId: number;
  logo: string;
  color: string;
  points: number;
  totalPoints: number;
  nextReward: string;
  pointsToNextReward: number;
  recentTransactions: LoyaltyTransaction[];
}

// İşlem tipi
export interface LoyaltyTransaction {
  id: number;
  date: string;
  amount: string;
  points: string;
  location: string;
}

// Sadakat servisi
const loyaltyService = {
  // Kullanıcının tüm sadakat kartlarını getir
  getLoyaltyCards: async (): Promise<LoyaltyCard[]> => {
    try {
      const response = await apiClient.get<LoyaltyCard[]>('/loyalty/cards');
      return response.data;
    } catch (error) {
      console.error('Error fetching loyalty cards:', error);
      throw error;
    }
  },
  
  // Belirli bir markaya ait sadakat kartını getir
  getLoyaltyCardByBrand: async (brandId: number): Promise<LoyaltyCard> => {
    try {
      const response = await apiClient.get<LoyaltyCard>(`/loyalty/cards/${brandId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching loyalty card for brand ${brandId}:`, error);
      throw error;
    }
  },
  
  // Sadakat kartı işlemlerini getir
  getTransactions: async (cardId: number, limit: number = 10): Promise<LoyaltyTransaction[]> => {
    try {
      const response = await apiClient.get<LoyaltyTransaction[]>(`/loyalty/cards/${cardId}/transactions`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching transactions for card ${cardId}:`, error);
      throw error;
    }
  },
  
  // QR kod verisi oluştur
  generateQRCode: async (cardId: number): Promise<string> => {
    try {
      const response = await apiClient.get<{ qrData: string }>(`/loyalty/cards/${cardId}/qr-code`);
      return response.data.qrData;
    } catch (error) {
      console.error(`Error generating QR code for card ${cardId}:`, error);
      throw error;
    }
  },
  
  // Yeni sadakat kartı ekle
  addLoyaltyCard: async (brandId: number): Promise<LoyaltyCard> => {
    try {
      const response = await apiClient.post<LoyaltyCard>('/loyalty/cards', { brandId });
      return response.data;
    } catch (error) {
      console.error(`Error adding loyalty card for brand ${brandId}:`, error);
      throw error;
    }
  },
  
  // Toplam sadakat puanlarını getir
  getTotalPoints: async (): Promise<number> => {
    try {
      const response = await apiClient.get<{ totalPoints: number }>('/loyalty/total-points');
      return response.data.totalPoints;
    } catch (error) {
      console.error('Error fetching total loyalty points:', error);
      throw error;
    }
  },
  
  // Kullanılabilir ödülleri getir
  getAvailableRewards: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get<any[]>('/loyalty/rewards');
      return response.data;
    } catch (error) {
      console.error('Error fetching available rewards:', error);
      throw error;
    }
  }
};

export default loyaltyService;
