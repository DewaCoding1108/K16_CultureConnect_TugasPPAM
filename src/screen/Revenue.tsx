import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY } from '../theme/theme'
import BackButton from '../components/BackButton'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '../auth/AuthProvider'
import { collection, doc, getDocs, query } from 'firebase/firestore'
import { firestore } from '../../firebaseConfig'

const Revenue = ({navigation,route}:any) => {
  const { user, initializing, role, profile} = useAuth();
  const [revenue, setRevenue] = useState<number>();
  const uid = profile.id;
  console.log(profile);

  const formatedPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, 
    }).format(price);
};

  return (
    <ScrollView contentContainerStyle={{
        flex: 1,
        flexDirection:'column',
        justifyContent:'flex-start',
        paddingTop:50,
        paddingHorizontal:SPACING.space_20,
        backgroundColor:COLORS.primaryWhiteHex}}
      >
        <BackButton pressHandler={()=>{navigation.goBack()}}/>
        <Text style={[styles.TextHeader,{marginTop:16}]}>{"Hello " + profile?.data.name}</Text>
        <Text style={[styles.TextParagraph, {marginBottom:4}]}>Look at your analytics</Text>
        <View style={styles.line}/>
        <View style={styles.analyticsContainer}>
            <Text style={styles.analyticsHeader}>Analytics</Text>
            <View style= {{flexDirection:"row", justifyContent:"space-between", gap:20}}>
                <View style={styles.analyticsSubContainer}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={[styles.analyticsSubHeader, {width:"60%"}]}>Revenue</Text>
                        <MaterialIcons name='attach-money' size={24} color="black" />
                    </View>
                    <Text style={[styles.analyticsSubHeader, {marginTop:6}]}>{formatedPrice(profile.data.revenue)}</Text>
                </View>
                <View style={styles.analyticsSubContainer}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={[styles.analyticsSubHeader, {width:"60%"}]}>Monthly Click</Text>
                        <MaterialIcons name='people-outline' size={24} color="black" />
                    </View>
                    <Text style={[styles.analyticsSubHeader, {marginTop:6}]}>{profile.data.liked}</Text>
                </View>
            </View>
        </View>
        {/* <View style={styles.analyticsContainer}>
            <Text style={styles.analyticsHeader}>Yearly Analytics</Text>
            <View style= {{flexDirection:"row", justifyContent:"space-between", gap:20}}>
                <View style={styles.analyticsSubContainer}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={[styles.analyticsSubHeader, {width:"60%"}]}>Yearly Revenue</Text>
                        <MaterialIcons name='attach-money' size={24} color="black" />
                    </View>
                    <Text style={[styles.analyticsSubHeader, {marginTop:6}]}>Rp 1.540.000,00</Text>
                </View>
                <View style={styles.analyticsSubContainer}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={[styles.analyticsSubHeader, {width:"60%"}]}>Yearly Click</Text>
                        <MaterialIcons name='people-outline' size={24} color="black" />
                    </View>
                    <Text style={[styles.analyticsSubHeader, {marginTop:6}]}>6969</Text>
                </View>
            </View>
        </View> */}
      </ScrollView>
  )
}

export default Revenue

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
    analyticsContainer: {
        borderRadius: 20,
        padding: 16,
        backgroundColor:COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_12,
        marginTop:SPACING.space_12,
        elevation:12,
        shadowColor: COLORS.primaryBlackHex,
        shadowOpacity: 0.2,
        shadowRadius: 9,
        shadowOffset: {
        height: 2,
        width: 2
        },
    },

    analyticsHeader: {
        fontFamily: "Poppins-Regular",
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
        marginBottom: 6
    },

    analyticsSubContainer: {
        flex: 1,
        borderRadius: 20,
        padding: 12,
        backgroundColor:COLORS.primaryWhiteHex,
        elevation:12,
        shadowColor: COLORS.primaryBlackHex,
        shadowOpacity: 0.2,
        shadowRadius: 9,
        shadowOffset: {
        height: 2,
        width: 2
        },
    },
    analyticsSubHeader: {
        fontFamily: "Poppins-Light",
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryBlackHex,
    },
});