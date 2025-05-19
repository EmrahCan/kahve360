import apiClient from './api';

// Kampanya tipi
export interface Campaign {
  id: number;
  brand: string;
  brandId: number;
  title: string;
  description: string;
  expiryDate: string;
  image: string;
  category: string;
  terms?: string;
  isActive: boolean;
}

// Kampanya servisi
const campaignService = {
  // Tüm kampanyaları getir
  getCampaigns: async (filters?: { brandId?: number, category?: string, search?: string }): Promise<Campaign[]> => {
    try {
      const response = await apiClient.get<Campaign[]>('/campaigns', {
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      throw error;
    }
  },
  
  // Belirli bir kampanyayı getir
  getCampaignById: async (campaignId: number): Promise<Campaign> => {
    try {
      const response = await apiClient.get<Campaign>(`/campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching campaign ${campaignId}:`, error);
      throw error;
    }
  },
  
  // Belirli bir markaya ait kampanyaları getir
  getCampaignsByBrand: async (brandId: number): Promise<Campaign[]> => {
    try {
      const response = await apiClient.get<Campaign[]>(`/brands/${brandId}/campaigns`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching campaigns for brand ${brandId}:`, error);
      throw error;
    }
  },
  
  // Kampanya kategorilerini getir
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<string[]>('/campaigns/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching campaign categories:', error);
      throw error;
    }
  },
  
  // Kampanyaya katıl
  joinCampaign: async (campaignId: number): Promise<{ success: boolean, message: string }> => {
    try {
      const response = await apiClient.post<{ success: boolean, message: string }>(`/campaigns/${campaignId}/join`);
      return response.data;
    } catch (error) {
      console.error(`Error joining campaign ${campaignId}:`, error);
      throw error;
    }
  }
};

export default campaignService;
