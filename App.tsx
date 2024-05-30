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
// import auth, { FirebaseAuthTypes} from "@react-native-firebase/auth"
// import User from "@react-native-firebase/auth" 
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
import PaymentDetailsScreen from "./src/screen/PaymentDetailsScreen";

const Stack = createNativeStackNavigator();

const Navigation: React.FC = () => {
  const { user, initializing, role, profile} = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        role === 'Provider' ? (
          <Stack.Screen 
            name="Provider" 
            component={ProviderScreen} 
            ></Stack.Screen>
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
