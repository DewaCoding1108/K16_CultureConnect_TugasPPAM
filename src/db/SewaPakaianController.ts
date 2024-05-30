import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

const getAllSewaPakaian = async () => {
  const sewaPakaianRef = collection(firestore,'Sewa Pakaian');
  const sewaPakaianDocs = await getDocs(sewaPakaianRef);
  return sewaPakaianDocs; 
}

const getSewaPakaianWithDocID = async (docID:any) => {
  const sewaPakaianDoc = await getDoc(doc(firestore,'Sewa Pakaian',docID));
  return sewaPakaianDoc;
}

const getSewaPakaianWithTokoSewaID = async (tokoSewaID:string) => {
  const q = query(collection(firestore,'Sewa Pakaian'), where('tokosewaID','==',tokoSewaID));
  const seniDocs = await getDocs(q);
  return seniDocs;
}


export {getAllSewaPakaian,getSewaPakaianWithDocID,getSewaPakaianWithTokoSewaID}