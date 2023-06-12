<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import UserListVue from '../components/UserList.vue'

// 承認済み勤怠データを表示する
const userData = ref([] as any[])
const searchUser = ref([] as any[])
const departmentData = ref([] as any[])

const userId = ref('')

const defaultRole = ref('')

const selectRole = ref('')

const errorMessage = ref('')

const router = useRouter()

const roleData = ref([
  { role_name: 'GM' },
  { role_name: 'admin' },
  { role_name: 'member' }
] as any[])

const handleSubmit = (event: any) => {
  event.preventDefault() // フォームが送信されたときにページがリロードされないようにする
}

onMounted(async () => {
  await axios
    .get('http://localhost:3000/userData', { params: { email: '*' } })
    .then((response) => {
      // console.log(response.data)
      userData.value = response.data
      searchUser.value = response.data
    })
    .catch((err) => {})

  await axios('http://localhost:8000/GetDepartmentData')
    .then((response) => {
      // console.log(response.data)
      departmentData.value = response.data
    })
    .catch((err) => {})
})

const setRole = (e: any) => {
  const id = e.target.value
  if (id === 'none') {
    selectRole.value = ''
    userId.value = ''
    return
  }
  const search = userData.value.find(({ _id }) => _id === id)
  defaultRole.value = search.role
  selectRole.value = search.role
  userId.value = id
  console.log(search.role)
}

const searchDepartment = (e: any) => {
  const selectDepartment = e.target.value
  if (selectDepartment === 'none') {
    searchUser.value = userData.value
    return
  }
  const search = userData.value.filter(({ department }) => department === selectDepartment)
  searchUser.value = search
  console.log(search)
}

const setErr = () => {
  errorMessage.value = '変更内容を設定してください'
}

const changeRole = async () => {
  await axios
    .post('http://localhost:3000/userData', { newRole: selectRole.value, id: userId.value })
    .then((response) => {
      alert('変更完了')
      router.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="login" id="login-template">
    <h2>ユーザー権限</h2>
    <form @submit="handleSubmit">
      <div class="login-form">
        <div class="email">
          <label for="department">部署：</label>
          <select name="" id="department" @change="searchDepartment">
            <option value="none">全部署</option>
            <option
              v-for="(data, index) in departmentData"
              :key="index"
              :value="data.department_name"
            >
              {{ data.department_name }}
            </option>
          </select>
        </div>
        <div class="email">
          <label for="user">ユーザー名：</label>
          <select name="" id="user" @change="setRole">
            <option value="none">選択してください</option>
            <option v-for="(data, index) in searchUser" :key="index" :value="data._id">
              {{ data.name }}
            </option>
          </select>
        </div>
        <div class="password">
          <label for="rolee">現在の権限：</label>
          <select name="" id="role" v-if="selectRole === ''" disabled>
            <option value="">--</option>
            <option v-for="(data, index) in roleData" :key="index" :value="data.role_name">
              {{ data.role_name }}
            </option>
          </select>
          <select name="" id="role" v-else v-model="selectRole">
            <option v-for="(data, index) in roleData" :key="index" :value="data.role_name">
              {{ data.role_name }}
            </option>
          </select>
        </div>
        <p class="errMsg">{{ errorMessage }}</p>
        <button class="login-button-disable" v-if="selectRole === defaultRole" @click="setErr">
          変更する
        </button>
        <button class="login-button-disable" v-else-if="selectRole === ''" @click="setErr">
          変更する</button
        ><button class="login-button" v-else @click="changeRole">変更する</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
  background-color: #f6e9d8;
  color: #977a58;
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
  justify-content: flex-start;
  /* border: 1px solid #000; */
}

.password input:focus {
  outline: 0;
  box-shadow: 0 0 1px #977a58;
  border-radius: 5px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.login-button {
  margin: 10px 0 10px;
  width: 130px;
  height: 30px;
  cursor: pointer;
  border: 1px solid #977a58;
  border-radius: 100vh;
  background-color: #977a58;
  color: #fff;
}

.login-button-disable {
  margin: 10px 0 10px;
  width: 130px;
  height: 30px;
  cursor: pointer;
  border: 1px solid #977a58;
  border-radius: 100vh;
  background-color: #564633;
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
