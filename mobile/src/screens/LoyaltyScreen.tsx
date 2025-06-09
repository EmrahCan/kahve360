import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const LoyaltyScreen = () => {
  const loyaltyCards = [
    { 
      id: 1, 
      brand: 'Starbucks', 
      points: 120, 
      totalNeeded: 300, 
      color: '#006241',
      nextReward: 'Ücretsiz içecek',
      expiryDate: '31 Aralık 2025'
    },
    { 
      id: 2, 
      brand: 'Gloria Jeans', 
      points: 85, 
      totalNeeded: 150, 
      color: '#0066b2',
      nextReward: 'Ücretsiz tatlı',
      expiryDate: '15 Ekim 2025'
    },
    { 
      id: 3, 
      brand: 'Caribou Coffee', 
      points: 45, 
      totalNeeded: 100, 
      color: '#7A5C58',
      nextReward: 'Ücretsiz içecek',
      expiryDate: '1 Kasım 2025'
    }
  ];

  const renderProgressBar = (points: number, totalNeeded: number, color: string) => {
    const percentage = (points / totalNeeded) * 100;
    return (
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sadakat Kartlarım</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {loyaltyCards.map(card => (
          <TouchableOpacity key={card.id} style={styles.card}>
            <View style={[styles.cardHeader, { backgroundColor: card.color }]}>
              <Text style={styles.cardBrand}>{card.brand}</Text>
              <Icon name="card-outline" size={24} color="#fff" />
            </View>
            
            <View style={styles.cardBody}>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsLabel}>Puanlarınız</Text>
                <Text style={styles.pointsValue}>{card.points} / {card.totalNeeded}</Text>
              </View>
              
              {renderProgressBar(card.points, card.totalNeeded, card.color)}
              
              <View style={styles.rewardContainer}>
                <View style={styles.rewardItem}>
                  <Icon name="gift-outline" size={18} color="#8B4513" />
                  <Text style={styles.rewardText}>Sonraki ödül: {card.nextReward}</Text>
                </View>
                
                <View style={styles.rewardItem}>
                  <Icon name="calendar-outline" size={18} color="#8B4513" />
                  <Text style={styles.rewardText}>Son kullanma: {card.expiryDate}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.scanButton}>
                <Icon name="qr-code-outline" size={18} color="#fff" />
                <Text style={styles.scanButtonText}>QR Kodu Göster</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.addCardButton}>
          <Icon name="add-circle-outline" size={24} color="#8B4513" />
          <Text style={styles.addCardText}>Yeni Sadakat Kartı Ekle</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          CafeConnect sadakat programı ile kahve alışverişlerinizden puan kazanın ve ücretsiz ürünlerin tadını çıkarın!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    backgroundColor: '#8B4513',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrand: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 15,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#555',
  },
  pointsValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  rewardContainer: {
    marginBottom: 10,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rewardText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  cardFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B4513',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  scanButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: 10,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  addCardText: {
    color: '#8B4513',
    marginLeft: 8,
    fontWeight: '500',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default LoyaltyScreen;
