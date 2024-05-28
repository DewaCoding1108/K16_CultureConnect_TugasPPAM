import firebase,{ initializeApp } from 'firebase/app';
import { getAuth, initializeAuth , getReactNativePersistence} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/firestore' 


// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// import { getAnalytics } from "firebase/analytics";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAzpY27OjOiDYF_p9DyvGKduQQIV-orTak",
  authDomain: "culture-connect-a7f81.firebaseapp.com",
  projectId: "culture-connect-a7f81",
  storageBucket: "culture-connect-a7f81.appspot.com",
  messagingSenderId: "1062388381645",
  appId: "1:1062388381645:web:6702353767f63c3553f684",
  measurementId: "G-JQZG0L05S1"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const auth = getAuth(app);
const firestore = getFirestore(app);

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export { firestore, auth};

// export {auth};
// const analytics = getAnalytics(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
