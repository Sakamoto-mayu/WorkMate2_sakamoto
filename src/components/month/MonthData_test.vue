<script lang="ts">
import { ref, onMounted } from 'vue'
export default {
  props: {
    monthDigit: Number,
    day: Number,
    weekDay: String
  }
}
// const date = ref('')
// const day = ref('')
// const status = ref('')
// const clockIn = ref('')
// const clockOut = ref('')
// const rest = ref('')

// onMounted(async () => {
//   try {
//     const response = await fetch(`http://localhost:8000/GetAttendanceData`)
//     const attendanceData = await response.json()
//     // console.log('success', attendanceData)

//     // 取得したデータを日付の降順に並べ替える
//     attendanceData.sort(function (x: any, y: any) {
//       return x.date > y.date ? 1 : -1
//     })
//     // console.log(attendanceData)

//     date.value = attendanceData.map((attendance: any) => attendance.date)
//     day.value = attendanceData.map((attendance: any) => attendance.day)
//     clockIn.value = attendanceData.map((attendance: any) => attendance.clockIn)
//     clockOut.value = attendanceData.map((attendance: any) => attendance.clockOut)
//     rest.value = attendanceData.map((attendance: any) => attendance.rest)
//     status.value = attendanceData.map((attendance: any) => attendance.status)
//   } catch (error) {
//     console.log(error)
//   }
// })
</script>

<template>
  <tr>
    <td>{{ monthDigit }}/{{ day }}</td>
    <td>{{ weekDay }}</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</template>
