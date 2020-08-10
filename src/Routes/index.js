import React, { useContext } from 'react';
import { AuthContext } from '../context';
import { ActivityIndicator, View, Text, Platform } from 'react-native';

import AuthRoutes from './authRoutes';
import AppRoutes from './appRoutes';


export default function Routes() {
   const { loading, signed } = useContext(AuthContext);


   if(loading) {
      return(
         <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#8257E5'
         
         }}>
            <ActivityIndicator 
               size={
                  Platform.OS === 'android' ? 100: 20
               }
               color="white"
            />
            <Text style={{
               fontFamily: 'Poppins_700Bold',
               color: 'white',
               paddingTop: 10,
               fontSize: 22
            }}>
               Carregando...
            </Text>
         </View>
      );
   }

   return(
      signed ? <AppRoutes /> : <AuthRoutes />
   );
}