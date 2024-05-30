import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

const getAllSeni = async () => {
  const seniRef = collection(firestore,'Seni');
  const seniDocs = await getDocs(seniRef);
  return seniDocs; 
}

const getSeniWithDocID = async (docID:any) => {
  const seniDoc = await getDoc(doc(firestore,'Seni',docID));
  return seniDoc;
}

const getSeniWithSanggarID = async (sanggarID:string) => {
  const q = query(collection(firestore,'Seni'), where('sanggarID','==',sanggarID));
  const seniDocs = await getDocs(q);
  return seniDocs;
}


export {getAllSeni,getSeniWithDocID,getSeniWithSanggarID}