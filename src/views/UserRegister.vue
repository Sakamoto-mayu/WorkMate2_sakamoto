<script setup lang="ts">
import { getDepartments } from '@/lib/getDepartments'
import { ref, onMounted } from 'vue'
import firebase from '../firebase'
import axios from 'axios'
import { useRouter } from 'vue-router'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(firebase)

const router = useRouter()

const name = ref('')
const department = ref('部署を選択してください')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const departmentData = ref([] as any[])
// 部署データを取得する
onMounted(async () => {
  departmentData.value = await getDepartments()
  console.log(departmentData.value)
})

const goToLogin = async () => {
  router.push('/login')
}

const submit = async (event: Event) => {
  event.preventDefault()

  if (email.value === '' || password.value === '' || name.value === '' || department.value === '') {
    if (
      email.value === '' &&
      password.value === '' &&
      name.value === '' &&
      department.value === ''
    ) {
      errorMessage.value = 'フォームを入力してください'
      return
    } else if (email.value === '' && name.value === '') {
      errorMessage.value = 'ユーザー名とメールアドレスを入力してください'
      return
    } else if (password.value === '' && name.value === '') {
      errorMessage.value = 'ユーザー名とパスワードを入力してください'
      return
    } else if (email.value === '' && password.value === '') {
      errorMessage.value = 'メールアドレスとパスワードを入力してください'
      return
    } else if (email.value === '') {
      errorMessage.value = 'メールアドレスを入力してください'
      return
    } else if (password.value === '') {
      errorMessage.value = 'パスワードを入力してください'
      return
    } else if (name.value === '') {
      errorMessage.value = 'ユーザー名を入力してください'
      return
    } else if (department.value === '') {
      errorMessage.value = '部署を選択してください'
      return
    }
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    //firebase Authentication に登録があればエラーになる
    .then((userCredential) => {
      const user = userCredential.user
      console.log('firebaseユーザー', user)
      // mongoDBに登録
      axios
        .post('http://localhost:3000/userData', {
          email: email.value,
          password: password.value,
          name: name.value,
          department: department.value,
          role: 'member'
        })
        .then((response) => console.log('mongoDBユーザー', response))
        .catch((err) => console.log(err))
      // DynamoDBに登録
      // axios
      // .put(`https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/users`, {
      //   email: email.value,
      //   password: password.value,
      //   name: name.value
      // })
      // .then((response) => console.log(response))
      // .catch((err) => console.log(err))
    })
    .catch((error) => {
      errorMessage.value = '入力内容が不正です'
      const errorCode = error.code
      const errorMsg = error.message
      console.log(errorCode, errorMsg)
      return
    })
}
</script>

<template>
  <div class="userRegister" id="userRegister-template">
    <h2>新規登録</h2>
    <form @submit="submit">
      <div class="userRegisterForm">
        <div class="name">
          <label for="name">ユーザー名：</label>
          <input id="name" type="text" v-model="name" name="name" placeholder="お名前" />
        </div>
        <div class="department">
          <label for="department">部署：</label>
          <select
            name="department"
            id="department"
            v-model="department"
            :style="{ color: department === '部署を選択してください' ? 'gray' : '' }"
          >
            <option class="placeholder" disabled value="部署を選択してください">
              部署を選択してください
            </option>
            <option
              class="departments"
              v-for="item in departmentData"
              :key="item.id"
              :value="item.department_name"
            >
              {{ item.department_name }}
            </option>
          </select>
        </div>

        <div class="email">
          <label for="email">メールアドレス：</label>
          <input id="email" type="text" v-model="email" name="email" placeholder="メールアドレス" />
        </div>
        <div class="password">
          <label for="password">パスワード：</label>
          <input
            id="password"
            type="text"
            v-model="password"
            name="password"
            placeholder="パスワード"
          />
        </div>
        <p class="errMsg" v-if="errorMessage">※{{ errorMessage }}</p>
        <button class="submitButton" type="submit">送信</button>
      </div>
    </form>
    <button class="submitButton" type="button" @click="goToLogin">ログイン画面へ</button>
  </div>
</template>

<style scoped>
.userRegister {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #f6e9d8;
  color: #977a58;
  /* border: 1px solid #000 */
}

.userRegisterForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.name,
.department,
.email,
.password {
  width: 100%;
  display: flex;
  margin: 5px 0;
}

.name label,
.department label,
.email label,
.password label {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0px;
  /* border: 1px solid #000; */
}

.name input,
.department select,
.email input,
.password input {
  width: 200px;
}

.name input:focus,
.department select:focus,
.email input:focus,
.password input:focus {
  outline: 0;
  box-shadow: 0 0 1px #977a58;
  border-radius: 5px;
}

.departments {
  color: #000;
}

.submitButton {
  width: 130px;
  height: 30px;
  cursor: pointer;
  margin-top: 15px;
  border: 1px solid #977a58;
  border-radius: 100vh;
  background-color: #977a58;
  color: #fff;
}

.submitButton:hover {
  opacity: 0.8;
}

.errMsg {
  text-align: center;
  width: 300px;
  color: red;
  font-size: 12px;
}
</style>

<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
