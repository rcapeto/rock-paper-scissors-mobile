import { StyleSheet, Platform } from 'react-native';
import colors from '../../globalStyle';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.background
   },
   header: {
      backgroundColor: colors.primary,
      minHeight: 120,
      paddingVertical: 20,
      paddingHorizontal: 30,
   },
   textHeader: {
      fontFamily: 'Archivo_700Bold',
      color: 'white',
      fontSize: 22,
      marginTop: Platform.OS === 'android' ? 30 : 44
   },
   content: {
      backgroundColor: 'white',
      padding: 20,
      marginTop: 30,
      marginHorizontal: 20,
      borderRadius: 8,
      maxHeight: 520
   },
   options: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20
   }, 
   play: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
   },
   loading: {
      color: colors.textComplement,
      fontSize: 20,
      fontFamily: 'Poppins_400Regular'
   }, 
   button: {
      backgroundColor: colors.secondary,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 8
   },
   buttonText: {
      fontFamily: 'Archivo_700Bold',
      color: 'white',
      fontSize: 18
   },
   results: {
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   textResult: {
      color: colors.textComplement,
      fontSize: 18,
      fontFamily: 'Poppins_400Regular'
   },
   primaryColor: {
      color: colors.primary
   },
   score: {
      marginTop: 20,
      alignItems: 'baseline',
      justifyContent: 'center'
   },
   row: {
      fontSize: 16,
      fontFamily: 'Poppins_700Bold',
      padding: 10
   },
   scorePoints: {
      fontSize: 18,
   },
   lose: {
      color: colors.red
   },
   win: {
      color: colors.secondary,
   },
   draw: {
      color: colors.primary,
   },
   active: {
      color: colors.primaryDarker
   }
});

export default styles;