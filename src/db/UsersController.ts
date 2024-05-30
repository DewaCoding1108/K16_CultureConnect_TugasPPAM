import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

const createNewChartToUser = async (userID:string) => {
  // const userRef = collection(firestore,'Users',userID)
  // const chartRef = collection(userRef,'Chart')
  // await setDoc(doc(chartRef), {
  //   email: email,
  //   name: name,
  //   nomor: phoneNumber,
  //   role: role });
}