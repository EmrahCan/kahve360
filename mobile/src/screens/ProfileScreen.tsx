import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Örnek kullanıcı bilgileri
  const user = {
    name: 'Emrah Can',
    email: 'emrah@example.com',
    memberSince: '2024',
    totalPoints: 250,
    favoriteShops: ['Starbucks', 'Gloria Jeans', 'Caribou Coffee']
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
            </View>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.memberSince}>Üyelik: {user.memberSince}</Text>
          
          <View style={styles.pointsContainer}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.pointsText}>{user.totalPoints} Toplam Puan</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="person-outline" size={22} color="#8B4513" />
            <Text style={styles.menuItemText}>Kişisel Bilgiler</Text>
            <Icon name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="card-outline" size={22} color="#8B4513" />
            <Text style={styles.menuItemText}>Ödeme Yöntemleri</Text>
            <Icon name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="location-outline" size={22} color="#8B4513" />
            <Text style={styles.menuItemText}>Adreslerim</Text>
            <Icon name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favori Kafelerim</Text>
          
          {user.favoriteShops.map((shop, index) => (
            <View key={index} style={styles.favoriteItem}>
              <View style={[styles.favoriteBrand, { backgroundColor: getBrandColor(shop) }]}>
                <Text style={styles.favoriteBrandText}>{shop.charAt(0)}</Text>
              </View>
              <Text style={styles.favoriteShopName}>{shop}</Text>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addFavoriteButton}>
            <Icon name="add" size={18} color="#8B4513" />
            <Text style={styles.addFavoriteText}>Favori Ekle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="notifications-outline" size={22} color="#8B4513" />
              <Text style={styles.settingText}>Bildirimler</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#d3d3d3', true: '#8B4513' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="location-outline" size={22} color="#8B4513" />
              <Text style={styles.settingText}>Konum Hizmetleri</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: '#d3d3d3', true: '#8B4513' }}
              thumbColor={locationEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="moon-outline" size={22} color="#8B4513" />
              <Text style={styles.settingText}>Karanlık Mod</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#d3d3d3', true: '#8B4513' }}
              thumbColor={darkModeEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Uygulama</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="help-circle-outline" size={22} color="#8B4513" />
            <Text style={styles.menuItemText}>Yardım ve Destek</Text>
            <Icon name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="document-text-outline" size={22} color="#8B4513" />
            <Text style={styles.menuItemText}>Kullanım Şartları</Text>
            <Icon name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="shield-outline" size={22} color="#8B4513" />
            <Text style={styles.menuItemText}>Gizlilik Politikası</Text>
            <Icon name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="information-circle-outline" size={22} color="#8B4513" />
            <Text style={styles.menuItemText}>Uygulama Hakkında</Text>
            <Icon name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Marka rengini belirle
const getBrandColor = (brand: string) => {
  switch (brand) {
    case 'Starbucks': return '#006241';
    case 'Gloria Jeans': return '#0066b2';
    case 'Caribou Coffee': return '#7A5C58';
    case 'Coffee Lab': return '#4C3A32';
    case 'Espresso Lab': return '#D4B774';
    default: return '#8B4513';
  }
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
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  memberSince: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF9E6',
    borderRadius: 20,
  },
  pointsText: {
    marginLeft: 8,
    color: '#8B4513',
    fontWeight: '500',
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  favoriteBrand: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  favoriteBrandText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteShopName: {
    fontSize: 16,
  },
  addFavoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 5,
  },
  addFavoriteText: {
    color: '#8B4513',
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 15,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B4513',
    marginHorizontal: 15,
    marginVertical: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;
