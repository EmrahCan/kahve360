import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Ekranları içe aktaracağız, şimdilik placeholder olarak tanımlayalım
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Loyalty') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName || 'help-circle'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B4513', // Kahve rengi
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: 'Harita' }} />
      <Tab.Screen name="Loyalty" component={LoyaltyScreen} options={{ title: 'Sadakat Kartları' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      {/* Burada diğer ekranlar için stack navigasyon eklenebilir */}
    </Stack.Navigator>
  );
};

export default MainNavigator;
