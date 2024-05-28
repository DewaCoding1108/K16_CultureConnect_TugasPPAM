import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import auth,{ FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  profile:any;
  initializing: boolean;
  role:string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await firestore().collection('Users').doc(user.uid).get();
          if (userDoc.exists) {
            setUser({ ...user, ...userDoc.data() } as FirebaseAuthTypes.User);
            setRole(userDoc.data()?.role);
            setProfile({id: user.uid, data:userDoc.data()})
          } else {
            setUser(user);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
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