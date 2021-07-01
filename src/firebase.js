import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiZUi-n9yr7iHjSLUlcZL34spFJZLFmoI",
  authDomain: "mydict-52e3c.firebaseapp.com",
  projectId: "mydict-52e3c",
  storageBucket: "mydict-52e3c.appspot.com",
  messagingSenderId: "828045508501",
  appId: "1:828045508501:web:ac1aa6f3390dc2d8d6c09c",
  measurementId: "G-Y2CX76F2MF"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
