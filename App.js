import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/Routes';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import AuthRouteContext from './src/context';

import { AppLoading } from 'expo';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts, Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo';
import { YellowBox } from 'react-native';

console.disableYellowBox = true;

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular, 
    Poppins_700Bold,
    Archivo_400Regular, 
    Archivo_700Bold
  });

  if(!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <AuthRouteContext>
          <StatusBar style="light"/>
          <Routes />
        </AuthRouteContext>
      </NavigationContainer>
    );
  }
}

