<script setup lang="ts">
// 1.ログイン時にログインユーザーのemail情報をどこかに保持
// 2.承認画面アクセス時に、emailをキーにログインユーザーの権限・部署を取得(monogoDB)
// 3.部署 & statusで絞り込みして、申請情報を取得(DynamoDB)
// 4.名前(mongoDBから取得)、申請情報を表示

import firebase from '../firebase'
import { getAuth } from 'firebase/auth'

function getEmail() {
  const auth = getAuth(firebase)
  const currentUserEmail = auth.currentUser?.email
  return currentUserEmail
}
const userEmail = getEmail()
console.log('ユーザー：', userEmail)
</script>

<template>
  <p>ユーザー：{{ userEmail }}</p>
  <h2 class="pageTitle">勤怠承認</h2>
  <div class="table">
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">申請者</label>
      </div>
      <div class="content" v-for="(value, index) in dateArray" :key="index">
        <p>{{ value }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">日付</label>
      </div>
      <div class="content" v-for="(value, index) in dateArray" :key="index">
        <p>{{ value }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="date">曜日</label>
      </div>
      <div class="content" v-for="(value, index) in dayArray" :key="index">
        <p>{{ value }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="status">出欠</label>
      </div>
      <div class="content" v-for="(value, index) in dateArray" :key="index">
        <p>{{ getStatus(value) }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="clockIn">始業時刻</label>
      </div>
      <div class="content" v-for="(value, index) in dateArray" :key="index">
        <p>{{ getClockIn(value) }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="clockOut">終業時刻</label>
      </div>
      <div class="content" v-for="(value, index) in dateArray" :key="index">
        <p>{{ getClockOut(value) }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="rest">休憩</label>
      </div>
      <div class="content" id="content" v-for="(value, index) in dateArray" :key="index">
        <p>{{ getRest(value) }}</p>
      </div>
    </div>
    <div class="colum" id="colum">
      <div class="label">
        <label for="rest">承認</label>
      </div>
      <div class="content" id="content" v-for="(value, index) in dateArray" :key="index">
        <p>{{ getRest(value) }}</p>
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
