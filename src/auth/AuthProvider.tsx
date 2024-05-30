import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
// import auth,{ FirebaseAuthTypes } from '@react-native-firebase/auth';
import { auth, firestore } from '../../firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'; 
import { collection, getDoc, addDoc, getDocs, updateDoc, deleteDoc, doc, DocumentData, QuerySnapshot } from 'firebase/firestore'
// import firestore from '@react-native-firebase/firestore'

interface AuthContextProps {
  user: User | null;
  profile:any;
  initializing: boolean;
  role:string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setInitializing(true);
      if(user){
        try{
          // const userRef = collection(firestore,'Users');
          const userDoc = await getDoc(doc(firestore, 'Users', user.uid));
          if(userDoc.exists()){
            setUser({...user, ...userDoc.data()});
            setRole(userDoc.data()?.role);
            setProfile({id:user.uid, data:userDoc.data()})
          }
          else{
            setUser(user);
          }
        }
        catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
      else{
        setUser(null);
      }
      setInitializing(false);

      // setUser(user);
      // setInitializing(false);
      // setProfile({id: user?.uid, name: user?.displayName, email: user?.email})
      // if (user) {
      //   try {
      //     const userRef = collection(firestore,'Users');
      //     const userDoc = await getDocs();
      //     // const userDoc = await firestore().collection('Users').doc(user.uid).get();
      //     if (userDoc.exists) {
      //       setUser({ ...user, ...userDoc.data() } as FirebaseAuthTypes.User);
      //       setRole(userDoc.data()?.role);
      //       setProfile({id: user.uid, data:userDoc.data()})
      //     } else {
      //       setUser(user);
      //     }
      //   } catch (error) {
      //     console.error("Error fetching user data: ", error);
      //   }
      // } else {
      //   setUser(null);
      // }
      // setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, initializing, role, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};