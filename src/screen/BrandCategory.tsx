import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import PesananCard from '../components/PesananCard'
import { Ionicons } from '@expo/vector-icons'
import CategoryBrandCard from '../components/CategoryBrandCard'
import { DocumentData, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { auth, firestore } from '../../firebaseConfig'
import { useAuth } from '../auth/AuthProvider'
import AppLoader from '../components/AppLoader'

const BrandCategory = ({navigation,route}:any) => {
    const [queryData, setQueryData] =  useState<Array<{ id: string, data: any }>>([]);
    const [isLoading, setIsLoading] = useState(true);

    let propsProduct = "";
    if (route.params.title === "Sanggar") {
        propsProduct = "Seni";
    } else if  (route.params.title === "Seniman") {
        propsProduct = "Jasa Seni";
    } else if  (route.params.title === "Toko Sewa") {
        propsProduct = "Sewa Pakaian";
    } else if  (route.params.title === "Toko Karya") {
        propsProduct = "Karya Seni";
    }
    
    const deleteBrand = async () => {
        try {
            const q = query(collection(firestore, route.params.title), where('userID', '==', auth.currentUser?.uid));
            const querySnapshot = await getDocs(q);
            const matchingDoc = querySnapshot.docs[0];
            if (matchingDoc) {
                const docRef = doc(firestore, route.params.title, matchingDoc.id);
                await deleteDoc(docRef);
                navigation.navigate('Brand')
            }
            
        } catch (error) {
            alert("Error!")
        }
            } 
    async function loadData() {
        try {
            const q = query(collection(firestore, route.params.title), where('userID','==',auth.currentUser?.uid))
            const querySnapshot = await getDocs(q);
            const searchResults = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
            setQueryData(searchResults);
            setIsLoading(false);
    
            // const docRef = querySnapshot.docs[0].ref;
            // await updateDoc(docRef, { name: name, nomor: nomor });
          } catch (error) {
            console.log("Nothing");
          }
      }
      useEffect(()=>{
        loadData();
      },[])
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
        <Text style={[styles.TextHeader,{marginTop:16}]}>{route.params.title}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={[styles.TextParagraph, {marginBottom:4}]}>Manage grow your brand creatively</Text>
            
            {/* <Pressable style={{marginRight:12}}>
                <Ionicons name="add-circle" size={22} color="black" />
            </Pressable> */}
        </View>
        <View style={styles.line}/>
        {isLoading ? <AppLoader /> :
        queryData.length > 0 ?
        <PesananCard screen='brand' name={queryData[0].data.name} price={0} location= {queryData[0].data.city} type= {queryData[0].data.category} imagelink= {queryData[0].data.imageURL} handleSecButton={deleteBrand} handleSecButton2={() =>(navigation.push("EditBrand", {type:"Update", category: route.params.title}))} buttonPressHandler={() => {navigation.push('ProductCategory', {title:propsProduct, refID:queryData[0].id, refName:queryData[0].data.name})}}></PesananCard>
        :<View style={{flex: 1, paddingTop:200}}><Text style={[styles.TextAlert, {marginHorizontal:"auto"}]}>You don't have brand</Text><TouchableOpacity onPress={() => {navigation.push("EditBrand", {type:"Create", category: route.params.title})}}><Text style={[styles.TextAlert, {marginHorizontal:"auto", color: COLORS.primaryRedHex, textDecorationLine:"underline"}]}>Create One!</Text></TouchableOpacity></View>
        }
        </View>
  )
}

export default BrandCategory

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
    TextAlert: {
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryBlackHex,
    },
    line: {
        marginVertical:SPACING.space_8,
        borderColor: '#A19C9C',
        borderWidth: 0.3,
        width: '100%',
      }
})