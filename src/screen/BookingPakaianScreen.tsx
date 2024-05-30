import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState, } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import AppButton from "../components/AppButton";
import InputText from "../components/InputText";
import BackButton from "../components/BackButton";
// import auth from '@react-native-firebase/auth';
import { SignIn } from "../db/Authentication";
import { useAuth } from "../auth/AuthProvider";
import AppLoader from "../components/AppLoader";
import CalendarInput from "../components/CalendarInput";
import moment from 'moment';
// import { auth } from '../../firebaseConfig';
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const BookingPakaianScreen = ({ navigation,route }: any) => {
  const {id, name, location, price, detail, tipe, tokosewaID, imageURL} = route.params
  // const [loading, setLoading] = useState(false);
  const [dateStart, setDateStart] = useState<Date | undefined>(new Date());
  const [dateStartString, setDateStartString] = useState("");
  const [showStart, setShowStart] = useState(false);
  const [dateEnd, setDateEnd] = useState<Date | undefined>(new Date());
  const [dateEndString, setDateEndString] = useState("");
  const [showEnd, setShowEnd] = useState(false);
  const [email, setEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [password, setPassword] = useState("");
  const { initializing } = useAuth();
  const [loading, setLoading] = useState(false);

  const dateDifference = (startDate:Date | undefined, endDate:Date | undefined) => {
    if(startDate == null || endDate == null){
      return 0;
    }
    const differenceMs = endDate.getTime() - startDate.getTime();
    if(differenceMs < 0){
      return 0;
    }
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    return differenceDays + 1;
  }

  const lamaTampil = dateDifference(dateStart,dateEnd);
  const onChangeStart = (date: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowStart(Platform.OS === 'ios');
    setDateStart(currentDate);
    setDateStartString(moment(currentDate).format('YYYY-MM-DD'));
  };

  const onChangeEnd = (date: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowEnd(Platform.OS === 'ios');
    setDateEnd(currentDate);
    setDateEndString(moment(currentDate).format('YYYY-MM-DD'));
  };

  const showDatePickerStart = () => {
    setShowStart(true);
  };

  const showDatePickerEnd = () => {
    setShowEnd(true);
  };

  const isNotEmpty = (x:string) => {
    return x !== '';
  }
  const formatedPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, 
    }).format(price);
  };
  const loginHandler = async () => {
    SignIn({ email, password });
  };
  return (
    <>
      <View style={styles.ScreenContainer}>
        <StatusBar translucent backgroundColor="transparent" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewFlex}
        >
          <View style={styles.FormContainer}>
            <BackButton
              pressHandler={() => {
                navigation.goBack();
              }}
            />
            <Text style={styles.TextHeader}>Booking Pakaian</Text>
            <Text style={styles.TextParagraph}>
              Fill the Information Below to Complete
              the Booking Process
            </Text>
            <CalendarInput show={showStart} label='Tanggal Mulai' date={dateStart} dateString={dateStartString} changeHandler={onChangeStart} pressHandler={showDatePickerStart}/>
            <CalendarInput show={showEnd} label='Tanggal Selesai' date={dateEnd} dateString={dateEndString} changeHandler={onChangeEnd} pressHandler={showDatePickerEnd}/>
            <InputText
              label="Lokasi"
              value={userLocation}
              placeholder="input your location"
              changeHandler={(location: string) => setUserLocation(location)}
            />
            { isNotEmpty(dateEndString) && isNotEmpty(dateStartString) && isNotEmpty(userLocation) &&
            <View style={styles.DetailContainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:SPACING.space_28, marginTop:SPACING.space_18}}>
                <View>
                  <Text style={[styles.TextParagraph]}>Tarif Sewa </Text>
                  <Text style={[styles.TextParagraph]}>Lama Sewa </Text>
                  <Text style={[styles.TextParagraph]}>Tax 10% </Text>
                  <Text style={[styles.TextParagraph]}>Total Biaya </Text>
                </View>
                <View style={{alignItems:'flex-end'}}>
                  <Text style={[styles.TextParagraph]}>{formatedPrice(price)}</Text>
                  <Text style={[styles.TextParagraph]}>{lamaTampil} Hari</Text>
                  <Text style={[styles.TextParagraph]}>{formatedPrice(0.1 * lamaTampil * price)}</Text>
                  <Text style={[styles.TextParagraph]}> {formatedPrice((0.1 * lamaTampil * price) + (lamaTampil * price))}</Text>
                </View>
              </View>  
            </View>
            }
          </View>
          <View style={{height:20}}></View>
        </ScrollView>
        <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                shadowColor: COLORS.primaryBlackHex,
              }}
            >
              <View style={styles.line} />
              <AppButton
                buttonStyle={{width:'90%'}}
                title="Booking"
                backgroundColor={COLORS.primaryRedHex}
                textColor={COLORS.primaryWhiteHex}
                onPress={()=>{navigation.push("PaymentDetails",{TotalPrice:price, Chart:[{"data":{"name":name,"price": price,"detail": detail,"category": tipe,"tokosewaID": tokosewaID,"imageURL": imageURL},'id':id }]})}}
              />
              <Text style={styles.TextParagraph}>Pastikan data sudah benar dan sesuai</Text>
            </View>
      </View>
      {initializing ? <AppLoader /> : null}
    </>
  );
};

export default BookingPakaianScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryWhiteHex,
  },
  FormContainer: {
    flex: 1,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    paddingLeft: SPACING.space_24,
    marginTop: 80,
    paddingRight: SPACING.space_15,
  },
  TextHeader: {
    marginTop: SPACING.space_32,
    fontFamily: "Poppins-Medium",
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryBlackHex,
    // marginBottom:SPACING.space_20,
  },
  TextParagraph: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryBlackHex,
    marginBottom: SPACING.space_18,
  },
  TextInputContainer: {
    borderColor: COLORS.primaryBlackHex,
    // backgroundColor:COLORS.primaryDarkGreyHex,
    fontFamily: "Poppins-Medium",
    borderWidth: 1,
    fontSize: FONTSIZE.size_12,
    borderRadius: BORDERRADIUS.radius_4,
    paddingTop: SPACING.space_10,
    paddingBottom: SPACING.space_12,
    paddingLeft: SPACING.space_12,
  },
  TextInputComponent: {
    paddingLeft: 6,
    marginBottom: SPACING.space_18,
  },
  TextLabel: {
    fontFamily: "Poppins-Light",
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
    marginBottom: 5,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  line: {
    marginBottom:SPACING.space_15,
    borderColor: "#A19C9C",
    borderWidth: 0.3,
    width: "100%",
  },
  DetailContainer:{
    // justifyContent:'center',
    // alignItems:'center',
    borderColor:COLORS.primaryLightGreyHex,
    borderWidth:0.4,
    marginTop:4,
    width:'100%',
    alignSelf:'center',
    borderRadius:BORDERRADIUS.radius_15,
    backgroundColor:COLORS.primaryWhiteHex,
    
  }
});
