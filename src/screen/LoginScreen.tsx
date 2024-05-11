import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React,{ useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppButton from '../components/AppButton';

const LoginScreen = ({navigation}:any) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.TextContainer}>
      <TouchableOpacity onPress={()=>{navigation.goBack()}}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
        <Text style={styles.TextHeader}>Login</Text>
        <Text style={styles.TextParagraph}>Fill the Information Below with the Correct Identity to Complete the Login Account</Text>
        <View style={styles.TextInputComponent}>
          <Text style={styles.TextLabel}>Email</Text>
          <TextInput
            style={[styles.TextInputContainer,{borderColor:COLORS.primaryLightGreyHex}]}
            onChangeText={setEmail}
            value={email}
            placeholder='input your email address'
          />
        </View>
        <View style={styles.TextInputComponent}>
          <Text style={styles.TextLabel}>Password</Text>
          <TextInput
            style={[styles.TextInputContainer,{borderColor:COLORS.primaryLightGreyHex}]}
            onChangeText={setPassword}
            value={password}
            placeholder='input your password'
          />
        </View>
        <Text onPress={()=>{navigation.push('Register')}} style={{color:COLORS.primaryBlackHex, textAlign:'right', marginBottom:SPACING.space_24, fontFamily:'Poppins-Medium', fontSize:14}}> Forgot Password?</Text>
        <AppButton title="Login" backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={()=>{navigation.push('Tab')}}/>
        <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
        <Text style={styles.TextParagraph}>Don't have an account? 
            <Text onPress={()=>{navigation.push('Register')}} style={{color:COLORS.primaryRedHex}}> Create account</Text>
        </Text>
        </View>
        
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryWhiteHex,
  },
  TextContainer:{
    flex:1,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    paddingLeft:SPACING.space_18,
    marginTop:80,
    paddingRight:SPACING.space_15,
  },
  TextHeader: {
    marginTop:SPACING.space_32,
    fontFamily: "Poppins-Medium",
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryBlackHex,
    paddingLeft:6,
    // marginBottom:SPACING.space_20,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    paddingLeft:6,
    marginBottom:SPACING.space_18,
  },
  TextInputContainer: {
    borderColor:COLORS.primaryBlackHex,
    // backgroundColor:COLORS.primaryDarkGreyHex,
    fontFamily:'Poppins-Medium',
    borderWidth:1,
    fontSize:FONTSIZE.size_12,
    borderRadius:BORDERRADIUS.radius_4,
    paddingTop:SPACING.space_10,
    paddingBottom:SPACING.space_12,
    paddingLeft:SPACING.space_12,
  },
  TextInputComponent:{
    paddingLeft:6,
    marginBottom:SPACING.space_18,
  },
  TextLabel:{
    fontFamily:'Poppins-Light',
    fontSize:FONTSIZE.size_14,
    color:COLORS.primaryLightGreyHex,
    marginBottom:5,
  }
})