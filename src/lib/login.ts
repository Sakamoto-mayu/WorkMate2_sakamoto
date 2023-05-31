import firebase from '../firebase'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(firebase)

const login = (email: string, password: string) => {
  if (email == '' || password == '') return
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}

export default login
