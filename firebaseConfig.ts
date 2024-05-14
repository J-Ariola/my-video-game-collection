// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjUFWxOd3z3m5G6jODtieWv4JsCYw4NE8",
  authDomain: "mvgdb-user-credentials.firebaseapp.com",
  projectId: "mvgdb-user-credentials",
  storageBucket: "mvgdb-user-credentials.appspot.com",
  messagingSenderId: "963040042923",
  appId: "1:963040042923:web:cfacf540dd5324a64f7cee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);