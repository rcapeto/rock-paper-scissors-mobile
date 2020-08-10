import { StyleSheet, Platform } from 'react-native';

import colors from '../../globalStyle';

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.background,
      flex: 1,
   },
   header: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      minHeight: 120,
      paddingTop: 40,
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',

   },
   imageAndName: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
   },
   avatar: {
      width: 60,
      height: 60,
      borderRadius: 30
   },
   name: {
      color: 'white',
      fontSize: 18,
      marginLeft: 10,
      fontFamily: 'Poppins_700Bold',
      paddingTop: 7,
   },
   button :{
      backgroundColor: colors.red,
      padding: 5,
      borderRadius: 20
   },
   info: {
      fontSize: 13,
      
   },
   label: {
      fontFamily: 'Poppins_700Bold',
      color: colors.titleColor,
      fontSize: 20
   },
   input: {
      backgroundColor: colors.inputBackground,
      padding: 15,
      fontSize: 17,
      fontFamily: 'Poppins_400Regular',
      color: colors.textBaseColor,
      marginVertical: 5,
      borderRadius: 8
   },
   inputBlock: {
      paddingTop: 20,
      paddingHorizontal: 20
   },
   textarea: {
      lineHeight: 30,
      minHeight: 155
   },

   buttonSave: {
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
      marginTop: 16,
      marginHorizontal: 20,
      borderRadius: 8
   },
   buttonSaveText: {
      fontFamily: 'Archivo_700Bold',
      color: 'white',
      fontSize: 18
   },
   footer: {
      backgroundColor: colors.primary,
      marginTop: Platform.OS === 'android' ? 33: 65,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10
   },
   footerTextInfo: {
      fontSize: 16,
      color: 'white',
      fontFamily: 'Archivo_700Bold',
   },
   version: {
      fontFamily: 'Poppins_400Regular',
      fontStyle: 'italic',
      fontSize: 13,
      color: 'white'
   },
   modal: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 3,
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
   },
   modalContent: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      width: '100%',
      height: 300,
      justifyContent: 'center',
      alignItems: 'center'
   },
   textModal: {
      color: colors.secondary,
      fontFamily: 'Poppins_700Bold',
      fontSize: 22,
      marginTop: 20
   },
   icon: {
     
   },
   buttonGetImage: {
      backgroundColor: colors.primary,
      paddingVertical: Platform.OS === 'android' ? 5: 3,
      paddingHorizontal: 10,
      marginLeft: 10,
      borderRadius: Platform.OS === 'android' ? 35: 15,
      position: 'absolute',
      top: 0,
      right: 140
   },
   selectImage: {
      width: 110,
      height: 110,
      borderRadius: 60,
   },
   imageBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: -5,
   },
   selectImageView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30,
      position: 'relative'
   }
   
});

export default styles;