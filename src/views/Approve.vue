<script setup lang="ts">
// 1.ログイン時にログインユーザーのemail情報をどこかに保持
// 2.承認画面アクセス時に、emailをキーにログインユーザーの権限・部署を取得(monogoDB)→display表示、できればモーダル
// 3.部署 & statusで絞り込みして、申請情報を取得(DynamoDB)
// 4.名前(mongoDBから取得)、申請情報を表示

import { ref, onMounted } from 'vue'

import firebase from '../firebase'
import { getAuth } from 'firebase/auth'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

// ログインユーザーのemail取得
function getEmail() {
  const auth = getAuth(firebase)
  const currentUserEmail = auth.currentUser?.email
  return currentUserEmail
}
const userEmail = getEmail()
console.log('ユーザー：', userEmail)

const department = ref('')
const role = ref('')
const dataLists = ref([])

// ログインユーザーの情報取得
async function checkUser() {
  try {
    const response = await axios.get('http://localhost:3000/userData', {
      params: { email: userEmail }
    })
    department.value = response.data[0].department
    role.value = response.data[0].role
  } catch (err) {
    console.log(err)
  }

  // ログインユーザーがGMまたはadminの場合トップへ戻る
  async function checkRole() {
    try {
      if (role.value !== 'GM' && role.value !== 'admin') {
        alert('権限者のみ閲覧可能です')
        router.push('/')
      } else {
        return
      }
    } catch (err) {
      console.log(err)
    }
  }
  checkRole()
}
checkUser()

//   DynamoDB から取得
async function getWorkData() {
  await checkUser()
  if (role.value === 'admin') {
    const response = await fetch('https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork', {
      method: 'POST',
      body: JSON.stringify({
        admin: false,
        gm: false,
        // department: department.value ←動作確認のため一時的にコメントアウト
        department: '総務'
      })
    })
    const result = await response.json()
    console.log('adminリザルト', result)
    console.log('ロール', role.value)
    return result
  } else if (role.value === 'GM') {
    const response = await fetch('https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork', {
      method: 'POST',
      body: JSON.stringify({
        admin: true,
        gm: false,
        department: department.value
      })
    })
    const result = await response.json()
    console.log('GMリザルト', result)
    console.log('ロール', role.value)
    return result
  }
}

// 画面表示用
onMounted(async () => {
  const workData = await getWorkData()
  console.log(workData.Items)
  dataLists.value = workData.Items
})

// 承認ボタン true/false切り替え
const approveWork = async (list) => {
  let admin, gm
  if (list.admin === true) {
    admin = list.admin
    gm = !list.gm
  } else {
    admin = !list.admin
    gm = list.gm
  }
  const response = await fetch('https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: list.email,
      month: list.month,
      date: list.date,
      day: list.day,
      status: list.status,
      clockIn: list.clockIn,
      clockOut: list.clockOut,
      rest: list.rest,
      admin: admin,
      gm: gm,
      department: list.department
    })
  })
  const result = await response.json()
  console.log('approveWork', result)
}
</script>

<template>
  <h2 class="pageTitle">勤怠承認</h2>
  <div class="table">
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">申請者</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <p>{{ list.day }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">日付</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <p>{{ list.date }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">曜日</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <p>{{ list.day }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">出欠</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <p>{{ list.status }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">始業時刻</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <p>{{ list.clockIn }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">終業時刻</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <p>{{ list.clockOut }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">休憩</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <p>{{ list.rest }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">承認</label>
      </div>
      <div class="content" v-for="(list, index) in dataLists" :key="index">
        <button @click="approveWork(list)">承認</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pageTitle {
  width: max-content;
  margin-bottom: 10px;
  padding: 0 5px;
  border: 1px solid #977a58;
  border-radius: 5px;
  background-color: #f6e9d8;
  color: #977a58;
}

.table {
  display: flex;
  flex-direction: row;
  border: 1px solid #000;
}

.label,
.content {
  display: flex;
  justify-content: center;
  width: 100px;
}

.label {
  background-color: #f6e9d8;
}

.content {
  border-top: 1px solid #000;
}

#colum {
  border-left: 1px solid #000;
}
</style>
