import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screen/HomeScreen'
import ChatScreen from '../screen/ChatScreen'
import OrderHistoryScreen from '../screen/OrderHistoryScreen'
import ProfileScreen from '../screen/ProfileScreen'
import CustomIcon from '../components/CustomIcon'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon:({focused, color,size}) => (
            <Ionicons name="home" size={30} color={
              focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
            } />
          )
        }}
        ></Tab.Screen>
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="chatbox-ellipses" size={30} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome5 name="history" size={30} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name="person" size={30} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
