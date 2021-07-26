import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyC9IZDHMX_kNthA6io7GsGi8mlEoo_NXeE",
  authDomain: "fir-lambda-5a361.firebaseapp.com",
  databaseURL: "https://fir-lambda-5a361-default-rtdb.firebaseio.com",
  projectId: "fir-lambda-5a361",
  storageBucket: "fir-lambda-5a361.appspot.com",
  messagingSenderId: "606426419109",
  appId: "1:606426419109:web:60d55dfb79b5fbbb55e24c"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export default db;