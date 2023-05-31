<script setup lang="ts">
// import MonthDataCheck from '../components/month/MonthDataCheck.vue'
import { ref } from 'vue'
import getCalendarArray from '../lib/getMonth'
import MonthData_test from '../components/month/MonthData_test.vue'

const calender = getCalendarArray(2023, 5)
</script>

<template>
  <div>
    <h2 class="pageTitle">月次勤怠</h2>
    <div class="monthWork">
      <h3>月次勤怠データ</h3>
      <table class="table">
        <tr class="colum">
          <th class="label">
            <label for="date">日付</label>
          </th>
          <th class="label">
            <label for="weekDay">曜日</label>
          </th>
          <th class="label">
            <label for="attendance">出欠</label>
          </th>
          <th class="label">
            <label for="clockIn">開始</label>
          </th>
          <th class="label">
            <label for="clockOut">終了</label>
          </th>
          <th class="label">
            <label for="rest">休憩</label>
          </th>
        </tr>
        <tbody v-for="days in calender" :key="days.day">
          <MonthData_test :monthDigit="days.monthDigit" :day="days.day" :weekDay="days.weekDay" />
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
}

.label,
.content {
  /* display: flex; */
  justify-content: center;
  width: 100px;
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
