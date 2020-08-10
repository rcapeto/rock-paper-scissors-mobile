import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Pages/Login';
import Register from '../Pages/Register';
import colors from '../globalStyle';

const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {
   return(
      <Navigator screenOptions={{ headerShown: false }}>
         <Screen  name="Login" component={Login}/>
         <Screen name="Register" component={Register}
            options={{ 
               headerShown: true,
               headerTitle: '',
               headerTintColor: 'white',
               headerStyle: {
                  backgroundColor: colors.primary,
               } 
            }}
         />
      </Navigator>
   );
}