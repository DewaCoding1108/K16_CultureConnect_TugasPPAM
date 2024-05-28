import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBar from '../components/HeaderBar'
import PesananCard from '../components/PesananCard'
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';

const DetailScreen = ({navigation}:any) => {
  return (
    <View >
      <HeaderBar title="Pesanan" description="Pesan sekarang untuk pengalaman yang tak terlupakan terhadap karya seni"/>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
          <PesananCard buttonPressHandler={()=>{navigation.push('Detail')}} name="Komunitas Batik" location= "Yogyakarta" price={57000} type= "Sanggar Seni" imagelink= {require("../../src/assets/app_images/Home_SanggarSeni.png")}></PesananCard>
        </View>
        <View style={styles.Bottomheigt}></View>
      </ScrollView>
      <View style={styles.ButtonAlignment}>
        <ChartButton price={57000}></ChartButton>
      </View>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  ScrollViewFlex:{
    flexGrow:1,
    alignItems: "center",
  },
  Bottomheigt:{
    height:325,
  },
  ButtonAlignment: {
    alignSelf: "center",
    // position:"absolute",
    bottom: 325,

  }
})