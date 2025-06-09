import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/Ionicons';
import { Branch } from '../models/Branch';
import { calculateDistance, formatDistance } from '../utils/locationUtils';

// Örnek şube verileri (gerçek uygulamada API'den gelecek)
const mockBranches: Branch[] = [
  {
    id: '1',
    brand: 'Starbucks',
    name: 'Starbucks Kadıköy',
    address: 'Caferağa Mah. Moda Cad. No:120, Kadıköy',
    location: { lat: 40.9901, lng: 29.0302 },
    amenities: ['wifi', 'outdoor-seating', 'power-outlets']
  },
  {
    id: '2',
    brand: 'Gloria Jeans',
    name: 'Gloria Jeans Bağdat Caddesi',
    address: 'Bağdat Cad. No:312, Kadıköy',
    location: { lat: 40.9703, lng: 29.0750 },
    amenities: ['wifi', 'parking']
  },
  {
    id: '3',
    brand: 'Caribou Coffee',
    name: 'Caribou Coffee Caddebostan',
    address: 'Caddebostan Mah. Bağdat Cad. No:385, Kadıköy',
    location: { lat: 40.9650, lng: 29.0600 },
    amenities: ['wifi', 'outdoor-seating', 'power-outlets', 'parking']
  },
  {
    id: '4',
    brand: 'Coffee Lab',
    name: 'Coffee Lab Moda',
    address: 'Moda Cad. No:65, Kadıköy',
    location: { lat: 40.9850, lng: 29.0280 },
    amenities: ['wifi', 'outdoor-seating']
  },
  {
    id: '5',
    brand: 'Espresso Lab',
    name: 'Espresso Lab Kalamış',
    address: 'Kalamış Mah. Fener Kalamış Cad. No:42, Kadıköy',
    location: { lat: 40.9730, lng: 29.0380 },
    amenities: ['wifi', 'power-outlets']
  }
];

const MapScreen = () => {
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>(mockBranches);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Kullanıcı konumunu al
  useEffect(() => {
    const getUserLocation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });
            setSortByDistance(true);
            setIsLoading(false);
          },
          (error) => {
            console.error(error);
            setError('Konum bilgisi alınamadı. Lütfen konum izinlerini kontrol edin.');
            setIsLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } catch (err) {
        console.error(err);
        setError('Konum servisi kullanılamıyor.');
        setIsLoading(false);
      }
    };

    getUserLocation();
  }, []);

  // Filtreleme ve sıralama
  useEffect(() => {
    let result = [...branches];
    
    // Marka filtreleme
    if (selectedBrand) {
      result = result.filter(branch => branch.brand === selectedBrand);
    }
    
    // Özellik filtreleme
    if (selectedAmenities.length > 0) {
      result = result.filter(branch => 
        selectedAmenities.every(amenity => 
          branch.amenities?.includes(amenity)
        )
      );
    }
    
    // Mesafeye göre sıralama
    if (sortByDistance && userLocation) {
      result = result.map(branch => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          branch.location.lat,
          branch.location.lng
        );
        return { ...branch, distance };
      }).sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }
    
    setFilteredBranches(result);
  }, [branches, selectedBrand, selectedAmenities, sortByDistance, userLocation]);

  // Marka filtresini değiştir
  const toggleBrandFilter = (brand: string) => {
    setSelectedBrand(selectedBrand === brand ? null : brand);
  };

  // Özellik filtresini değiştir
  const toggleAmenityFilter = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  // Tüm filtreleri temizle
  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedAmenities([]);
    setSortByDistance(false);
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

  // Benzersiz markaları al
  const uniqueBrands = Array.from(new Set(branches.map(branch => branch.brand)));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Kahve Dükkanları</Text>
        {isLoading && <ActivityIndicator size="small" color="#fff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {uniqueBrands.map(brand => (
            <TouchableOpacity
              key={brand}
              style={[
                styles.filterButton,
                selectedBrand === brand && { backgroundColor: getBrandColor(brand) }
              ]}
              onPress={() => toggleBrandFilter(brand)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedBrand === brand && styles.activeFilterButtonText
              ]}>
                {brand}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.amenitiesContainer}>
        <TouchableOpacity
          style={[
            styles.amenityButton,
            selectedAmenities.includes('wifi') && styles.activeAmenityButton
          ]}
          onPress={() => toggleAmenityFilter('wifi')}
        >
          <Icon name="wifi" size={18} color={selectedAmenities.includes('wifi') ? '#fff' : '#8B4513'} />
          <Text style={[
            styles.amenityButtonText,
            selectedAmenities.includes('wifi') && styles.activeAmenityButtonText
          ]}>WiFi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.amenityButton,
            selectedAmenities.includes('outdoor-seating') && styles.activeAmenityButton
          ]}
          onPress={() => toggleAmenityFilter('outdoor-seating')}
        >
          <Icon name="sunny" size={18} color={selectedAmenities.includes('outdoor-seating') ? '#fff' : '#8B4513'} />
          <Text style={[
            styles.amenityButtonText,
            selectedAmenities.includes('outdoor-seating') && styles.activeAmenityButtonText
          ]}>Dış Mekan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.amenityButton,
            selectedAmenities.includes('power-outlets') && styles.activeAmenityButton
          ]}
          onPress={() => toggleAmenityFilter('power-outlets')}
        >
          <Icon name="flash" size={18} color={selectedAmenities.includes('power-outlets') ? '#fff' : '#8B4513'} />
          <Text style={[
            styles.amenityButtonText,
            selectedAmenities.includes('power-outlets') && styles.activeAmenityButtonText
          ]}>Priz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.amenityButton,
            selectedAmenities.includes('parking') && styles.activeAmenityButton
          ]}
          onPress={() => toggleAmenityFilter('parking')}
        >
          <Icon name="car" size={18} color={selectedAmenities.includes('parking') ? '#fff' : '#8B4513'} />
          <Text style={[
            styles.amenityButtonText,
            selectedAmenities.includes('parking') && styles.activeAmenityButtonText
          ]}>Otopark</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortByDistance && styles.activeSortButton
          ]}
          onPress={() => setSortByDistance(!sortByDistance)}
          disabled={!userLocation}
        >
          <Icon name="location" size={18} color={sortByDistance ? '#fff' : '#8B4513'} />
          <Text style={[
            styles.sortButtonText,
            sortByDistance && styles.activeSortButtonText
          ]}>
            Mesafeye Göre Sırala
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearFilters}
        >
          <Text style={styles.clearButtonText}>Filtreleri Temizle</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.mapContainer}>
        {userLocation && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: userLocation.lat,
              longitude: userLocation.lng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {/* Kullanıcı konumu */}
            <Marker
              coordinate={{
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              }}
              title="Konumunuz"
              pinColor="blue"
            />
            
            {/* Şube işaretleri */}
            {filteredBranches.map(branch => (
              <Marker
                key={branch.id}
                coordinate={{
                  latitude: branch.location.lat,
                  longitude: branch.location.lng,
                }}
                title={branch.name}
                description={branch.address}
                pinColor={getBrandColor(branch.brand)}
              />
            ))}
          </MapView>
        )}
      </View>
      
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>
          {filteredBranches.length} şube bulundu
          {selectedBrand ? ` (${selectedBrand})` : ''}
        </Text>
        
        <FlatList
          data={filteredBranches}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.branchItem}>
              <View style={[styles.brandIndicator, { backgroundColor: getBrandColor(item.brand) }]} />
              <View style={styles.branchContent}>
                <Text style={styles.branchName}>{item.name}</Text>
                <Text style={styles.branchAddress}>{item.address}</Text>
                <View style={styles.branchDetails}>
                  {item.amenities?.map(amenity => (
                    <View key={amenity} style={styles.amenityTag}>
                      <Icon
                        name={
                          amenity === 'wifi' ? 'wifi' :
                          amenity === 'outdoor-seating' ? 'sunny' :
                          amenity === 'power-outlets' ? 'flash' :
                          amenity === 'parking' ? 'car' : 'help-circle'
                        }
                        size={12}
                        color="#8B4513"
                      />
                      <Text style={styles.amenityTagText}>
                        {
                          amenity === 'wifi' ? 'WiFi' :
                          amenity === 'outdoor-seating' ? 'Dış Mekan' :
                          amenity === 'power-outlets' ? 'Priz' :
                          amenity === 'parking' ? 'Otopark' : amenity
                        }
                      </Text>
                    </View>
                  ))}
                  
                  {item.distance && (
                    <View style={styles.distanceTag}>
                      <Icon name="location" size={12} color="#8B4513" />
                      <Text style={styles.distanceTagText}>
                        {formatDistance(item.distance)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    color: '#ffcccc',
    fontSize: 12,
  },
  filtersContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  filterButtonText: {
    color: '#8B4513',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  amenityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  amenityButtonText: {
    color: '#8B4513',
    marginLeft: 5,
    fontSize: 12,
  },
  activeAmenityButton: {
    backgroundColor: '#8B4513',
  },
  activeAmenityButtonText: {
    color: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  sortButtonText: {
    color: '#8B4513',
    marginLeft: 5,
  },
  activeSortButton: {
    backgroundColor: '#8B4513',
  },
  activeSortButtonText: {
    color: '#fff',
  },
  clearButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  clearButtonText: {
    color: '#555',
  },
  mapContainer: {
    height: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  branchItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  brandIndicator: {
    width: 5,
  },
  branchContent: {
    padding: 10,
    flex: 1,
  },
  branchName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  branchAddress: {
    color: '#555',
    fontSize: 14,
    marginTop: 3,
  },
  branchDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  amenityTagText: {
    fontSize: 10,
    color: '#8B4513',
    marginLeft: 3,
  },
  distanceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  distanceTagText: {
    fontSize: 10,
    color: '#0066cc',
    marginLeft: 3,
  },
});

export default MapScreen;
