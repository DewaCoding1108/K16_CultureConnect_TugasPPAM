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
      <ImageBackgroundInfo enableSearch={true} enableText={true} imagelink_portrait={require("../../src/assets/app_images/HomePageImage.png")} value={searchQuery} onChangeText={(searchQuery:string) => setSearchQuery(searchQuery)} clickHandler={()=> {navigation.navigate('Category',{category:'All'})}} editable={false}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.CardContainer}>
          <SeniCard buttonPressHandler={()=>{navigation.push('Sanggar',{category:'Sanggar'})}} name="Sanggar Seni" description= "Temukan bakat seni Anda dalam lukisan, tari, musik, dan teater di satu tempat yang penuh kreativitas" imagelink={require("../../src/assets/app_images/Home_SanggarSeni.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Jasa Seni',{category:'Jasa Seni'})}} name="Jasa Penampilan Seni" description= "Temukan seniman berbakat untuk acara Anda! Dari musisi hingga seniman tari, jelajahi ragam talenta" imagelink={require("../../src/assets/app_images/Home_JasaTampil.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Sewa Pakaian',{category:'Sewa Pakaian'})}} name="Sewa Pakaian Tradisional" description= "Temukan pakaian tradisional terbaik untuk acara Anda! Dari pakaian adat hingga pakaian tari" imagelink={require("../../src/assets/app_images/Home_SewaPakaian.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Category',{category:'Karya Seni'})}} name="Beli Karya Seni" description= "Temukan karya seni terbaik yang ingin Anda beli! Dari lukisan, kerajinan, hingga pakaian tradisional nusantara" imagelink={require("../../src/assets/app_images/Home_BeliKaryaSeni.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Category',{category:'Event'})}} name="Informasi Lomba/Event Kesenian" description= "Temukan informasi seputar event atau lomba kesenian! Ikuti dan raih pengalaman yang tak terlupakan" imagelink={require("../../src/assets/app_images/Home_EventLombaSeni.png")}/>
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
    // justifyContent:'space-between',
    // borderRadius:BORDERRADIUS.radius_20,
  },
  BottomContainer:{
    height: 90,
  }
});
