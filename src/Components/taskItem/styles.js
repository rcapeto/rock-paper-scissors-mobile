import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
   taskContainer: {
      backgroundColor: 'white',
      marginVertical: 7,
      padding: 10,
      borderRadius: 8
   },
   headerTask: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 5
   },
   text: {
      fontSize: 17,
      textTransform: 'uppercase',
      fontFamily: 'Poppins_400Regular',
      textAlign: 'center'
   }
});

export default styles;