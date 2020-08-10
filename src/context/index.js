import React, { createContext, useState, useEffect } from 'react';

import firebase from '../Connections/firebase';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

export default function AuthRouteContext({ children }) {
   const [user, setUser] = useState(false);
   const [loading, setLoading] = useState(false);
   const [loadingAuth, setLoadingAuth] = useState(false);
   const [loadingAtt, setLoadingAtt] = useState(false);

   useEffect(async () => {
      setLoading(true);
      const data = await AsyncStorage.getItem('auth_user');

      if(data) {
         setUser(JSON.parse(data));
         setLoading(false);
      }

      setTimeout(() => {
         setLoading(false);
      }, 1000);

   }, []);

   function login(email, password) {
      setLoadingAuth(true);

      return new Promise((resolve, reject) => {
         firebase.auth().signInWithEmailAndPassword(email, password).then(value => {
            const uid = value.user.uid;
      
            firebase.firestore().collection('users').doc(uid).get().then(user => {
               const data = {
                  name: user.data().name,
                  email: user.data().email,
                  uid: uid,
                  image: user.data().image,
               }
               
               setLoadingAuth(false);
               setUser(data);
               setUserInStorage(data);
               resolve();

            });
         }).catch(err => {
            reject(err);
            setLoadingAuth(false);
         });
      });
   }

   function register(name, email, password) {

      return new Promise(async (resolve, reject) => {
         const value = await firebase.auth().createUserWithEmailAndPassword(email, password);
      
         const uid = value.user.uid;
   
         firebase.firestore().collection('users').doc(uid).set({
            name,
            email: value.user.email,
            image: '',
         }).then(() => {
   
            const data = {
               name,
               uid,
               email: value.user.email,
            }
   
            setUser(data);
            setUserInStorage(data);
            resolve();

         }).catch(err => {
            reject(err);
         });
      });

   }

   function signOut() {
      firebase.auth().signOut().then(() => {
         clearStorage();
      });
   }

   async function setUserInStorage(user) {
      await AsyncStorage.setItem('auth_user', JSON.stringify(user));
   }

   async function clearStorage() {
      await AsyncStorage.clear().then(() => {
         setUser(null);
      });
   }

   async function editProfile(name, image) {
      setLoadingAtt(true);

      return new Promise(async (resolve, reject) => {
         await firebase.firestore().collection('users').doc(user.uid)
         .set({
            image,
            name,
         }, { merge: true }).then(() => {
            setUser({ image, name, uid: user.uid});

            resolve();

            setLoadingAtt(false);
         }).catch(() => reject());
      });
   }

   return(
      <AuthContext.Provider value={{
         signed: !!user, user, loading, 
         register, login, loadingAuth,
          register, signOut, editProfile, loadingAtt
      }}>
         {children}
      </AuthContext.Provider>
   );
}