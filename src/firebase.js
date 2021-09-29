import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: 'AIzaSyDHyWPCpdvSO283h-HE0XxFBftk9IgFKBI',
  authDomain: 'polyrise-95012.firebaseapp.com',
  databaseURL: '',
  projectId: 'polyrise-95012',
  storageBucket: 'polyrise-95012.appspot.com',
  messagingSenderId: '1091938212545',
  appId: '1:1091938212545:web:9ae21f1742c284f91c5240'
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
