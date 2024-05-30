import { Button, Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import AppButton from '../components/AppButton'
import {auth, firestore} from '../../firebaseConfig' 
import { useAuth } from '../auth/AuthProvider'
import AppLoader from '../components/AppLoader'

const LandingScreen = ({navigation}:any) => {
  const {initializing} = useAuth();
  return (
    <>
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground style={styles.LandingImage}source={require("../assets/app_images/LandingPageImage.png")}>
        <View style={styles.TextContainer}>
          <Text style={styles.TextHeader}>Contribute In Culture</Text>
          <AppButton title="Login" backgroundColor={COLORS.primaryWhiteHex} textColor={COLORS.primaryBlackHex} onPress={()=>{navigation.push('Login')}}/>
          <Text style={styles.TextParagraph}>Don't have an account?
            <Text> </Text>
            <Text onPress={()=>{navigation.push('Register')}} style={{color:COLORS.primaryRedHex, textDecorationLine:"underline"}}>Create account</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
    {initializing ? <AppLoader/> : null}
    </>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
  LandingImage:{
    width:"100%",
    height:"100%",
  },
  TextContainer:{
    flex:1,
    justifyContent:'flex-end',
    paddingLeft:SPACING.space_12,
    paddingRight:SPACING.space_12,
    marginBottom:SPACING.space_24,
  },
  TextHeader: {
    fontFamily: "PlayfairDisplay-SemiBold",
    fontSize: 47,
    color: COLORS.primaryWhiteHex,
    marginBottom:SPACING.space_20,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginTop:SPACING.space_20,
    textAlign:'center',
  }
})