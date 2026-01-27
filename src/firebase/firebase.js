import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBIrpfKXkLYeuycQ54ztH3bC1F7vcE-YeM",
  authDomain: "nortt-a28d9.firebaseapp.com",
  projectId: "nortt-a28d9",
  storageBucket: "nortt-a28d9.firebasestorage.app",
  messagingSenderId: "663567103798",
  appId: "1:663567103798:web:28ee2f5971b08f24b62597"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
