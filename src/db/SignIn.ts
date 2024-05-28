import { View, Text } from 'react-native'
import React from 'react'
// import auth from '@react-native-firebase/auth'
// import firestore from '@react-native-firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth,firestore} from '../../firebaseConfig'

const SignIn = async ({email,password}:any) => {
  if(email && password){
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential) => { 
      console.log('login with: ',userCredential.user.email)
    })
    .catch(error => alert("Email atau password yang Anda isi salah"))
  }
  else{
    if(!email && !password){
      alert('Tolong isi email dan password Anda! ')
    }
    else{
      if(!password){
        alert('Tolong isi password Anda! ')
      }
      else if (!email){
        alert('Tolong isi email Anda! ')
      }
    }
  }

}

export default SignIn