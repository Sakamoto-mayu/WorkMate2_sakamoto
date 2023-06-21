<script setup lang="ts">
import firebase from '@/firebase'
import { getAuth } from 'firebase/auth'
import getLeaveBalance from '@/lib/getLeaveBalance'
import getAttendanceData from '@/lib/getWorkData'
import { ref, onMounted } from 'vue';

const auth = getAuth(firebase)
const currentUserEmail = auth.currentUser?.email
// console.log(currentUserEmail)

const attendanceData = ref([] as any[])
const leaveBalance = ref()
const paidLeave = ref(15)
const usedPaidLeave = ref()
const remainingPaidLeave = ref()
onMounted(async () => {
    attendanceData.value = await getAttendanceData()
    // console.log(attendanceData.value)
    checkPaidLeave()
})
onMounted(async () => {
    leaveBalance.value = await getLeaveBalance()
    // console.log(leaveBalance.value);
})

// 勤怠データから、statusが「有給」のデータ数を取得
const checkPaidLeave = async () => {
    // console.log(attendanceData.value)
    usedPaidLeave.value = attendanceData.value.filter((item: any) => item.status === "有給").length;
    // console.log(paidLeave);
    remainingPaidLeave.value = paidLeave.value - usedPaidLeave.value
    updatePaidLeave()
}

// postgreSQLへデータをPUTし、有給日数を更新する
const updatePaidLeave = async () => {
    const paid_leave = parseInt(remainingPaidLeave.value)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_email: currentUserEmail,
            paid_leave: paid_leave,
        })
    }
    try {
        const result = await fetch(`http://localhost:8000/PutPaidLeave`, options)
        console.log('有給日数更新', result);
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
        <table border="1" style="border-collapse: collapse" class="paidLeave">
            <thead>
                <tr>
                    <th colspan="8">有給取得状況</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>付与日数</th>
                    <th>取得日数</th>
                    <th>残日数</th>
                </tr>
                <tr>
                    <td class="data">{{ paidLeave }}日</td>
                    <td class="data">{{ usedPaidLeave }}日</td>
                    <td class="data">{{ remainingPaidLeave }}日</td>
                </tr>
            </tbody>
        </table>
</template>

<style scoped>
.paidLeave {
    width: 230px;
    margin-right: 0px;
}

thead tr th {
    text-align: left;
    height: 25px;
    padding-left: 10px;
}

tbody tr {
    height: 50px;
}
.data {
    text-align: right;
}


tbody tr th {
    /* width: 70px; */
    height: 50px;
}
</style>
