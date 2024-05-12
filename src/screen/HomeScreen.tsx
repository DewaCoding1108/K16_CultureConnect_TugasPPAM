import {ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { BORDERRADIUS, COLORS, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import SeniCard from "../components/SeniCard";

const HomeScreen = ({navigation}:any) => {

  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackgroundInfo imagelink_portrait={require("../../src/assets/app_images/HomePageImage.png")} value={searchQuery} onChangeText={(searchQuery:string) => setSearchQuery(searchQuery)} clickHandler={()=> navigation.navigate('Detail')} editable={false}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.CardContainer}>
          <SeniCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Sanggar Seni" description= "Temukan bakat seni Anda dalam lukisan, tari, musik, dan teater di satu tempat yang penuh kreativitas" imagelink={require("../../src/assets/app_images/Home_SanggarSeni.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Jasa Penampilan Seni" description= "Temukan seniman berbakat untuk acara Anda! Dari musisi hingga seniman tari, jelajahi ragam talenta" imagelink={require("../../src/assets/app_images/Home_JasaTampil.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Sewa Pakaian/Musik Tradisional" description= "Temukan pakaian atau alat musik terbaik untuk acara Anda! Dari pakaian adat, tari, hingga alat musik tradisional" imagelink={require("../../src/assets/app_images/Home_SewaPakaian.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Beli Karya Seni" description= "Temukan karya seni terbaik yang ingin Anda beli! Dari lukisan, kerajinan, hingga pakaian tradisional nusantara" imagelink={require("../../src/assets/app_images/Home_BeliKaryaSeni.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Informasi Lomba/Event Kesenian" description= "Temukan informasi seputar event atau lomba kesenian! Ikuti dan raih pengalaman yang tak terlupakan" imagelink={require("../../src/assets/app_images/Home_EventLombaSeni.png")}/>
        </View>
        <View style={styles.BottomContainer}/>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryWhiteHex,
  },
  ScrollViewFlex:{
    flexGrow:1,
  },
  CardContainer:{
    flex:1,
    justifyContent:'space-between',
    borderRadius:BORDERRADIUS.radius_20,
  },
  BottomContainer:{
    height: 90,
  }
});
