import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React,{ useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppButton from '../components/AppButton';
import InputText from '../components/InputText';
import BackButton from '../components/BackButton';

const RegisterProviderScreen = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.FormContainer}>
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={styles.TextHeader}>Register Provider</Text>
        <Text style={styles.TextParagraph}>Fill the Information Below to Complete the Registration Account</Text>
        <InputText label='Email' value={email} placeholder='input your email address' changeHandler={(email:string) => setEmail(email)}/>
        <InputText label='Phone Number' value={phoneNumber} placeholder='input your phone number' changeHandler={(phoneNumber:string) => setPhoneNumber(phoneNumber)}/>
        <InputText label='Full Name' value={name} placeholder='input your name' changeHandler={(name:string) => setName(name)}/>
        <InputText label='Password' value={password} placeholder='input your password' changeHandler={(password:string) => setPassword(password)}/>
        <View style={{marginTop:SPACING.space_18}}>
          <AppButton title="Register" backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={()=>{navigation.push('Login')}}/>
        </View>
        <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
          <Text style={styles.TextParagraph}>Have an account already? 
            <Text onPress={()=>{navigation.push('Login')}} style={{color:COLORS.primaryRedHex}}> Login</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default RegisterProviderScreen

const styles = StyleSheet.create({
  ScreenContainer:{
    flex:1,
    backgroundColor:COLORS.primaryWhiteHex,
  },
  FormContainer:{
    flex:1,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    paddingLeft:SPACING.space_24,
    marginTop:80,
    paddingRight:SPACING.space_15,
  },
  TextHeader: {
    marginTop:SPACING.space_32,
    fontFamily: "Poppins-Medium",
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryBlackHex,
    // marginBottom:SPACING.space_20,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
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