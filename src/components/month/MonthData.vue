<script setup lang="ts">
import { ref, onMounted } from 'vue';
import firebase from '@/firebase'
import { getAuth } from 'firebase/auth'

const auth = getAuth(firebase)
const currentUserEmail = auth.currentUser?.email
console.log(currentUserEmail)

const date = ref('');
const day = ref('');
const status = ref('');
const clockIn = ref('');
const clockOut = ref('');
const rest = ref('');

onMounted(async () => {
    try {
        const response = await fetch(`http://localhost:8000/GetAttendanceData`)
        const attendanceData = await response.json();
        // console.log('success', attendanceData)

        // 取得したデータを日付の降順に並べ替える
        attendanceData.sort(function (x: any, y: any) {
            return (x.date > y.date ? 1 : -1)
        })
        // console.log(attendanceData)

        date.value = attendanceData.map((attendance: any) => attendance.date)
        day.value = attendanceData.map((attendance: any) => attendance.day)
        clockIn.value = attendanceData.map((attendance: any) => attendance.clockIn)
        clockOut.value = attendanceData.map((attendance: any) => attendance.clockOut)
        rest.value = attendanceData.map((attendance: any) => attendance.rest)
        status.value = attendanceData.map((attendance: any) => attendance.status)
    } catch (error) {
        console.log(error)
    }
})

</script>

<template>
    <h2 class="pageTitle">月次勤怠</h2>
    <div class="monthWork">
        <h3>月次勤怠データ</h3>
        <div class="table">
            <div class="colum">
                <div class="label">
                    <label for="date">日付</label>
                </div>
                <div class="content" v-for="(value, index) in date" :key="index">
                    <p>{{ value }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="weekDay">曜日</label>
                </div>
                <div class="content" id="content" v-for="(value, index) in day" :key="index">
                    <p>（{{ value }}）</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="attendance">出欠</label>
                </div>
                <div class="content" id="content" v-for="(value, index) in status" :key="index">
                    <p>{{ value }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="clockIn">開始</label>
                </div>
                <div class="content" id="content" v-for="(value, index) in clockIn" :key="index">
                    <p>{{ value }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="clockOut">終了</label>
                </div>
                <div class="content" id="content" v-for="(value, index) in clockOut" :key="index">
                    <p>{{ value }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="rest">休憩</label>
                </div>
                <div class="content" id="content" v-for="(value, index) in rest" :key="index">
                    <p>{{ value }}</p>
                </div>
            </div>
            <!-- <div class="colum">
                <div class="label">
                    <label for="comment">コメント</label>
                </div>
                <div class="content">
                    <p>コメント</p>
                </div>
            </div> -->

        </div>
    </div>
</template>

<style scoped>
.pageTitle {
    width: max-content;
    margin: 10px 0;
    padding: 0 5px;
    border: 1px solid #977A58;
    border-radius: 5px;
    background-color: #F6E9D8;
    color: #977A58;
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
    background-color: #F6E9D8;
}

.content {
    border-top: 1px solid #000;
}

#content {
    border-left: 1px solid #000
}
</style>
