import React, { useContext, useState } from 'react';
import { View, Text, Image, TextInput, ScrollView, Keyboard, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { AuthContext } from '../../context';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import colors from '../../globalStyle';
import styles from './styles';

export default function Profile() {
   const { user, signOut, editProfile, loadingAtt } = useContext(AuthContext);
   const [name, setName] = useState(user.name);
   const [imageFromImagePicker, setImageFromImagePicker] = useState(null);
   const [showModalSuccess, setShowModalSucces] = useState(false);
   const [showModalError, setShowModalError] = useState(false);
   const [showModalInfo, setShowModalInfo] = useState(false);
   const [info, setInfo] = useState('');

   const noUserImage = 'https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png';


   function handleSignOut() {
      signOut();
   }

   function handleAttUserData() {
      Keyboard.dismiss();

      if(name !== '') {
         let image = '';

         if(user.image) {
            image = user.image;
         }

         if(imageFromImagePicker) {
            image = imageFromImagePicker;
         }
         
         editProfile(name, image).then(() => {
            setShowModalSucces(true);
            setImageFromImagePicker(null);
 
            setTimeout(() => {
               setShowModalSucces(false);
             
             }, 2000);

         }).catch(err => {
            
           setShowModalError(true);
           setImageFromImagePicker(null);

           setTimeout(() => {
            setShowModalError(false);
            
         }, 2000);
        });

      } else {
         setInfo('Queremos saber o seu nome :)');

         setShowModalInfo(true);

         setTimeout(() => {
            setShowModalInfo(false);
            
         }, 2000);
      }
   }

   async function getImageFromMidia() {
      try {
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
         });

         if(!result.cancelled) {
            setImageFromImagePicker(result.uri);
         }


      } catch(err) {
         console.log(err);
      }
   }

   return(
      <View style={styles.container}>

         {showModalSuccess && (
            <View style={styles.modal}>
               <View style={styles.modalContent}>
                  <FontAwesome name="check-circle" color={colors.secondary} size={70} />
                  <Text style={styles.textModal}>
                     Dados alterados com sucesso!
                  </Text>
               </View>
            </View>
         )}

         {showModalError && (
            <View style={styles.modal}>
               <View style={styles.modalContent}>
                  <FontAwesome name="exclamation-circle" color={colors.red} size={70} />
                  <Text style={[styles.textModal, {
                      color: colors.red,
                      textAlign: 'center'
                  }]}>
                     Ops! Algo deu errado, tente novamente!
                  </Text>
               </View>
            </View>
         )}

         {showModalInfo && (
            <View style={styles.modal}>
               <View style={styles.modalContent}>
                  <FontAwesome name="exclamation-circle" color={colors.red} size={70} />
                  <Text style={[styles.textModal, {
                     color: colors.red,
                     textAlign: 'center'
                  }]}>
                     {info}
                  </Text>
               </View>
            </View>
         )}


         <View style={styles.header}>
           <View style={styles.imageAndName}>
             
               <Image 
                  style={styles.avatar}
                  source={{ uri: user.image || noUserImage}}
               />
              
               <Text style={styles.name}>{user.name}</Text>
           </View>
            <RectButton style={styles.button}
               onPress={handleSignOut}
            >
               <Feather name="power" color="white" size={26}/>
            </RectButton>
         </View>

         <ScrollView styles={styles.formPerfil}>
            <View style={styles.inputBlock}>
               <Text style={styles.label}>Nome</Text>
               <TextInput 
                  placeholderTextColor="#6A6180"
                  style={styles.input}
                  value={name}
                  onChangeText={text => setName(text)}
               />
            </View>

            <View style={styles.inputBlock}>
               <Text style={styles.label}>Seu ID</Text>
               <Text style={styles.input}>
                  {user.uid}
               </Text>
            </View>

            <View style={[styles.inputBlock, styles.imageBlock]}>
               <Text style={styles.label}>Imagem</Text>
            </View>

            <View style={styles.selectImageView}>
               <Image 
                  style={styles.selectImage}
                  source={{ uri: imageFromImagePicker || noUserImage}}
               />

               <RectButton 
                  style={styles.buttonGetImage}
                  onPress={getImageFromMidia}
               >
                  <Ionicons 
                     name="ios-add"
                     color="white"
                     size={27}
                     style={styles.icon}
                  />
               </RectButton>
               
            </View>

            <RectButton style={styles.buttonSave}
               onPress={handleAttUserData}
            >
               { 
               loadingAtt ?
               <ActivityIndicator size={30} color="white"/>
               :
               <Text style={styles.buttonSaveText}>Salvar</Text>   
               }  
            </RectButton>           
         </ScrollView>
      </View>
   );
}