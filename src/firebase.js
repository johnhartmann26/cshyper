import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBKd71bFSQl222WrQzE9LV97CFSv915I9I",
  authDomain: "cshyper-32699.firebaseapp.com",
  databaseURL: "https://cshyper-32699.firebaseio.com",
  projectId: "cshyper-32699",
  storageBucket: "cshyper-32699.appspot.com",
  messagingSenderId: "733320806013",
  appId: "1:733320806013:web:8075d74061be8d8ee13b14",
  measurementId: "G-Q1F6PJZVTB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
