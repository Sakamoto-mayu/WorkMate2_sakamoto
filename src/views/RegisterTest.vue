<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import firebase from '../firebase'

import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import type { User } from 'firebase/auth'

const data = ref(null)
const error = ref(null)
axios
  .get<[], null>('http://localhost:3000/userData')
  .then((response) => (data.value = response))
  .catch((err) => (error.value = err))

const email = ref('')
const password = ref('')

const currentUser = ref<User | null>(null)

console.log(currentUser)

const auth = getAuth(firebase)
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    currentUser.value = user
  } else {
    currentUser.value = null
  }
})

// フォームが送信されたときに発生するイベントを処理する関数
const handleSubmit = (event: any) => {
  event.preventDefault() // フォームが送信されたときにページがリロードされないようにする
  createAccount() // ユーザー登録処理を呼び出す
}
const signIn = () => {
  if (email.value == '' || password.value == '') return
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Sign In
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
    })
}

const createAccount = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Create Account
      const user = userCredential.user
      console.log(user)
      // ユーザー登録が成功したら、フォームをリセットする
      email.value = ''
      password.value = ''
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      return
    })
  axios
    .post('http://localhost:3000/userData', {
      email: email.value,
      password: password.value,
      name: 'test'
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
  // axios
  // .put('import.meta.env.VITE_AWS_USERS', {
  //   email: email.value,
  //   password: password.value,
  //   name: 'test'
  // })
  // .then((response) => console.log(response))
  // .catch((err) => console.log(err))
}

const logout = () => {
  signOut(auth)
    .then(() => {
      currentUser.value = null
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div id="app" class="container mt-5" v-if="currentUser == null">
    <h2>ユーザ登録画面</h2>
    <div class="row">
      <div class="col-sm-8">
        <form @submit="handleSubmit">
          <div class="form-group">
            <label for="email">メールアドレス:</label>
            <input type="email" class="form-control" id="email" v-model="email" />
          </div>
          <div class="form-group">
            <label for="password">パスワード:</label>
            <input type="password" class="form-control" id="password" v-model="password" />
          </div>
          <button type="submit" class="btn btn-info">登録</button>
        </form>
        <button type="submit" class="btn btn-info" @click="signIn">ログイン</button>
      </div>
    </div>
  </div>
  <div v-else>
    <button type="submit" class="btn btn-info" @click="logout">ログアウト</button>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
