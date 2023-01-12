import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAyrOH33C0iUsD7Mk228wUFEdUUTR7tOhM',
  authDomain: 'calendapp-dcd9e.firebaseapp.com',
  projectId: 'calendapp-dcd9e',
  storageBucket: 'calendapp-dcd9e.appspot.com',
  messagingSenderId: '783565229222',
  appId: '1:783565229222:web:88617eb67f31cf0f7a7867',
  measurementId: 'G-HTLNBTDNQJ',
}

const app = initializeApp(firebaseConfig)

export const Auth = getAuth(app)
export const db = getFirestore(app)

export default app
