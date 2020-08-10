import { StyleSheet } from 'react-native';
import colors from '../../globalStyle';

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   form: {
      backgroundColor: 'white',
      padding: 20,
      justifyContent: 'center',
      marginTop: 30,
      borderRadius: 8
   },
   areaInput: {
      marginBottom: 20,
      marginHorizontal: 3
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
   buttonView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4
   },
   button: {
      backgroundColor: colors.secondary,
      width: 150,
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center'
   },
   buttonText: {
      fontFamily: 'Archivo_700Bold',
      color: 'white',
      fontSize: 18
   },
   icon: {
      position: 'absolute',
      bottom: 20,
      right: 20
   },
   message: {
      color: colors.red,
      fontSize: 15,
      marginBottom: 15,
      fontFamily: 'Poppins_400Regular'
   },
   info: {
      fontSize: 13,
      color: colors.textColor,
   }
});

export default styles;