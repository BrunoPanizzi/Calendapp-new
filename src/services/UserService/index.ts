import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as _signOut,
  deleteUser,
  User,
} from 'firebase/auth'
import { Auth } from '../../../firebase'

function login(email: string, password: string) {
  return signInWithEmailAndPassword(Auth, email, password)
}

function createUser(email: string, password: string) {
  return createUserWithEmailAndPassword(Auth, email, password)
}

function getCurrentUser() {
  return Auth.currentUser
}

function signOut() {
  _signOut(Auth)
}

function deleteAccount() {
  return deleteUser(getCurrentUser() as User)
}

export default {
  login,
  createUser,
  getCurrentUser,
  signOut,
  deleteAccount,
}
