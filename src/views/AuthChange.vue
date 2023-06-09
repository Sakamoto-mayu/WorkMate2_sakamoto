<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import UserListVue from '../components/UserList.vue'

// 承認済み勤怠データを表示する
const approvedData = ref([] as any[])
const departmentData = ref([] as any[])

onMounted(async () => {
  await axios
    .get('http://localhost:3000/userData', { params: { email: '*' } })
    .then((response) => {
      // console.log(response.data)
      approvedData.value = response.data
    })
    .catch((err) => {})

  await axios('http://localhost:8000/GetDepartmentData')
    .then((response) => {
      // console.log(response.data)
      departmentData.value = response.data
    })
    .catch((err) => {})
})
</script>

<template>
  <div>
    <h2 class="pageTitle">権限変更</h2>
    <div class="monthWork">
      <h3>社員一覧</h3>
      <table class="table">
        <tr class="colum">
          <th class="label">
            <label for="date">名前</label>
          </th>
          <th class="label">
            <label for="weekDay">メールアドレス</label>
          </th>
          <th class="label">
            <label for="attendance">所属部署</label>
          </th>
          <th class="label">
            <label for="clockIn">権限</label>
          </th>
          <th class="label">
            <label for="clockOut">変更</label>
          </th>
        </tr>
        <tbody v-for="(data, index) in approvedData" :key="index">
          <UserListVue :name="data.name" :email="data.email" :department="data.department" :role="data.role" />
        </tbody>
      </table>
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

.table {
  /* display: flex;
  flex-direction: row; */
  border: 1px solid #000;
  border-collapse: collapse;
}

.label,
.content {
  /* display: flex; */
  justify-content: center;
  width: 200px;
  padding: 5px 10px;
  border: 1px solid #000;
}

.label {
  background-color: #f6e9d8;
}

.content {
  border-top: 1px solid #000;
}

#content {
  border-left: 1px solid #000;
}
</style>
