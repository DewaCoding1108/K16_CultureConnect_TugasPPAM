import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import LandingScreen from "./src/screen/LandingScreen";
import RegisterScreen from "./src/screen/RegisterScreen";
import LoginScreen from "./src/screen/LoginScreen";
import RegisterUserScreen from "./src/screen/RegisterUserScreen";
import ProviderScreen from "./src/screen/ProviderScreen";
import { AuthProvider, useAuth } from "./src/auth/AuthProvider";
import CategoryScreen from "./src/screen/CategoryScreen";
import DetailScreen from "./src/screen/DetailScreen";
import DetailScreen2 from "./src/screen/DetailScreen2";
import EditProfile from "./src/screen/EditProfile";
import LikedArt from "./src/screen/LikedArt";
import Brand from "./src/screen/Brand";
import Revenue from "./src/screen/Revenue";
import AppLoader from "./src/components/AppLoader";
import SanggarSearchScreen from "./src/screen/SanggarSearchScreen";
import SanggarDetailScreen from "./src/screen/SanggarDetailScreen";
import SeniDetailScreen from "./src/screen/SeniDetailScreen";
import JasaSeniDetailScreen from "./src/screen/JasaSeniDetailScreen";
import JasaSeniSearchScreen from "./src/screen/JasaSeniSearchScreen";
import SenimanDetailScreen from "./src/screen/SenimanDetailScreen";
import BookingScreen from "./src/screen/BookingScreen";
import SewaPakaianSearchScreen from "./src/screen/SewaPakaianSearchScreen";
import SewaPakaianDetailScreen from "./src/screen/SewaPakaianDetailScreen";
import TokoSewaDetailScreen from "./src/screen/TokoSewaDetailScreen";
import BookingPakaianScreen from "./src/screen/BookingPakaianScreen";
import PaymentDetailsScreen from "./src/screen/PaymentDetailsScreen";
import BrandCategory from "./src/screen/BrandCategory";
import EditBrand from "./src/screen/EditBrand";
import PaymentMethodScreen from "./src/screen/PaymentMethodScreen";
import HistoryScreen from "./src/screen/OrderHistoryScreen";

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const { user, initializing, role, profile} = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        role === 'Provider' ? (
          <>
            <Stack.Screen 
              name="Tab" 
              component={TabNavigator}
              ></Stack.Screen>
            <Stack.Screen 
              name="Category" 
              component={CategoryScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Detail" 
              component={DetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Detail2" 
              component={DetailScreen2}
              ></Stack.Screen>
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfile}
              ></Stack.Screen>
            <Stack.Screen 
              name="LikedArt" 
              component={LikedArt}
              ></Stack.Screen>
            <Stack.Screen 
              name="Brand" 
              component={Brand}
              ></Stack.Screen>
            <Stack.Screen 
              name="Revenue" 
              component={Revenue}
              ></Stack.Screen>
              <Stack.Screen
            name="PaymentDetails"
            component={PaymentDetailsScreen}
          ></Stack.Screen>
          <Stack.Screen 
              name="BrandCategory" 
              component={BrandCategory}
              ></Stack.Screen>
            <Stack.Screen 
              name="EditBrand" 
              component={EditBrand}
              ></Stack.Screen>
          </>   
        ) : (
          <>
            <Stack.Screen 
              name="Tab" 
              component={TabNavigator}
              ></Stack.Screen>
            <Stack.Screen 
              name="Category" 
              component={CategoryScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Detail" 
              component={DetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Detail2" 
              component={DetailScreen2}
              ></Stack.Screen>
            <Stack.Screen 
              name="Sanggar" 
              component={SanggarSearchScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="SanggarDetail" 
              component={SanggarDetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="SeniDetail" 
              component={SeniDetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Jasa Seni" 
              component={JasaSeniSearchScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="SenimanDetail" 
              component={SenimanDetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="JasaSeniDetail" 
              component={JasaSeniDetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Sewa Pakaian" 
              component={SewaPakaianSearchScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="SewaPakaianDetail" 
              component={SewaPakaianDetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="TokoSewaDetail" 
              component={TokoSewaDetailScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Booking" 
              component={BookingScreen}
              ></Stack.Screen>
            <Stack.Screen 
              name="Booking Pakaian" 
              component={BookingPakaianScreen}
              ></Stack.Screen>
              name="EditProfile" 
              component={EditProfile}
              ></Stack.Screen>
            <Stack.Screen 
              name="LikedArt" 
              component={LikedArt}
              ></Stack.Screen>
              <Stack.Screen
            name="PaymentDetails"
            component={PaymentDetailsScreen}
          ></Stack.Screen>
          <Stack.Screen
              name="Paymentmethod"
              component={PaymentMethodScreen}
            ></Stack.Screen>
            <Stack.Screen
              name="History"
              component={HistoryScreen}
            ></Stack.Screen>
          </>   
        )
      ) : (
        <>
          <Stack.Screen 
            name="Landing" 
            component={LandingScreen}
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
            name="Register_User"
            component={RegisterUserScreen}
            // options={{ animation: "slide_from_bottom" }}
          ></Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App({navigation}:any) {

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Black': require('./src/assets/fonts/Poppins-Black.ttf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./src/assets/fonts/Poppins-ExtraLight.ttf'),
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
    <AuthProvider>
      <NavigationContainer onReady={onLayoutRootView}>
        <Navigation/>
    </NavigationContainer>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});
