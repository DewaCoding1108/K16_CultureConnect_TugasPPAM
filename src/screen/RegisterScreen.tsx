import { Button, Dimensions, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import AppButton from '../components/AppButton'
import TouchableText from '../components/TouchableText'


const RegisterScreen = ({navigation}:any) => {
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground style={styles.LandingImage}source={require("../assets/app_images/RegisterPageImage.png")}>
        <View style={styles.TextContainer}>
          <Text style={styles.TextHeader}>Join To Explore Culture</Text>
          <AppButton title="Register as a Customer" backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={()=>{navigation.push('Register_User',{role:'Customer'})}}/>
          <AppButton title="Register as a Provider" backgroundColor={COLORS.primaryWhiteHex} textColor={COLORS.primaryBlackHex} onPress={()=>{navigation.push('Register_User',{role:'Provider'})}}/>
          {/* <Button title='Login' ></Button> */}
          <Text style={styles.TextParagraph}>Have an account already?
            <Text> </Text>
            <Text onPress={()=>{navigation.push('Login')}} style={{color:COLORS.primaryRedHex, textDecorationLine:"underline"}}>Login</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  )
}

export default RegisterScreen

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
    marginTop:SPACING.space_30,
    textAlign:'center',
  }
})