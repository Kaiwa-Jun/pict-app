import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

if (!firebase.apps.length) {
firebase.initializeApp({
  apiKey: "AIzaSyDOA3B9WIN9dhOxYEcjH115QrcUzDLYyFY",
  authDomain: "pict-app-6a5f2.firebaseapp.com",
  projectId: "pict-app-6a5f2",
  storageBucket: "pict-app-6a5f2.appspot.com",
  messagingSenderId: "402982471401",
  appId: "1:402982471401:web:cf8eda4b5f051114cf9278",
  measurementId: "G-9B8K58PCQH"
})
}

export default firebase

const db = firebase.firestore()

export {
  firebase ,
  db
}
