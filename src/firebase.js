// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY1ikRKv4ydEOY1uX4ALwBbHT2_yAnRMY",
  authDomain: "aaapp-5f583.firebaseapp.com",
  projectId: "aaapp-5f583",
  storageBucket: "aaapp-5f583.appspot.com",
  messagingSenderId: "605352980585",
  appId: "1:605352980585:web:cee236425d49931322b2f8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics();
export default firebase
