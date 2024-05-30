import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'


const  getAllSeniman = async () => {
  const sanggarRef = collection(firestore,'Seniman');
  const sanggarDocs = await getDocs(sanggarRef);
  return sanggarDocs; 
}

const getSenimanWithDocID = async (docID:any) => {
  const sanggarDoc = await getDoc(doc(firestore,'Seniman',docID));
  return sanggarDoc;
}

export {getAllSeniman, getSenimanWithDocID}