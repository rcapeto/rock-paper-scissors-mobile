import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyDhyObny7xQP_U8aLBOVoVN26ZNYrFjMn8",
   authDomain: "mobile-app-c2998.firebaseapp.com",
   databaseURL: "https://mobile-app-c2998.firebaseio.com",
   projectId: "mobile-app-c2998",
   storageBucket: "mobile-app-c2998.appspot.com",
   messagingSenderId: "837881013255",
   appId: "1:837881013255:web:1425c47be22842c7dc36a2"
};

if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;
