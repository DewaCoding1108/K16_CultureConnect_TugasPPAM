import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import LandingScreen from "./src/screen/LandingScreen";
import RegisterScreen from "./src/screen/RegisterScreen";
import DetailScreen from "./src/screen/DetailScreen";
import LoginScreen from "./src/screen/LoginScreen";
import RegisterCustomerScreen from "./src/screen/RegisterCustomerScreen";
import RegisterProviderScreen from "./src/screen/RegisterProviderScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Black': require('./src/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('./src/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
    'PlayfairDisplay-SemiBold': require('./src/assets/fonts/PlayfairDisplay-SemiBold.ttf'),
  });
  
  SplashScreen.preventAutoHideAsync();
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
    
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          // options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          // options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register_Customer"
          component={RegisterCustomerScreen}
          // options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register_Provider"
          component={RegisterProviderScreen}
          // options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          // options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          // options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
