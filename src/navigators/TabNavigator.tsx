import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screen/HomeScreen'
import ChatScreen from '../screen/ChatScreen'
import OrderHistoryScreen from '../screen/OrderHistoryScreen'
import ProfileScreen from '../screen/ProfileScreen'
import CustomIcon from '../components/CustomIcon'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: COLORS.primaryRedHex,
        tabBarInactiveTintColor: COLORS.primaryBlackHex,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
      >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon:({focused, color,size}) => (
            <Ionicons name={focused?"home-sharp":"home-outline"} size={35} color={focused ? COLORS.primaryRedHex : COLORS.primaryBlackHex} />
          ),
        }}
        ></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={ChatScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={focused ? "cart-sharp" : "cart-outline"} size={40} color={focused ? COLORS.primaryRedHex : COLORS.primaryBlackHex} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={focused?"list-sharp":"list-outline"} size={40} color={focused ? COLORS.primaryRedHex : COLORS.primaryBlackHex} />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons name={focused ? "person-circle-sharp" : "person-circle-outline"} size={40} color={focused ? COLORS.primaryRedHex : COLORS.primaryBlackHex} />
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
    backgroundColor: COLORS.primaryWhiteHex,
    borderTopWidth: 2,
    elevation: 0,
    borderTopColor: COLORS.secondaryRedHex,
  },
  BlurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarLabelStyle: {
    fontFamily:'Poppins-Light',
    fontSize:FONTSIZE.size_12,
  }
});
