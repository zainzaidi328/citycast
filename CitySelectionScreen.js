import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Make sure this path is correct

const CitySelectionScreen = ({ navigation }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (!city.trim()) return;
    Keyboard.dismiss();
    navigation.navigate('WeatherDetail', { city: city.trim() });
    setCity('');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // User will automatically be redirected by onAuthStateChanged in App.js
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <LinearGradient colors={['#2193b0', '#6dd5ed']} style={styles.container}>
      {/* Sign Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.heading}>🌦️ Search City Weather</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="#aaa"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSearch}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="white" />
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CitySelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 100,
  },
  logoutButton: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 30,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007aff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
