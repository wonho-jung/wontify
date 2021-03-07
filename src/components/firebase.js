import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBjrriyj1__l-w8aYR0UUnq8i8V-zJugeI",
  authDomain: "spotify-clone-c80b5.firebaseapp.com",
  projectId: "spotify-clone-c80b5",
  storageBucket: "spotify-clone-c80b5.appspot.com",
  messagingSenderId: "115808750414",
  appId: "1:115808750414:web:7cddf02222a26f0d422c1f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
