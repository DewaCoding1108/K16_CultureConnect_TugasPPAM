import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "../theme/theme";
import AppButton from "../components/AppButton";
import InputText from "../components/InputText";
import BackButton from "../components/BackButton";
// import auth from '@react-native-firebase/auth';
import { SignIn } from "../db/Authentication";
import { useAuth } from "../auth/AuthProvider";
import AppLoader from "../components/AppLoader";
// import { auth } from '../../firebaseConfig';
// import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const LoginScreen = ({ navigation }: any) => {
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { initializing } = useAuth();
  // const [userCredentials, setUserCredentials] = useState({});

  // useEffect(() => {
  //   const subscribe = auth.onAuthStateChanged(user => {
  //     if(user){
  //       navigation.navigate('Tab')
  //     }
  //   })
  //   return subscribe
  // }, [])

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
            <Text style={styles.TextHeader}>Login</Text>
            <Text style={styles.TextParagraph}>
              Fill the Information Below with the Correct Identity to Complete
              the Login Account
            </Text>
            <InputText
              label="Email"
              value={email}
              placeholder="input your email address"
              changeHandler={(email: string) => setEmail(email)}
            />
            <InputText
              label="Password"
              value={password}
              placeholder="input your password"
              changeHandler={(password: string) => setPassword(password)}
              secureTextEntry={true}
            />
            <Text
              onPress={() => {
                navigation.push("Register");
              }}
              style={{
                color: COLORS.primaryBlackHex,
                textAlign: "right",
                marginBottom: SPACING.space_24,
                fontFamily: "Poppins-Medium",
                fontSize: 14,
              }}
            >
              {" "}
              Forgot Password?
            </Text>
            <AppButton
              title="Login"
              backgroundColor={COLORS.primaryRedHex}
              textColor={COLORS.primaryWhiteHex}
              onPress={loginHandler}
            />
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text style={styles.TextParagraph}>
                Don't have an account?
                <Text
                  onPress={() => {
                    navigation.push("Register");
                  }}
                  style={{ color: COLORS.primaryRedHex }}
                >
                  {" "}
                  Create account
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      {initializing ? <AppLoader /> : null}
    </>
  );
};

export default LoginScreen;

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
});
