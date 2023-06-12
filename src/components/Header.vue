<template>
  <header v-if="$route.path !== '/login' && $route.path !== '/userRegister'">
    <!-- ログイン画面のみheader非表示-->
    <nav class="nav">
      <button type="button" @click="goToTop">TOP</button>
      <button type="button" @click="goToDayWorkPage">日次勤怠</button>
      <button type="button" @click="goToMonthWorkPage">月次勤怠</button>
      <button type="button" @click="goToApprovePage">勤怠承認</button>
      <button type="button" @click="goToSetting">各種設定</button>
      <button type="button" @click="signOut">ログアウト</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import logout from '@/lib/logout'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import axios from 'axios'
import { async } from '@firebase/util'

const router = useRouter()

const signOut = async () => {
  logout()
  router.push('/login').catch((error) => {
    console.log(error)
  })
}

const goToTop = async () => {
  router.push('/')
}

const goToDayWorkPage = async () => {
  router.push('/dayWork')
}

const goToMonthWorkPage = async () => {
  router.push('/monthWork')
}

const goToApprovePage = async () => {
  router.push('/approve')
}

const goToSetting = async () => {
  router.push('/setting')
}

</script>

<style>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background-color: #f6e9d8;
  z-index: 9999; /*headerを最前面にする */
}

.nav {
  display: flex;
  justify-content: center;
}

.nav button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: #977a58;
  line-height: 30px; /*navをheaderの上下中央に配置*/
}

.nav button:hover {
  opacity: 0.8;
}
</style>
