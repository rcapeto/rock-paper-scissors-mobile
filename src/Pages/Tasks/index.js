import React, { useState, useContext, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import { AuthContext } from '../../context';
import firebase from '../../Connections/firebase';
import TaskItem from '../../Components/taskItem';
import colors from '../../globalStyle';
import styles from './styles';

export default function Tasks() {
   const [showModalCreateTask, setShowModalCreateTask] = useState(false);
   const [showCancelEdit, setCancelEditTask] = useState(false);
   const [taskTitle, setTaskTitle] = useState('');
   const [taskKey, setTaskKey] = useState('');
   const [tasks, setTasks] = useState([]);
   const [modalSuccessDelete, setModalSuccessDelete] = useState(false);
   const [modalSuccessAdd, setModalSuccessAdd] = useState(false);
   const [modalError, setModalError] = useState(false);
   const [modalEditSuccess, setModalEditSuccess] = useState(false);
   const [loading, setLoading] = useState(false);
   const { user } = useContext(AuthContext);
   const [message, setMessage] = useState('');

   useFocusEffect(() => {
     try {
         getTasks();

     } catch(err) {
        setModalError(true);

        setTimeout(() => {
         setModalError(false);   
        }, 2000);
     }
   });

   function openModalAddTask() {
      setShowModalCreateTask(!showModalCreateTask);
      setMessage('');
   }


   async function getTasks() {
      await firebase.firestore().collection('users').doc(user.uid)
      .collection('tasks').orderBy('timestamp').get()
      .then(tasks => {
         const allTasks = [];

         tasks.forEach(task => {
            allTasks.push(task.data());
         });
         
         setTasks(allTasks.reverse());
      });
   }

   function editTask(id, title) {
      setTaskKey(id);
      setTaskTitle(title);
      setCancelEditTask(true);
      setShowModalCreateTask(true);
   }

   async function addNewTask() {
      setMessage('');
      Keyboard.dismiss();
      setLoading(true);
      setShowModalCreateTask(false);

      if(taskKey !== '') {
         await firebase.firestore().collection('users').doc(user.uid)
            .collection('tasks').doc(taskKey).set({
               title: taskTitle
            }, { merge: true }).then(() => {
               setLoading(false);

               setModalEditSuccess(true);

               setTaskTitle('');

               setTaskKey('');

               setCancelEditTask(false);

               getTasks();

               setTimeout(() => {
                  setModalEditSuccess(false);
               }, 2000);
            }).catch(() => {
               setLoading(false);
               setModalError(true);
   
               setTimeout(() => {
                  setModalError(false);
                  
               }, 2000);
            });

         return;
      }

      if(taskTitle !== '') {

         await firebase.firestore().collection('users').doc(user.uid)
         .collection('tasks').add({
            title: taskTitle,
            timestamp: new Date(),
         }).then(async doc => {
            await doc.parent.doc(doc.id).set({
               id: doc.id,
            }, { merge: true }).then( async () => {
               setLoading(false);
               setModalSuccessAdd(true);

               setTimeout(() => {
                  setModalSuccessAdd(false);
                  setTaskTitle('');
                  getTasks();

               }, 2000);

            });

         }).catch(() => {
            setLoading(false);
            setModalError(true);

            setTimeout(() => {
               setModalError(false);
               
            }, 2000);
         });

      } else {
         setMessage('Por favor, escreva algum título');
      }
   }

   async function deleteTask(id) {
      setMessage('');

      await firebase.firestore().collection('users').doc(user.uid)
         .collection('tasks').doc(id).delete().then(() => {

            getTasks();

            setModalSuccessDelete(true);

            setTimeout(() => {
               setModalSuccessDelete(false);
            }, 2000);
      });
   }

   function handleCancelEdit() {
      setCancelEditTask(false);
      setTaskKey('');
      setTaskTitle('');
      setShowModalCreateTask(false);
   }


   
   return(
      <View style={styles.container}>

         {modalSuccessDelete && (
            <View style={styles.modal}>
               <View style={styles.modalContent}>
                  <FontAwesome name="check-circle" color={colors.secondary} size={70} />
                  <Text style={styles.textModal}>
                     Tarefa deletada com sucesso!
                  </Text>
               </View>
            </View>
         )}

         {modalEditSuccess && (
            <View style={styles.modal}>
               <View style={styles.modalContent}>
                  <FontAwesome name="check-circle" color={colors.secondary} size={70} />
                  <Text style={styles.textModal}>
                     Tarefa editada com sucesso!
                  </Text>
               </View>
            </View>
         )}

         {modalError && (
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

         {modalSuccessAdd && (
            <View style={styles.modal}>
               <View style={styles.modalContent}>
                  <FontAwesome name="check-circle" color={colors.secondary} size={70} />
                  <Text style={styles.textModal}>
                     Tarefa adicionada com sucesso!
                  </Text>
               </View>
            </View>
         )}

         <View style={styles.headerTask}>
           <View style={styles.header}>
               <Text style={styles.title}>Lista de tarefas</Text>
               <RectButton
                  onPress={openModalAddTask}
               >
                  <Ionicons name="ios-add" color="white" size={30}/>   
               </RectButton> 
           </View>

            {showModalCreateTask && (
               <View style={[styles.inputDisplay, {
                  marginBottom: (showModalCreateTask && !showCancelEdit) ? 25 : 0
               }]}>
                  <TextInput 
                     style={styles.input}
                     placeholder="Digite uma nova tarefa"
                     placeholderTextColor="#9c98a6"
                     value={taskTitle}
                     onChangeText={text => setTaskTitle(text)}

                  />

                  <TouchableOpacity style={styles.buttonCheck}
                     onPress={addNewTask}
                  >
                      {
                        loading 
                        ? <ActivityIndicator size={30} color="white"/>
                        : <FontAwesome name="check" size={28} color="white" />
                        }
                  </TouchableOpacity>
               </View>

            )}  

            {showCancelEdit && (
               <TouchableOpacity 
                  style={styles.viewEdit}
                  onPress={handleCancelEdit}
               >
                  <Text
                     style={styles.cancelEdit}
                  >CANCELAR EDIÇÃO</Text>
               </TouchableOpacity>
            )}

            
            { message !== '' && <Text style={styles.message}>{message}</Text>} 

         </View>

         <FlatList 
            
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={
               ({ item }) => (
                  <TaskItem 
                     task={item} 
                     deleteTask={deleteTask}
                     editTask={editTask}

                  />
               )
            }
            style={styles.list}
         />
      </View>
   );
}