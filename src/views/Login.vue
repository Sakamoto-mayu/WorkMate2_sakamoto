<template>
  <div class="login" id="login-template">
    <h2>ログイン</h2>
    <!-- <p>ログインしてください</p> -->
    <form @submit="handleSubmit">
      <div class="login-form">
        <div class="email">
          <label for="email">email：</label>
          <input id="email" type="type" placeholder="email" v-model="email" />
        </div>
        <div class="password">
          <label for="password">パスワード：</label>
          <input id="password" type="password" placeholder="パスワード" v-model="password" />
        </div>
        <p class="errMsg">{{ errorMessage }}</p>
        <button class="login-button" @click="login">ログイン</button>
      </div>
    </form>
    <button class="login-button" @click="goToUserRegister">ユーザー登録へ</button>
  </div>
</template>

<script setup lang="ts">
import firebase from '../firebase'
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence
} from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useSelectedDateStore } from '../stores/selectedDate'

const setRole = useSelectedDateStore()

const router = useRouter()

const auth = getAuth(firebase)

const email = ref('')
const password = ref('')

const errorMessage = ref('')

const handleSubmit = (event: any) => {
  event.preventDefault() // フォームが送信されたときにページがリロードされないようにする
}

const goToUserRegister = async () => {
  router.push('/userRegister')
}

const login = () => {

  if (email.value === '' || password.value === '') {
    if (email.value === '' && password.value === '') {
      errorMessage.value = '※フォームを入力してください'
      return
    } else if (email.value === '') {
      errorMessage.value = '※メールアドレスを入力してください'
      return
    } else if (password.value === '') {
      errorMessage.value = '※パスワードを入力してください'

      return
    }
  } else if (!email.value.match(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/)) {
    errorMessage.value = '※メールアドレスが間違っています'
    return;
  }
  else if (!password.value.match(/^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,12}$/)) {
    console.log('エラー')
    errorMessage.value = '※パスワードは半角英数8文字以上12文字以内で入力してください'
    return
  }

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
      axios
        .get('http://localhost:3000/userData', { params: { email: email.value } })
        .then((response) => {
          // console.log(response.data[0])
          Cookies.set('user', `${response.data[0]._id}`)
          setRole.setRole(response.data[0].role)
        })
        .catch((err) => {})
      // const random = Math.random() * 11
      // Cookies.set('user', `${random}`)
      
      router.push('/')
    })
    .catch((error) => {
      errorMessage.value = '※入力内容が不正です'
      const errorCode = error.code
      const errorMsg = error.message
      console.log(errorCode, errorMsg)
    })
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #F6E9D8;
  color: #977A58;
}

form {
  display: flex;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
  /* border: 1px solid #000; */
  width: 350px;
}

.email,
.password {
  width: 100%;
  display: flex;
  margin: 5px 0;
}

.email label,
.password label {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* border: 1px solid #000; */
}

.email input,
.password input {
  width: 200px;
}

.email input:focus,
.password input:focus {
  outline: 0;
  box-shadow: 0 0 1px #977A58;
  border-radius: 5px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-button {
  width: 130px;
  height: 30px;
  cursor: pointer;
  border: 1px solid #977A58;
  border-radius: 100vh;
  background-color: #977A58;
  color: #fff;
}

.login-button:hover {
  opacity: 0.8;
}

.errMsg {
  text-align: center;
  margin: 10px 0;
  width: 200px;
  color: red;
  font-size: 12px;
  /* border: 1px solid #000; */
}
</style>
