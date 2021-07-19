import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAfvQJN-42F4T7uI6hWcbcsAzydWa4pVZ0",
    authDomain: "myflystar.firebaseapp.com",
    projectId: "myflystar",
    storageBucket: "myflystar.appspot.com",
    messagingSenderId: "452713352223",
    appId: "1:452713352223:web:b18a17e27c296c12c9592a",
    measurementId: "G-GEVQ92NERD"
};

const FirebaseApp = firebase.initializeApp(firebaseConfig)

const auth = FirebaseApp.auth()

export {auth}