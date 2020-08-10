import { StyleSheet, Platform } from 'react-native';
import colors from '../../globalStyle';

const styles = StyleSheet.create({
   container: {
         backgroundColor: colors.background,
         flex: 1,
         position: 'relative'

   },
   headerTask: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingTop: 30,
      minHeight: 120
   },
   header: {
      marginTop: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
   },
   title: {
      fontFamily: 'Archivo_700Bold',
      fontSize: 22,
      color: 'white'
   },
   input: {
      backgroundColor: colors.inputBackground,
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: colors.textBaseColor,
      marginVertical: 10,
      width: '80%',
      padding: 10,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
   },
   inputDisplay: {
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10
   },
   buttonCheck: {
      backgroundColor: colors.secondary,
      padding: Platform.OS === 'ios' ? 7.4 : 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
   },
   viewEdit: {
      justifyContent: 'center',
      alignItems: 'center'
   },
   cancelEdit: {
      color: colors.red,
      fontSize: 16,
      marginBottom: 20,
      fontFamily: 'Poppins_400Regular'
   },
   message: {
      color: colors.red,
      fontSize: 16,
      marginBottom: 20,
      marginTop: -20,
      fontFamily: 'Poppins_400Regular'
   },
   list: {
      paddingHorizontal: 35,
      marginTop: -20,
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
});

export default styles;