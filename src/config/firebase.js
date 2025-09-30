import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
import { getStorage } from 'firebase/storage'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq53w_wSJp2kJ4RYLWwcD4HVDb7l4lA0c",
  authDomain: "simple-tools-backend.firebaseapp.com",
  projectId: "simple-tools-backend",
  storageBucket: "simple-tools-backend.firebasestorage.app",
  messagingSenderId: "732310734401",
  appId: "1:732310734401:web:52bd414e79c583875968c0"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const functions = getFunctions(app)
export const storage = getStorage(app)

export default app
