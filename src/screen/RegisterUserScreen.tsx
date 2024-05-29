import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert, ScrollView } from 'react-native'
import React,{ useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppButton from '../components/AppButton';
import InputText from '../components/InputText';
import BackButton from '../components/BackButton';
// import auth from '@react-native-firebase/auth'
// import { auth } from '../../firebaseConfig';
// import firestore from '@react-native-firebase/firestore'
// import * as firebase from 'firebase'
import {auth,firestore} from '../../firebaseConfig'
import { collection, doc, setDoc } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../auth/AuthProvider'
import AppLoader from '../components/AppLoader'

const RegisterUserScreen = ({navigation,route}:any) => {
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const {role} = route.params
  const {initializing} = useAuth();

  // const auth = getAuth();
  const signUpHandler = async () => {
    if (email && password && phoneNumber && name){
      try{
        const response = await createUserWithEmailAndPassword(auth,
          email,
          password
        );
        if(response.user){
          const userRef = collection(firestore,'Users');
          await setDoc(doc(userRef, response.user.uid), {
            email: email,
            name: name,
            nomor: phoneNumber,
            role: role });
            console.log('User created successfully, please log in');
        }
      }
      catch(e:any){
        alert(e.message);
      }
    }
    else{
      alert("Tolong lengkapi form berikut!")
    }
  }
  return (
    <>
    <View style={styles.ScreenContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
      <View style={styles.FormContainer}>
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        {role=="Customer" ? 
        <Text style={styles.TextHeader}>Register Customer</Text> : 
        <Text style={styles.TextHeader}>Register Provider</Text>}
        {/* <Text style={styles.TextHeader}>Register</Text> */}
        <Text style={styles.TextParagraph}>Fill the Information Below to Complete the Registration Account</Text>
          <InputText label='Email' value={email} placeholder='input your email address' changeHandler={(email:string) => setEmail(email)}/>
          <InputText label='Phone Number' value={phoneNumber} placeholder='input your phone number' changeHandler={(phoneNumber:string) => setPhoneNumber(phoneNumber)}/>
          <InputText label='Full Name' value={name} placeholder='input your name' changeHandler={(name:string) => setName(name)}/>
          <InputText label='Password' value={password} placeholder='input your password' changeHandler={(password:string) => setPassword(password)} secureTextEntry={true}/>
          <View style={{marginTop:SPACING.space_18}}>
            <AppButton title="Register" backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={signUpHandler}/>
          </View>
          <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
            <Text style={styles.TextParagraph}>Have an account already? 
              <Text onPress={()=>{navigation.push('Login')}} style={{color:COLORS.primaryRedHex}}> Login</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
    {initializing? <AppLoader/> : null}
    </>
  )
}

export default RegisterUserScreen

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
  },
  ScrollViewFlex:{
    flexGrow:1,
  }
})