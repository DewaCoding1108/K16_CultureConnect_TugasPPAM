import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'


const  getAllTokoSewa = async () => {
  const tokoSewaRef = collection(firestore,'Toko Sewa');
  const tokoSewaDocs = await getDocs(tokoSewaRef);
  return tokoSewaDocs; 
}

const getTokoSewaWithDocID = async (docID:any) => {
  const tokoSewaDoc = await getDoc(doc(firestore,'Toko Sewa',docID));
  return tokoSewaDoc;
}

export {getAllTokoSewa, getTokoSewaWithDocID}