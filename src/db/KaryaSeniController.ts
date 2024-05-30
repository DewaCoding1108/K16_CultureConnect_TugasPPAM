import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { firestore } from '../../firebaseConfig'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

const getAllKaryaSeni = async () => {
  const karyaseniRef = collection(firestore,'Karya Seni');
  const karyaseniDocs = await getDocs(karyaseniRef);
  return karyaseniDocs; 
}

const getKaryaSeniWithDocID = async (docID:any) => {
  const karyaseniDoc = await getDoc(doc(firestore,'Karya Seni',docID));
  return karyaseniDoc;
}

const getKaryaSeniWithTokoKaryaID = async (tokokaryaID:string) => {
  const q = query(collection(firestore,'Karya Seni'), where('tokokaryaID','==',tokokaryaID));
  const seniDocs = await getDocs(q);
  return seniDocs;
}


export {getAllKaryaSeni,getKaryaSeniWithDocID,getKaryaSeniWithTokoKaryaID}