import { Button, Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import PesananCard from '../components/PesananCard';
import { StatusBar } from "expo-status-bar";
import ChartButton from '../components/ChartButton';
import { COLORS, SPACING,FONTSIZE,FONTFAMILY } from '../theme/theme';
import BackButton from '../components/BackButton';
import AppButton from '../components/AppButton';
import CircleDotButton from '../components/CircleButton';
import { useAuth } from '../auth/AuthProvider';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import Revenue from './Revenue';

const PaymentMethodScreen = ({navigation, route}: any) => {
    const {Chart = [], fromChart,Totalprice } = route.params || {};
    console.log("IniChart",Chart);
    console.log("Fromchart",fromChart)
    const [selectedOption, setSelectedOption] = useState<string | null>(null);  
    let imageURL1, imageURL3, imageURL2: any;
    imageURL1 = "https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2Fpaymentmethod%2Fcard.png?alt=media&token=0fb1ab8c-f6d8-44d6-9eea-f1654b2af008";
    imageURL2 = "https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2Fpaymentmethod%2Fpaypal.png?alt=media&token=613e58a1-9001-4288-863f-e57c25959e9b";
    imageURL3 = "https://firebasestorage.googleapis.com/v0/b/culture-connect-a7f81.appspot.com/o/Images%2Fpaymentmethod%2Fsymbols.png?alt=media&token=83690b77-4f3d-4a2f-9f1b-161e206ec59f";
    const {profile} = useAuth();
    const uid = profile.id;
    
    const HandlerToHistory = async()=>{
    
        if(selectedOption !== null){
            try {
                const userDocRef = doc(firestore, "Users", uid);
                // const chartDocRef = doc(collection(userDocRef, "Chart"));
                // console.log("chartdocref",chartDocRef);
                const chartCollectionRef = collection(userDocRef, "Chart");
                console.log("Coba:",chartCollectionRef)
                
                const historyCollectionRef = collection(userDocRef, "History");
                console.log("Coba2:",historyCollectionRef)

                if (fromChart) {
                    // Ambil dokumen dari subkoleksi Chart
                    const chartSnapshot = await getDocs(chartCollectionRef);
                    console.log("charts",chartSnapshot.docs);
                    try{
                        console.log('tes')
                    for (const chartDoc of chartSnapshot.docs) {
                        console.log('tes1')
                        const q = query(collection(firestore, "Users"));
                        const querySnapshot = await getDocs(q);
                        const search = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
                        const searchResults = search.filter(doc => doc.id === uid);
        
                        if (searchResults.length === 0) {
                          throw new Error(`User with uid ${uid} not found`);
                        }
        
                        // const userDocRef = doc(firestore, "Users", uid);
        
                        // Dapatkan dokumen dari subkoleksi Chart
                        const chartCollectionRef = collection(userDocRef, "Chart");
                        const chartSnapshot = await getDocs(chartCollectionRef);
                        console.log("chartsnapshot",chartSnapshot);
                        const chartMap = chartSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
        
                        // Proses setiap dokumen dalam subkoleksi Chart
                        for (const chartDoc of chartMap) {
                          const chartData = chartDoc.data;
                          console.log("Cta",chartDoc.data.name)
                          console.log("id",chartDoc.id)
        
                          // Tambahkan dokumen ke subkoleksi History
                          const historyDocRef = doc(collection(userDocRef, "History"));
                          console.log("sebelumhistory")
                          console.log(chartDoc)
                          await setDoc(historyDocRef, {
                            name:chartDoc.data.name, price: chartDoc.data.price, detail: chartDoc.data.detail, category:chartDoc.data.category, tokoKaryaID:chartDoc.data.tokokaryaID, imageURL:chartDoc.data.imageURL});
                            console.log("seblemsaa");
                          // Hapus dokumen dari subkoleksi Chart
                          const tokoSewa = doc(firestore, "Toko Karya", chartDoc.data.tokokaryaID);
                            const tokoSewaDoc = await getDoc(tokoSewa);
                            const tokoSewaa= tokoSewaDoc.data();
                            const pemilik = doc(firestore, "Users", tokoSewaa?.userID);
                            const pemilikDoc = await getDoc(pemilik);
                            const pemilikk = pemilikDoc.data();
                            let pemilikrevenue = pemilikk?.revenue;
                            let soldcount = pemilikk?.soldcount;
                            pemilikrevenue += (0.9*chartDoc.data.price);
                            await updateDoc(pemilik,{
                                revenue: pemilikrevenue,
                                soldcount:soldcount+1
                            });
                          await deleteDoc(doc(chartCollectionRef, chartDoc.id));

                          console.log("setelah ele");
                        }
                    }}
                    catch(error){
                        console.log("erro :",error);
                    }

                    console.log("Data berhasil dipindahkan dari Chart ke History untuk user:", uid);
                } else {
                    for (const item of Chart) {
                        // Tambahkan item dari Chart prop ke subkoleksi History
                        const historyDocRef = doc(historyCollectionRef);
                        console.log(item);
                        await setDoc(historyDocRef, item.data);
                        console.log("1");
                        console.log(item);
                        if(item.data.category === "Seni"){
                            const seni = doc(firestore, "Seni", item.id);
                            const seniDoc = await getDoc(seni);
                            const Sanggar1= seniDoc.data();

                            const sanggar = doc(firestore, "Sanggar", Sanggar1?.sanggarID);
                            const sanggarDoc = await getDoc(sanggar);
                            const sanggarr= sanggarDoc.data();
                            const pemilik = doc(firestore, "Users", sanggarr?.userID);
                            const pemilikDoc = await getDoc(pemilik);
                            const pemilikk = pemilikDoc.data();
                            let pemilikrevenue = pemilikk?.revenue;
                            let soldcount = pemilikk?.soldcount;
                            pemilikrevenue += (0.9*item.data.price);
                            await updateDoc(pemilik,{
                                revenue: pemilikrevenue,
                                soldcount:soldcount+1
                            });
                        } else if(item.data.category === "Jasa Seni"){
                            const jasaSeni = doc(firestore, "Jasa Seni", item.id);
                            const jasaSeniDoc = await getDoc(jasaSeni);
                            const seniman1= jasaSeniDoc.data();

                            const seniman = doc(firestore, "Seniman", seniman1?.senimanID);
                            const senimanDoc = await getDoc(seniman);
                            const senimann= senimanDoc.data();
                            const pemilik = doc(firestore, "Users", senimann?.userID);
                            const pemilikDoc = await getDoc(pemilik);
                            const pemilikk = pemilikDoc.data();
                            let pemilikrevenue = pemilikk?.revenue;
                            let soldcount = pemilikk?.soldcount;
                            pemilikrevenue += (0.9*item.data.price);
                            await updateDoc(pemilik,{
                                revenue: pemilikrevenue,
                                soldcount:soldcount+1
                            });
                        } else if(item.data.category === "Sewa Pakaian"){
                            const sewaPakaian = doc(firestore, "Sewa Pakaian", item.id);
                            const sewaPakaianDoc = await getDoc(sewaPakaian);
                            const sewaPakaian1= sewaPakaianDoc.data();

                            const tokoSewa = doc(firestore, "Toko Sewa", sewaPakaian1?.tokosewaID);
                            const tokoSewaDoc = await getDoc(tokoSewa);
                            const tokoSewaa= tokoSewaDoc.data();
                            const pemilik = doc(firestore, "Users", tokoSewaa?.userID);
                            const pemilikDoc = await getDoc(pemilik);
                            const pemilikk = pemilikDoc.data();
                            let pemilikrevenue = pemilikk?.revenue;
                            let soldcount = pemilikk?.soldcount;
                            pemilikrevenue += (0.9*item.data.price);
                            await updateDoc(pemilik,{
                                revenue: pemilikrevenue,
                                soldcount:soldcount+1
                            });
                        } else if(item.data.category === "Karya Seni"){
                            console.log("karya seni")
                            const sewaPakaian = doc(firestore, "Karya Seni", item.id);
                            const sewaPakaianDoc = await getDoc(sewaPakaian);
                            const sewaPakaian1= sewaPakaianDoc.data();
                            console.log(sewaPakaian)
                            console.log(sewaPakaianDoc)
                            console.log(sewaPakaian1)

                            const tokoSewa = doc(firestore, "Toko Karya", sewaPakaian1?.tokokaryaID);
                            const tokoSewaDoc = await getDoc(tokoSewa);
                            const tokoSewaa= tokoSewaDoc.data();
                            const pemilik = doc(firestore, "Users", tokoSewaa?.userID);
                            const pemilikDoc = await getDoc(pemilik);
                            const pemilikk = pemilikDoc.data();
                            let pemilikrevenue = pemilikk?.revenue;
                            let soldcount = pemilikk?.soldcount;
                            pemilikrevenue += (0.9*item.data.price);
                            await updateDoc(pemilik,{
                                revenue: pemilikrevenue,
                                soldcount:soldcount+1
                            });
                    }
                }

                    console.log("Data dari Chart prop berhasil dimasukkan ke History untuk user:", uid);
                }

                alert("Pembayaran berhasil");
                navigation.push('Tab');
            } catch (error) {
                console.error("Error moving documents from Chart to History:", error);
            }
        } else{
            alert("Pilih metode pembayaran");
        }
        
    }

    return (
        <View style={styles.ScreenContainer}>
            <HeaderBar title="Payment Details" description="Bayar dengan mudah dan aman! Cek kembali detail pembayaran Anda" />
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.Border}>
                <View style={styles.Container}>
                    <View style={styles.Container2}>
                        <ImageBackground
                            source={{ uri: imageURL1 }}
                            style={styles.Image}
                        />
                        <Text style={styles.Text}>Master Card</Text>
                    </View>
                    <View  >
                        <CircleDotButton
                            key={1}
                            selected={selectedOption === "1"}
                            onPress={() => setSelectedOption("1")}
                        />
                    </View>
                </View>
                <View style={styles.Container}>
                    <View style={styles.Container2}>
                        <ImageBackground
                            source={{ uri: imageURL2 }}
                            style={styles.Image1}
                        />
                        <View style={styles.ViewSpace}></View>
                        <Text style={styles.Text}>Paypal</Text>
                    </View>
                    <View  >
                        <CircleDotButton
                            key={2}
                            selected={selectedOption === "2"}
                            onPress={() => setSelectedOption("2")}
                        />
                    </View>
                </View>
                <View style={styles.Container}>
                    <View style={styles.Container2}>
                        <ImageBackground
                            source={{ uri: imageURL3 }}
                            style={styles.Image}
                        />
                        <Text style={styles.Text}>Visa</Text>
                    </View>
                    <View  >
                        <CircleDotButton
                            key={3}
                            selected={selectedOption === "3"}
                            onPress={() => setSelectedOption("3")}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.ButtonContainer}>
                <AppButton title="Bayar" backgroundColor={COLORS.primaryRedHex} textColor={COLORS.primaryWhiteHex} onPress={HandlerToHistory} buttonStyle={{ width:0.9*tableWidth, marginTop: 20, borderRadius: 30 }} />
                <Text style={styles.Text}>Pastikan metode pembayaran anda benar</Text>
                <View style={styles.Box} />
            </View>
        </View>
    );
};

export default PaymentMethodScreen;

const tableWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    Container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    Container2: {
        flexDirection: "row",
    },
    Border: {
        width: 0.9 * tableWidth,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: "#A19C9C",
        alignSelf: "center",
        padding: SPACING.space_30,
    },
    Image: {
        height: 60,
        width: 60,
    },
    Image1: {
        height: 40,
        width: 40,
    },
    ButtonContainer: {
        width: tableWidth,
        bottom: 0,
        position: "absolute",
        backgroundColor: COLORS.primaryWhiteHex,
        elevation: 5,
        shadowColor: COLORS.primaryBlackHex,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1,
        },
        borderRadius: 15,
        alignItems:"center",
    },
    Text: {
        alignSelf: "center",
        fontSize: FONTSIZE.size_14,
        fontFamily: FONTFAMILY.poppins_medium,
        marginLeft: 20,
    },
    Box: {
        height: 40,
    },
    ViewSpace:{
        width:20,
    }
});
