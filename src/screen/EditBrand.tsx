import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY, BORDERRADIUS } from '../theme/theme'
import BackButton from '../components/BackButton'
import CategoryBrandCard from '../components/CategoryBrandCard'
import InputText from '../components/InputText'
import AppButton from '../components/AppButton'

const EditBrand = ({navigation,route}:any) => {
    const [data, setData] = useState({name: "", address: "", city: "", description:""})
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
            <Text style={[styles.TextParagraph, {marginBottom:4}]}>{route.params.type == "Create" ? "Create and grow your brand creatively" : "Customize and grow your brand creatively"}</Text>
            
            {/* <Pressable style={{marginRight:12}}>
                <Ionicons name="add-circle" size={22} color="black" />
            </Pressable> */}
        </View>
        <View style={styles.line}/>
        <View>
            <InputText label='Name' value={data.name} placeholder='input your brand name' changeHandler={(input:string) => {setData({...data, name: input})}}/>
            <View style={styles.TextInputComponent}>
                <Text style={styles.TextLabel}>Address</Text>
                <TextInput
                    multiline={true}
                    style={[styles.TextInputContainer,{borderColor:COLORS.primaryLightGreyHex, lineHeight:20}]}
                    onChangeText={(input:string) => {setData({...data, address: input})}}
                    value={data.address}
                    placeholder='input your brand address'
                />
            </View>
            <InputText label='City' value={data.city} placeholder='input your brand city' changeHandler={(input:string) => {setData({...data, city: input})}}/>
            <View style={styles.TextInputComponent}>
                <Text style={styles.TextLabel}>Description</Text>
                <TextInput
                    multiline={true}
                    style={[styles.TextInputContainer,{borderColor:COLORS.primaryLightGreyHex}]}
                    onChangeText={(input:string) => {setData({...data, description: input})}}
                    value={data.description}
                    placeholder='input your brand description'
                />
            </View>
            <View style={{marginTop:SPACING.space_24}}>
                <AppButton title={route.params.type=="Create" ? "Create"  : "Update"} backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={() => {}}/>
            </View>
        </View>
      </View>
  )
}

export default EditBrand

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