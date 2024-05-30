import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY, BORDERRADIUS } from '../theme/theme'
import BackButton from '../components/BackButton'
import CategoryBrandCard from '../components/CategoryBrandCard'
import InputText from '../components/InputText'
import AppButton from '../components/AppButton'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { auth, firestore } from '../../firebaseConfig'
import { useAuth } from '../auth/AuthProvider'

const EditProduct = ({navigation,route}:any) => {
    const { profile }:any = useAuth();
    const [data, setData] = useState({name: "", price: 0, detail: ""})

    useEffect(() => {
        const fillForm = async () => {
            let paramWhere = ""
            if(route.params.category === "Seni") {
                paramWhere = "sanggarID"
            } else if (route.params.category === "Jasa Seni") {
                paramWhere = "senimanID"
            } else if (route.params.category === "Sewa Pakaian") {
                paramWhere = "tokosewaID"
            }else if (route.params.category === "Karya Seni") {
                paramWhere = "tokokaryaID"
            }

            if (route.params.type === "Update") {
                const q = query(collection(firestore, route.params.category), where(paramWhere, '==', route.params.refID), where('name', '==', route.params.refProductName));
                const querySnapshot = await getDocs(q);
                const document = querySnapshot.docs[0]?.data();
                if (document) {
                    setData({
                        name: document.name,
                        price: document.price,
                        detail: document.detail,
                    });
                }
            }
        };

        fillForm();
    }, [route.params.type, route.params.category]);
  
    const SubmitHandler = async () => {
        if (data.name !== "" && data.price !== 0 && data.detail !== "") {
            if (route.params.type === "Create") {
                try {
                    if(route.params.category === "Seni") {
                        const docRef = await addDoc(collection(firestore, route.params.category), {...data, category: route.params.category, sanggarID:route.params.refID, sanggarName:route.params.refName, imageURL:"https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2FSanggar%2FSanggar-Sekar-Arum-Wirahma.png?alt=media&token=461ea155-c385-41bd-a257-1b8b72fb0ae6"});
                    } else if (route.params.category === "Jasa Seni") {
                        const docRef = await addDoc(collection(firestore, route.params.category), {...data, category: route.params.category, senimanID:route.params.refID, senimanName:route.params.refName, imageURL:"https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2FSanggar%2FSanggar-Sekar-Arum-Wirahma.png?alt=media&token=461ea155-c385-41bd-a257-1b8b72fb0ae6"});
                    } else if (route.params.category === "Sewa Pakaian") {
                        const docRef = await addDoc(collection(firestore, route.params.category), {...data, category: route.params.category, tokosewaID:route.params.refID, tokosewaName:route.params.refName, imageURL:"https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2FSanggar%2FSanggar-Sekar-Arum-Wirahma.png?alt=media&token=461ea155-c385-41bd-a257-1b8b72fb0ae6"});
                    }else if (route.params.category === "Karya Seni") {
                        const docRef = await addDoc(collection(firestore, route.params.category), {...data, category: route.params.category, tokokaryaID:route.params.refID, tokokaryaName:route.params.refName, imageURL:"https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2FSanggar%2FSanggar-Sekar-Arum-Wirahma.png?alt=media&token=461ea155-c385-41bd-a257-1b8b72fb0ae6"});
                    }
                        navigation.navigate('Brand')
                } catch (error) {
                    alert("Error!")
                }
            } else {
                try {
                let paramWhere = ""
                if(route.params.category === "Seni") {
                    paramWhere = "sanggarID"
                } else if (route.params.category === "Jasa Seni") {
                    paramWhere = "senimanID"
                } else if (route.params.category === "Sewa Pakaian") {
                    paramWhere = "tokosewaID"
                }else if (route.params.category === "Karya Seni") {
                    paramWhere = "tokokaryaID"
                }
                const q = query(collection(firestore, route.params.category), where(paramWhere, '==', route.params.refID), where('name', '==', route.params.refProductName));
                const querySnapshot = await getDocs(q);
                const matchingDoc = querySnapshot.docs[0];
                if (matchingDoc) {
                    const docRef = doc(firestore, route.params.category, matchingDoc.id)
                    await updateDoc(docRef, data);
                    navigation.navigate('Brand')
                }
            } catch (error) {
                alert("Error!")
                }
            }
        } else {
            alert("Lengkapi Data Input!!")
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
        <Text style={[styles.TextHeader,{marginTop:16}]}>{route.params.type == "Create" ? "Create your Brand" : "Edit your Brand"}</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <Text style={[styles.TextParagraph, {marginBottom:4}]}>{route.params.type == "Create" ? "Create and grow your product creatively" : "Customize and grow your product creatively"}</Text>
            
            {/* <Pressable style={{marginRight:12}}>
                <Ionicons name="add-circle" size={22} color="black" />
            </Pressable> */}
        </View>
        <View style={styles.line}/>
        <View>
            <InputText label='Name' value={data.name} placeholder='input your product name' changeHandler={(input:string) => {setData({...data, name: input})}}/>
            <InputText label='Price' value={data.price.toString()} placeholder='input your product price' changeHandler={(input:number) => {setData({...data, price: input})}}/>
            <View style={styles.TextInputComponent}>
                <Text style={styles.TextLabel}>Detail</Text>
                <TextInput
                    style={[styles.TextInputContainer,{borderColor:COLORS.primaryLightGreyHex}]}
                    onChangeText={(input:string) => {setData({...data, detail: input})}}
                    value={data.detail}
                    placeholder='input your product detail'
                />
            </View>
            <View style={{marginTop:SPACING.space_24}}>
                <AppButton title={route.params.type=="Create" ? "Create"  : "Update"} backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={SubmitHandler}/>
            </View>
        </View>
      </View>
  )
}

export default EditProduct

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
      },
      TextInputContainer: {
        borderColor:COLORS.primaryBlackHex,
        // backgroundColor:COLORS.primaryDarkGreyHex,
        fontFamily:'Poppins-Medium',
        borderWidth:1,
        fontSize:FONTSIZE.size_12,
        borderRadius:BORDERRADIUS.radius_4,
        padding:12
      },
      TextInputComponent:{
        marginBottom:SPACING.space_18,
      },
      TextLabel:{
        fontFamily:'Poppins-Light',
        fontSize:FONTSIZE.size_14,
        color:COLORS.primaryLightGreyHex,
        marginBottom:5,
      }
})