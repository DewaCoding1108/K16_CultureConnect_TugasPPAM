import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

const getAllJasaSeni = async () => {
  const seniRef = collection(firestore,'Jasa Seni');
  const seniDocs = await getDocs(seniRef);
  return seniDocs; 
}

const getJasaSeniWithDocID = async (docID:any) => {
  const seniDoc = await getDoc(doc(firestore,'Jasa Seni',docID));
  return seniDoc;
}

const getJasaSeniWithSenimanID = async (senimanID:string) => {
  const q = query(collection(firestore,'Jasa Seni'), where('senimanID','==',senimanID));
  const seniDocs = await getDocs(q);
  return seniDocs;
}


export {getAllJasaSeni,getJasaSeniWithDocID,getJasaSeniWithSenimanID}