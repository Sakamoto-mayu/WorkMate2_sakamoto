<script setup lang="ts">
import { ref } from 'vue'
import firebase from '../firebase'
import Cookies from 'js-cookie'
import axios from 'axios'

import { getAuth, updatePassword } from 'firebase/auth'

const auth = getAuth(firebase)

const id = Cookies.get('user')
const currentUser = auth.currentUser // auth.currentUserを使用する

const password = ref('')
const newPass1 = ref('')
const newPass2 = ref('')

const errorMessage = ref('')

const handleSubmit = (event: any) => {
  event.preventDefault() // フォームが送信されたときにページがリロードされないようにする
}

const changePass = () => {
  if (password.value === '' || newPass1.value === '' || newPass2.value === '') {
    if (password.value === '' && newPass1.value === '' && newPass2.value === '') {
      errorMessage.value = '※フォームを入力してください'
      return;
    } else if (password.value === '' && newPass1.value === ''){
      errorMessage.value = '※現在のパスワードと新しいパスワードを入力してください'
    } else if (newPass1.value === '' && newPass2.value === ''){
      errorMessage.value = '※新しいパスワードパスワードと新しいパスワード（確認用）を入力してください'
    } else if (password.value === '' && newPass2.value === '') {
      errorMessage.value = '※現在のパスワードと新しいパスワード（確認用）を入力してください'
    } else if (password.value === '') {
      errorMessage.value = '※現在のパスワードを入力してください'
      return;
    } else if (newPass1.value === '') {
      errorMessage.value = '※新しいパスワードを入力してください'
      return;
    } else if (newPass2.value === '') {
      errorMessage.value = '※新しいパスワード（確認用）を入力してください'
      return;
    }
  } else if (newPass1.value !== newPass2.value) {
    errorMessage.value = '※確認用パスワードと一致しません'
    return
  } else {
    errorMessage.value = '';
  }

  axios
    .get('http://localhost:3000/userData', { params: { id: id, pass: password.value } })
    .then((response) => {
      const data = response.data
      if (data.length === 0) {
        console.log('パスワードが違います')
        return
      }
      console.log('一致しました')
      axios
        .post('http://localhost:3000/userData', { newPass: newPass1.value, id: id })
        .then((response) => {
          console.log(response)
          if (currentUser)
            updatePassword(currentUser, newPass1.value)
              .then(() => {
                console.log('FB変更完了')
              })
              .catch((err) => {
                console.log(err)
              })
          console.log('変更完了')
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="setting" id="setting-template">
    <h2>各種設定（パスワード）</h2>
    <form @submit="handleSubmit">
      <div class="settingForm">
        <div class="password">
          <label for="password">現在のパスワード：</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <div class="newPass1">
          <label for="newPass1">新しいパスワード：</label>
          <input id="newPass1" type="password" v-model="newPass1" />
        </div>
        <p class="conditionOfPass">※パスワードは半角英数8文字以上12文字以内で<br />設定してください。</p>
        <div class="newPass2">
          <label for="newPass2">新しいパスワード&nbsp;&nbsp;&nbsp;&nbsp;<br />（確認用）：</label>
          <input id="newPass2" type="password" v-model="newPass2" />
        </div>
        <p class="errMsg" >{{ errorMessage }}</p>
        <button class="submitButton" @click="changePass">パスワード変更</button>
      </div>
    </form>
  </div>
</template>

<style>
.setting {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  border-radius: 5px;
  background-color: #F6E9D8;
  color: #977A58;
}

.settingForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.password,
.newPass1,
.newPass2 {
  width: 100%;
  display: flex;
  margin: 5px 0;
}
.newPass2 {
  align-items: flex-end; /*newPass2のlabelとinputを下揃え*/
}

.password label,
.newPass1 label,
.newPass2 label {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  margin-right: 5px;
  /* border: 1px solid #000; */
}

.password input,
.newPass1 input,
.newPass2 input {
  width: 200px;
}

.newPass2 input {
  height: 25px;
}

.password input:focus,
.newPass1 input:focus,
.newPass2 input:focus {
  outline: 0;
  box-shadow: 0 0 1px #977A58;
  border-radius: 5px;
}

.conditionOfPass {
  font-size: 12px
}


.submitButton {
  width: 130px;
  height: 30px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 10px;
  border: 1px solid #977A58;
  border-radius: 100vh;
  background-color: #977A58;
  color: #fff;
}

.submitButton:hover {
  opacity: 0.8;
}

.errMsg {
  text-align: center;
  width: 250px;
  margin-top: 5px;
  margin-bottom: 0;
  color: red;
  font-size: 12px;
}
</style>
