import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import EditProfileCard from '../components/EditProfileCard'
import AppButton from '../components/AppButton'
import { useAuth } from '../auth/AuthProvider'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'


const EditProfile = ({navigation,route}:any) => {
  const { user, profile }:any = useAuth();
  const [name, setName] = useState(profile?.data.name);
  const [nomor, setNomor] = useState(profile?.data.nomor);

  async function handleClick() {
    
    try {
        const q = query(collection(firestore, "Users"), where('email','==',user?.email))
        const querySnapshot = await getDocs(q);
        const searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));

        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { name: name, nomor: nomor });
        console.log(profile?.data.name)
        alert("Silakan SignOut dan Login kembali untuk mengubah data profile")
      } catch (error) {
        alert("Error");
      }
  }

  return (
    <View style={{
        flex: 1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingTop:50,
        paddingHorizontal:SPACING.space_20,
        backgroundColor:COLORS.primaryWhiteHex}}
      >
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={[styles.TextHeader,{marginTop:16}]}>Edit Personal Information</Text>
        <Text style={[styles.TextParagraph, {marginBottom:4}]}>Customize your personal information with new information </Text>
        <View style={styles.line}/>
          <EditProfileCard title="Full Name" text={name} setText={setName} />
        <View style={styles.line}/>
          <EditProfileCard title="Phone Number" text={nomor} setText={setNomor} />
        <View style={styles.line}/>
        <AppButton title="Save" backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={handleClick} buttonStyle={{marginTop:20, borderRadius:30}}/>
      </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    TextHeader: {
        fontFamily: "Poppins-Medium",
        fontSize: FONTSIZE.size_26,
        color: COLORS.primaryBlackHex,
      },
    TextParagraph: {
        fontFamily: "Poppins-ExtraLight",
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryBlackHex,
    }, 
    line: {
        marginVertical:SPACING.space_8,
        borderColor: '#A19C9C',
        borderWidth: 0.3,
        width: '100%',
      }
})