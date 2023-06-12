<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { getRole } from '../lib/getRole'

const props = defineProps({
  id: String,
  name: String,
  email: String,
  department: String,
  role: String
})

const roleData = ref([
  { role_name: 'GM' },
  { role_name: 'admin' },
  { role_name: 'member' }
] as any[])

const selectRole = ref(props.role)

const router = useRouter()

// const test = getRole()

// console.log('test', test)

const buttonTest = async () => {
  console.log(props.id, selectRole.value)
  await axios
    .post('http://localhost:3000/userData', { newRole: selectRole.value, id: props.id })
    .then((response) => {
      console.log('変更完了')
      router.go(0)
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(async () => {
  //   await axios('http://localhost:8000/GetRoleData')
  //     .then((response) => {
  //       console.log(response)
  //       departmentData.value = response.data
  //     })
  //     .catch((err) => {})
})
</script>

<template>
  <tr>
    <td class="content">{{ name }}</td>
    <td class="content">{{ email }}</td>
    <td class="content">{{ department }}</td>
    <td class="content">
      <select name="" id="" v-model="selectRole">
        <option v-for="(data, index) in roleData" :key="index" :value="data.role_name">
          {{ data.role_name }}
        </option>
      </select>
    </td>
    <td class="content">
      <button @click="buttonTest" v-if="selectRole === props.role" disabled>変更</button
      ><button @click="buttonTest" v-else>変更</button>
    </td>
  </tr>
</template>

<style>
.content {
  border: 1px solid #000;
  padding-left: 5px;
}
</style>
