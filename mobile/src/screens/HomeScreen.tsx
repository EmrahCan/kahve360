import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const brands = [
    { id: 1, name: 'Starbucks', logo: require('../assets/placeholder-logo.png') },
    { id: 2, name: 'Gloria Jeans', logo: require('../assets/placeholder-logo.png') },
    { id: 3, name: 'Caribou Coffee', logo: require('../assets/placeholder-logo.png') },
    { id: 4, name: 'Coffee Lab', logo: require('../assets/placeholder-logo.png') },
    { id: 5, name: 'Espresso Lab', logo: require('../assets/placeholder-logo.png') },
    { id: 6, name: 'Tchibo', logo: require('../assets/placeholder-logo.png') },
  ];

  const campaigns = [
    { id: 1, title: 'Yaz Kampanyası', description: 'İkinci içecek %50 indirimli', brand: 'Starbucks' },
    { id: 2, title: 'Hafta Sonu Fırsatı', description: 'Tatlılarda %30 indirim', brand: 'Gloria Jeans' },
    { id: 3, title: 'Sadakat Programı', description: '10 kahve al 1 kahve bedava', brand: 'Caribou Coffee' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>CafeConnect</Text>
          <Text style={styles.subtitle}>Kahve dünyasına hoş geldiniz!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popüler Markalar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.brandsScroll}>
            {brands.map(brand => (
              <TouchableOpacity key={brand.id} style={styles.brandItem}>
                <View style={styles.brandLogoContainer}>
                  {/* Logo yerine geçici olarak marka adı gösteriliyor */}
                  <View style={styles.brandLogo}>
                    <Text style={styles.brandLogoText}>{brand.name.charAt(0)}</Text>
                  </View>
                </View>
                <Text style={styles.brandName}>{brand.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güncel Kampanyalar</Text>
          {campaigns.map(campaign => (
            <TouchableOpacity key={campaign.id} style={styles.campaignItem}>
              <View style={styles.campaignContent}>
                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <Text style={styles.campaignDescription}>{campaign.description}</Text>
                <Text style={styles.campaignBrand}>{campaign.brand}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yakınındaki Kafeler</Text>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapButtonText}>Haritada Gör</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#8B4513',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  brandsScroll: {
    flexDirection: 'row',
  },
  brandItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  brandLogoContainer: {
    marginBottom: 8,
  },
  brandLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  brandName: {
    textAlign: 'center',
  },
  campaignItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  campaignContent: {
    padding: 15,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  campaignDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  campaignBrand: {
    fontSize: 12,
    color: '#8B4513',
    marginTop: 5,
    fontWeight: 'bold',
  },
  mapButton: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
