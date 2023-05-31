import firebase from '../firebase'
import axios from 'axios'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(firebase)

const userRegister = (email: string, password: string, name: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    //firebase Authentication に登録があればエラーになる
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
      // mongoDBに登録
      axios
        .post('http://localhost:3000/userData', {
          email: email,
          password: password,
          name: name
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
      // DynamoDBに登録
      // axios
      // .put('import.meta.env.VITE_AWS_USERS', {
      //   email: email,
      //   password: password,
      //   name: name
      // })
      // .then((response) => console.log(response))
      // .catch((err) => console.log(err))
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      return
    })
}

export default userRegister
