import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'


const  getAllSanggar = async () => {
  const sanggarRef = collection(firestore,'Sanggar');
  const sanggarDocs = await getDocs(sanggarRef);
  return sanggarDocs; 
}

const getSanggarWithDocID = async (docID:any) => {
  const sanggarDoc = await getDoc(doc(firestore,'Sanggar',docID));
  return sanggarDoc;
}

export {getAllSanggar, getSanggarWithDocID}