import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'


const  getAllTokoKarya = async () => {
  const tokoKaryaRef = collection(firestore,'Toko Karya');
  const tokoKaryaDocs = await getDocs(tokoKaryaRef);
  return tokoKaryaDocs; 
}

const getTokoKaryaWithDocID = async (docID:any) => {
  const tokoKaryaDoc = await getDoc(doc(firestore,'Toko Karya',docID));
  return tokoKaryaDoc;
}

export {getAllTokoKarya, getTokoKaryaWithDocID}