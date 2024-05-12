import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppButton from '../components/AppButton'
import { COLORS } from '../theme/theme'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'

const ProfileScreen = ({navigation}: any) => {

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if(!user){
  //       navigation.navigate('Landing')
  //     }
  //   })
  //   return unsubscribe
  // }, [])

  const signOutHandler = () => {
    signOut(auth)
    .then(() => {
      console.log('User signed out successfully');
      navigation.replace('Landing')
      // Navigate to the sign-in screen or any other screen after sign out if needed
    })
    .catch(error => {
      console.error('Error signing out:', error);
    });
  }  

  return (
    <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <AppButton onPress={signOutHandler} title='Sign Out' textColor={COLORS.primaryWhiteHex} backgroundColor={COLORS.primaryRedHex}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})