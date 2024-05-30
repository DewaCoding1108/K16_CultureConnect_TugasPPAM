import {Animated, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import SeniCard from "../components/SeniCard";
import { SearchBar } from "react-native-screens";
import { Ionicons } from "@expo/vector-icons";

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground); // Create an animated version of ImageBackground

const HomeScreen = ({navigation}:any) => {

  const [searchQuery, setSearchQuery] = useState('');
  let scrollOffsetY = useRef(new Animated.Value(0)).current; 

  const Header_Max_Height = 200;
  const Header_Min_Height = 30;

  const animateHeaderHeight =  scrollOffsetY.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: [Header_Max_Height , Header_Min_Height],
    extrapolate: 'clamp'
  })

  const animateHeaderBackgroundColor = scrollOffsetY.interpolate({
    inputRange: [0, Header_Max_Height - Header_Min_Height],
    outputRange: ['rgba(255,255,255, 0)', COLORS.primaryWhiteHex],
    extrapolate: 'clamp'
  })

  // const isScrollEnabled = scrollOffsetY.interpolate({
  //   inputRange: [0, Header_Max_Height - Header_Min_Height],
  //   outputRange: [false, true],
  //   extrapolate: 'clamp'
  // });
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <AnimatedImageBackground resizeMode="repeat" source={require("../../src/assets/app_images/HomePageImage.png")} imageStyle={{objectFit:"cover", height:350}} style={{width:"100%", height: animateHeaderHeight}}>
        <Animated.View style={{paddingHorizontal:20, paddingTop:94, height:350,  backgroundColor:animateHeaderBackgroundColor}}>
          <Text style={styles.TextHeader}>
          Boundless Source of Inspiration
          </Text>
          <Text style={styles.TextParagraph}>
          Contributing to Indonesian culture
          </Text>
        </Animated.View>
      </AnimatedImageBackground>
      {/* <ImageBackgroundInfo enableSearch={true} enableText={true} imagelink_portrait={require("../../src/assets/app_images/HomePageImage.png")} value={searchQuery} onChangeText={(searchQuery:string) => setSearchQuery(searchQuery)} clickHandler={()=> {navigation.navigate('Category',{category:'All'})}} editable={false}/> */}
      <TouchableOpacity onPress={()=> {navigation.navigate('Category',{category:'All'})}} style={styles.InputContainerComponent} activeOpacity={0.7}>
          <Ionicons
            style={styles.InputIcon}
            name={"search-sharp"}
            size={25}
            color={COLORS.primaryBlackHex}
          />
          {/* <Text style={styles.TextInputContainer}>Search All You Need!</Text> */}
          <TextInput
            style={styles.TextInputContainer}
            placeholder="Search..."
            autoFocus={true}
            value={searchQuery || ''}
            onChangeText={(searchQuery:string) => setSearchQuery(searchQuery)}
            editable={false}
          />
    </TouchableOpacity>
      <ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollOffsetY}}}],
        {useNativeDriver: false}
      )}
      showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.CardContainer}>
          <SeniCard buttonPressHandler={()=>{navigation.push('Sanggar',{category:'Sanggar'})}} name="Sanggar Seni" description= "Temukan bakat seni Anda dalam lukisan, tari, musik, dan teater di satu tempat yang penuh kreativitas" imagelink={require("../../src/assets/app_images/Home_SanggarSeni.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Jasa Seni',{category:'Jasa Seni'})}} name="Jasa Penampilan Seni" description= "Temukan seniman berbakat untuk acara Anda! Dari musisi hingga seniman tari, jelajahi ragam talenta" imagelink={require("../../src/assets/app_images/Home_JasaTampil.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Sewa Pakaian',{category:'Sewa Pakaian'})}} name="Sewa Pakaian Tradisional" description= "Temukan pakaian tradisional terbaik untuk acara Anda! Dari pakaian adat hingga pakaian tari" imagelink={require("../../src/assets/app_images/Home_SewaPakaian.png")}/>
          <SeniCard buttonPressHandler={()=>{navigation.push('Karya Seni',{category:'Karya Seni'})}} name="Beli Karya Seni" description= "Temukan karya seni terbaik yang ingin Anda beli! Dari lukisan, kerajinan, hingga pakaian tradisional nusantara" imagelink={require("../../src/assets/app_images/Home_BeliKaryaSeni.png")}/>
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
    backgroundColor:COLORS.primaryWhiteHex,
    paddingTop: 8,
    // marginTop: 18,
    borderRadius: 26,
  },
  CardContainer:{
    flex:1,
    // justifyContent:'space-between',
    // borderRadius:BORDERRADIUS.radius_20,
  },
  BottomContainer:{
    height: 90,
  },
  InputContainerComponent: {
    padding:8,
    width:'90%',
    marginTop: SPACING.space_16,
    marginBottom: SPACING.space_16,
    borderWidth:1,
    marginHorizontal:"auto",
    borderColor:'#A19C9C',
    borderRadius: 30,
    backgroundColor: COLORS.primaryWhiteHex,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems:'center',
  },
  InputIcon: {
    marginTop:SPACING.space_2,
    marginLeft:SPACING.space_10,
    marginRight:SPACING.space_10,
  },
  TextInputContainer: {
    marginTop:SPACING.space_2,
    width:'100%',
    fontFamily:'Poppins-Medium',
    fontSize:FONTSIZE.size_12,
  },
  TextHeader: {
    fontFamily: "Poppins-Regular",
    fontSize: FONTSIZE.size_30,
    color: COLORS.primaryWhiteHex,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
  },
});
