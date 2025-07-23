import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import CitySelectionScreen from './screens/CitySelectionScreen';
import WeatherDetailScreen from './screens/WeatherDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) return null; // or a loading spinner

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "CitySelection" : "Login"}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="CitySelection"
              component={CitySelectionScreen}
              options={{
                title: 'Select City',
                headerLeft: () => null, // removes back button
                gestureEnabled: false, // disables swipe back
              }}
            />
            <Stack.Screen
              name="WeatherDetail"
              component={WeatherDetailScreen}
              options={{ title: 'Weather Forecast' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
