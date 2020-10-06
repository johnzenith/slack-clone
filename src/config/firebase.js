import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2zxpGDvlVgdcS_ljJLl-sSUkiwWWuOzw",
    authDomain: "slack-clone-5b0e2.firebaseapp.com",
    databaseURL: "https://slack-clone-5b0e2.firebaseio.com",
    projectId: "slack-clone-5b0e2",
    storageBucket: "slack-clone-5b0e2.appspot.com",
    messagingSenderId: "817648107063",
    appId: "1:817648107063:web:dc07d62d73815a739d09b2",
    measurementId: "G-EKL37YLTX8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db          = firebaseApp.firestore();
const auth        = firebase.auth();
const provider    = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;