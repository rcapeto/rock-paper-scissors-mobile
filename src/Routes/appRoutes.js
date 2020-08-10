import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Game from '../Pages/Game';
import Tasks from '../Pages/Tasks';
import Profile from '../Pages/Profile';


const { Navigator, Screen } = createBottomTabNavigator();

export default function AppRoutes() {
   return(
      <Navigator
         tabBarOptions={{
           style: {
               elevation: 0,
               shadowOpacity: 0,
               height: Platform.OS === 'ios'?  90 : 60,
           },
           tabStyle: {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
           },
           iconStyle: {
              flex: 0,
              width: 20,
              height: 20,
           },
           labelStyle: {
              fontFamily: 'Archivo_700Bold',
              fontSize: 13,
              marginLeft: 16,
           },
            inactiveBackgroundColor: '#fafafc',
            activeBackgroundColor: '#ebebf5',
            inactiveTintColor: '#c1bccc',
            activeTintColor: '#32264d'
         }}
      >
         <Screen name="Game" component={Game}
            options={{
               tabBarLabel:'Jogo',
               tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons 
                     name="ios-play"
                     size={size}
                     color={focused ? '#8257e5' : color}
                  />
               )
            }}
         />
         <Screen name="Tasks" component={Tasks}
            options={{
               tabBarLabel:'Tarefas',
               tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons 
                     name="ios-list"
                     size={size}
                     color={focused ? '#8257e5' : color}
                  />
               )
            }}
         />

         <Screen name="Profile" component={Profile}
            options={{
               tabBarLabel:'Perfil',
               tabBarIcon: ({ color, size, focused }) => (
                  <FontAwesome 
                     name="user"
                     size={size}
                     color={focused ? '#8257e5' : color}
                  />
               )
            }}
         />
      </Navigator>
   );
}