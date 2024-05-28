import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppButton from '../components/AppButton'
import { COLORS } from '../theme/theme'
import { signOut } from 'firebase/auth'
// import { auth } from '../../firebaseConfig'
import auth from '@react-native-firebase/auth'

const ProviderScreen = ({navigation}:any) => {
  const signOutHandler = async () => {
    await auth().signOut();
    // navigation.replace('Landing');
  }  

  return (
    <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
      <Text>Provider Screen</Text>
      <AppButton onPress={signOutHandler} title='Sign Out' textColor={COLORS.primaryWhiteHex} backgroundColor={COLORS.primaryRedHex}/>
    </View>
  )
}

export default ProviderScreen

const styles = StyleSheet.create({})