<script setup lang="ts">
import WorkPlace from '../components/top/WorkPlace.vue'
import Clock from '../components/top/Clock.vue'
import LeaveBalance from '../components/top/LeaveBalance.vue'

import firebase from '../firebase'
import { getAuth } from 'firebase/auth'

const auth = getAuth(firebase)
const currentUserEmail = auth.currentUser?.email
console.log('トップページだよ', currentUserEmail)
</script>

<template>
  <p>ユーザー：[{{ currentUserEmail }}]</p>
  <h2 class="pageTitle">トップページ</h2>
  <div class="wrap">
    <WorkPlace class="workPlace" />
    <div class="content">
      <Clock />
      <LeaveBalance />
    </div>
  </div>
</template>

<style scoped>
.pageTitle {
  width: max-content;
  margin: 10px 0;
  padding: 0 5px;
  border: 1px solid #977a58;
  border-radius: 5px;
  background-color: #f6e9d8;
  color: #977a58;
}

.workPlace {
  width: 500px;
  margin: 10px auto;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: 20px auto;
}
</style>
