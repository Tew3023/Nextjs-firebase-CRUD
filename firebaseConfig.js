
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC69ilp2thQqjlHJaXpeUKTDRaIn8wewXo",
  authDomain: "fir-testproject-7487e.firebaseapp.com",
  projectId: "fir-testproject-7487e",
  storageBucket: "fir-testproject-7487e.appspot.com",
  messagingSenderId: "1013941129939",
  appId: "1:1013941129939:web:9f5bfccec3ccc27ab83a26"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
