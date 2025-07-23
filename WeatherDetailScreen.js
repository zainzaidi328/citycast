import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const API_KEY = '183b4e4221306bc09ca1e979de06cc40';

const getIcon = (condition) => {
  switch (condition) {
    case 'Clear': return 'weather-sunny';
    case 'Clouds': return 'weather-cloudy';
    case 'Rain': return 'weather-rainy';
    case 'Thunderstorm': return 'weather-lightning';
    case 'Snow': return 'weather-snowy';
    case 'Mist': return 'weather-fog';
    default: return 'weather-partly-cloudy';
  }
};

const getGradient = (condition) => {
  switch (condition) {
    case 'Clear': return ['#fbc2eb', '#a6c1ee'];
    case 'Clouds': return ['#d7d2cc', '#304352'];
    case 'Rain': return ['#89f7fe', '#66a6ff'];
    case 'Snow': return ['#e0eafc', '#cfdef3'];
    case 'Thunderstorm': return ['#616161', '#9bc5c3'];
    default: return ['#dfe9f3', '#ffffff'];
  }
};

const WeatherDetailScreen = ({ route }) => {
  const { city } = route.params;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (response.data.cod !== 200) {
        Alert.alert('City Not Found', response.data.message);
        return;
      }

      setWeather(response.data);
    } catch (error) {
      if (error.response) {
        Alert.alert('City Not Found', error.response.data.message);
      } else {
        Alert.alert('Error', 'Something went wrong while fetching weather.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007aff" />
        <Text style={{ marginTop: 10 }}>Loading weather...</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Failed to fetch weather data.</Text>
      </View>
    );
  }

  const main = weather.weather[0].main;
  const description = weather.weather[0].description;
  const temp = weather.main.temp;
  const iconName = getIcon(main);
  const gradientColors = getGradient(main);

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <Text style={styles.city}>{city}</Text>
      <MaterialCommunityIcons name={iconName} size={100} color="white" />
      <Text style={styles.temp}>{temp}°C</Text>
      <Text style={styles.condition}>{description}</Text>
    </LinearGradient>
  );
};

export default WeatherDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  city: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  temp: {
    fontSize: 56,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  condition: {
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
    textTransform: 'capitalize',
  },
});
