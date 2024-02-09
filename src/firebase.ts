import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
  projectId:  import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_FIREBASE_BUCKET_ID,
  messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId:  import.meta.env.VITE_FIREBASE_APP_ID,
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);