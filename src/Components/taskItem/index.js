import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import colors from '../../globalStyle';

import styles from './styles';

export default function TaskItem({ task, deleteTask, editTask }) {
   
   return(
      <View style={styles.taskContainer}>
         <View style={styles.headerTask}>
            <TouchableOpacity onPress={() => editTask(task.id, task.title)}>
               <Feather name="edit" color={colors.primary} size={24}/>  
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(task.id)}>
               <Feather name="trash" color={colors.red} size={24}/>
            </TouchableOpacity>
         </View>
         <Text style={styles.text}>{task.title}</Text>
      </View>
   );
}