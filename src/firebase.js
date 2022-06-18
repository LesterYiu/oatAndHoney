import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDOzPGdwAnVUB0Be4NAW04Aomg5jmyAqKU",
    authDomain: "oatandhoney-8c42e.firebaseapp.com",
    projectId: "oatandhoney-8c42e",
    storageBucket: "oatandhoney-8c42e.appspot.com",
    messagingSenderId: "349057554835",
    appId: "1:349057554835:web:3217381071a61ecad77066"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;