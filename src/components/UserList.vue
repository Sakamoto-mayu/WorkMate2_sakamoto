<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  name: String,
  email: String,
  department: String,
  role: String
})

const departmentData = ref([] as any[])

onMounted(async () => {
  await axios('http://localhost:8000/GetRoleData')
    .then((response) => {
      console.log(response)
      departmentData.value = response.data
    })
    .catch((err) => {})
})
</script>

<template>
  <tr>
    <td class="content">{{ name }}</td>
    <td class="content">{{ email }}</td>
    <td class="content">{{ department }}</td>
    <td class="content">
      <select name="" id="">
        <option value="" v-for="(data, index) in departmentData" :key="index">
          {{ data.role_name }}
        </option>
      </select>
    </td>
    <td class="content"></td>
  </tr>
</template>

<style>
.content {
  border: 1px solid #000;
  padding-left: 5px;
}
</style>
