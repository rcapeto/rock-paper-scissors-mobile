import React, { useState, useContext } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Text, Keyboard, View, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../context';

import styles from './styles';

export default function Login() {
   const [dontShowPassword, setDontShowPassword] = useState(true);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

   const { navigate } = useNavigation();
   const { loadingAuth, login } = useContext(AuthContext);

   function goToRegister() {
      navigate('Register');
   }

   function toggleShowPassword() {
      setDontShowPassword(!dontShowPassword);
   }

   function handleLogin() {
      setMessage('');

      Keyboard.dismiss();

      if(email !== '' && password !== '') {
         login(email, password).catch(err => {
            console.log(err.code);
            switch(err.code) {
               case 'auth/invalid-email':
                  setMessage('Por favor digite um e-mail válido');
                  setPassword('');
                  break;
               case 'auth/wrong-password':
                  setMessage('Senha inválida');
                  setPassword('');
                  break;
               case 'auth/user-not-found':
                  setPassword('');
                  setMessage('Usuário não existe, por favor cadastre-se');
                  break;
               default: 
                  setPassword('');
                  setMessage(`Error: ${err.code}`);
            }
         });
      } else {
         setMessage('Por favor preencha todos os campos');
      }
   }

   return(
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.title}>Jokempô</Text>
         </View>

         <KeyboardAvoidingView style={styles.form}>
            {
              message !== '' && (<Text style={styles.message}>{message}</Text>)
            }
            <View style={styles.areaInput}>
               <Text style={styles.label}>E-mail</Text>
               <TextInput 
                  autoCompleteType="email"
                  keyboardType="email-address"
                  placeholder="Seu e-mail"
                  placeholderTextColor="#9c98a6"
                  style={styles.input} 
                  value={email}
                  onChangeText={text => setEmail(text)}
               />
            </View>

            <View style={styles.areaInput}>
               <Text style={styles.label}>Senha</Text>
               <TextInput 
                  secureTextEntry={dontShowPassword}
                  placeholder="Sua senha"
                  placeholderTextColor="#9c98a6"
                  autoCorrect={false}
                  style={styles.input} 
                  value={password}
                  onChangeText={text => setPassword(text)}
               />
               <TouchableOpacity style={styles.icon}
                  onPress={toggleShowPassword}
               >
                  <Feather 
                     name={
                        dontShowPassword ? 'eye-off': 'eye'
                     }
                     size={24}
                     color="#6A6180"
                  />
               </TouchableOpacity>
            </View>

            <View style={styles.buttonView}>
               <RectButton style={styles.button}
                  onPress={handleLogin}
               >
                  {
                     loadingAuth 
                        ? <ActivityIndicator size={30} color="white"/>
                        : <Text style={styles.buttonText}>Entrar</Text>
                  }
               </RectButton>
            </View>

            
            <View style={styles.goToRegister}>
               <TouchableOpacity style={styles.buttonRegister}
                  onPress={goToRegister}
               >
                  <FontAwesome name="sign-in" size={22} color="#D4C2FF" />
                  <Text style={styles.registerText}>
                     Não possui um cadastro?
                  </Text>
               </TouchableOpacity>
            </View>
         </KeyboardAvoidingView>
      </View>
   );
}