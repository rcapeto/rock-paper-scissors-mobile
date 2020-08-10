import React, { useState, useContext } from 'react';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { View, Text, ScrollView, KeyboardAvoidingView, Keyboard , TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../context';

import styles from './styles';

export default function Register() {
   const [dontShowPassword, setDontShowPassword] = useState(true);
   const [message, setMessage] = useState('');
   const { register, loadingAuth } = useContext(AuthContext);
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [verifyPassword, setVerifyPassword] = useState('');

   function toggleShowPassword() {
      setDontShowPassword(!dontShowPassword);
   }

   function handleRegister() {
      setMessage('');

      Keyboard.dismiss();

      if(name !== '' && email !== '' && password !== '' && verifyPassword !== '') {
         if(password === verifyPassword) {
            register(name, email, password)
            .catch(err => {
               if(err) {
                  setMessage('Ops! Por favor, tente novamente.');
               }
            });
         } else {
            setMessage('Por favor digite digite senhas identicas');
         }
      } else {
         setMessage('Por favor preencha todos os campos');
      }
   }

   return(
      <ScrollView style={styles.container}>

         <KeyboardAvoidingView  style={styles.form}>
            {
               message !== '' && <Text style={styles.message}>{message}</Text>
            }
            <View style={styles.areaInput}>
               <Text style={styles.label}>Nome</Text>
               <TextInput 
                  placeholder="Seu nome"
                  placeholderTextColor="#9c98a6"
                  style={styles.input} 
                  value={name}
                  onChangeText={text => setName(text)}
               />
            </View>
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
               <Text style={styles.label}>Senha {'  '}
                  <Text style={styles.info}>(No mínimo 6 caractéres)</Text>
               </Text>
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

            <View style={styles.areaInput}>
               <Text style={styles.label}>Confirmar senha</Text>
               <TextInput 
                  secureTextEntry={dontShowPassword}
                  placeholderTextColor="#9c98a6"
                  autoCorrect={false}
                  style={styles.input} 
                  value={verifyPassword}
                  placeholder="Digite a mesma senha"
                  onChangeText={text => setVerifyPassword(text)}
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
                  onPress={handleRegister}
               >
                  {
                     loadingAuth 
                     ? <ActivityIndicator size={30} color="white"/> 
                     : <Text style={styles.buttonText}>Criar Conta</Text>
                  }
                  
               </RectButton>
            </View>
         </KeyboardAvoidingView>
 
      </ScrollView>
   );
}