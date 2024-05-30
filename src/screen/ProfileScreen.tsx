import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppButton from "../components/AppButton";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
// import { signOut } from 'firebase/auth'
// import { auth } from '../../firebaseConfig'
// import auth from '@react-native-firebase/auth'
import { AuthProvider, useAuth } from "../auth/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import ProfileCard from "../components/ProfileCard";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { SignOut } from "../db/Authentication";

const ProfileScreen = ({ navigation }: any) => {
  const { user, initializing, role, profile } = useAuth();

  useEffect(() => {
    console.log(user);
  }, []);

  const signOutHandler = () => {
    SignOut();
  };

  return (
    <View style={styles.ScreenContainer}>
      <View style={{marginTop:50, paddingHorizontal:SPACING.space_20}}>
        <Text style={styles.TextHeader}>Profile</Text>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name={"person-circle-outline"}
            size={72}
            color={COLORS.primaryBlackHex}
          />
          <View
            style={{
              marginTop: SPACING.space_16,
              paddingHorizontal: SPACING.space_4,
            }}
          >
            <Text style={styles.TextName}>{profile?.data.name}</Text>
            <Text style={styles.TextEmail}>{profile?.data.email}</Text>
          </View>
        </View>
        <View style={styles.line}/>
          <ProfileCard pressHandler={()=>{navigation.push('EditProfile')}} icon="Feather" iconName="edit" text="Edit Personal Information"/>
        <View style={styles.line}/>
          <ProfileCard pressHandler={()=>{navigation.push('LikedArt')}} icon="Feather" iconName="heart" text="Liked Art"/>
        {role === 'Provider'? 
          <>
            <View style={styles.line}/>
              <ProfileCard pressHandler={()=>{navigation.push('Brand')}} icon="Ionicons" iconName="newspaper-outline" text="Your Brand"/>
            <View style={styles.line}/>
              <ProfileCard pressHandler={()=>{navigation.push('Revenue')}} icon="Entypo" iconName="line-graph" text="Revenue"/>
          </>
          : <></>
        }
        
        <View style={styles.line}/>
          <ProfileCard pressHandler={signOutHandler} icon="Octicons" iconName="sign-out" text="Sign Out" textPaddingLeft={14}/>
        <View style={styles.line}/>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  TextHeader: {
    fontFamily: "Poppins-Medium",
    fontSize: FONTSIZE.size_26,
    color: COLORS.primaryBlackHex,
  },
  TextName: {
    fontFamily: "Poppins-Medium",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  TextEmail: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryBlackHex,
  },
  line: {
    marginVertical: SPACING.space_8,
    borderColor: "#A19C9C",
    borderWidth: 0.3,
    width: "100%",
  },
  TextProfile: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
  },
});
