import firebase from  '../Connections/firebase';

export function getAllTasks(uid) {
   return new Promise(async (resolve, reject) => {
      await firebase.database()
         .ref('tasks').child(uid).on('value', snapshot => {
            const tasks = [];

            snapshot.forEach(doc => {
               tasks.push(doc.val());
            });

            resolve(tasks.reverse())
         });
   });
}

export async function addOrEditTask(uid, title, edit = false, id = '') {
   const task = await firebase.database().ref('tasks')
      .child(uid);
   const key = task.push().key;

   return task.child(key).set({
      title: title,
      timestamp: new Date(),
      id: key,
   });
}


export function deleteTask() {}

export function editTask() {}

