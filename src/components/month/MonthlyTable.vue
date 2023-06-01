<script setup lang="ts">
import { ref, onMounted } from 'vue';
import getMonthlyDate from '@/lib/getMonthlyDate'
import getAttendanceData from '@/lib/getWorkData';

// 日付の一覧データ
const calendar = getMonthlyDate();
// console.log(calendar);

// 日付のみ
const dateArray = calendar.map((date: any) => date.slice(0, 10))
// console.log(dateArray)
// 曜日のみ
const dayArray = calendar.map((date: any) => date.slice(-3))
// console.log(dayArray)

// 勤怠データ
const attendanceData = ref([] as any[]);

onMounted(async () => {
    // GETした勤怠データ
    attendanceData.value = await getAttendanceData();
    // console.log(attendanceData.value);
})

function getStatus(date: any) {
    const exists = attendanceData.value.find((data: any) => data.date === date)
    return exists ? exists.status : '-';
}
function getClockIn(date: any) {
    const exists = attendanceData.value.find((data: any) => data.date === date)
    return exists ? exists.clockIn : '-';
}
function getClockOut(date: any) {
    const exists = attendanceData.value.find((data: any) => data.date === date)
    return exists ? exists.clockOut : '-';
}
function getRest(date: any) {
    const exists = attendanceData.value.find((data: any) => data.date === date)
    return exists ? exists.rest : '-';
}

</script>

<template>
    <h2 class="pageTitle">月次勤怠データ</h2>
    <div class="table">
        <div class="colum">
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
    </div>
</template>

<style scoped>
.pageTitle {
    width: max-content;
    margin-bottom: 10px;
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

#colum {
    border-left: 1px solid #000;
}
</style>
