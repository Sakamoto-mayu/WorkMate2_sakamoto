<script setup lang="ts">
import { ref, onMounted } from 'vue';
import getMonthlyDate from '@/lib/getMonthlyDate'
import getAttendanceData from '@/lib/getWorkData';
import { useSelectedDateStore } from '@/stores/selectedDate'
import { useRouter } from 'vue-router';

const router = useRouter()

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

// 日付をクリックするとdateの値をstoreに保持し、日次勤怠へ遷移する
function handleDateClick(date: any) {
    const dateStore = useSelectedDateStore();
    dateStore.setSelectedDate(date);
    router.push({ path: '/dayWork' });
}

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
    <div class="table">
        <div class="colum">
            <div class="label">
                <label for="date">日付</label>
            </div>
            <div class="content" id="date" v-for=" date in dateArray" :key="date" @click="handleDateClick(date)">
                <p>{{ date }}</p>
            </div>
        </div>
        <div class="colum" id="colum">
            <div class="label">
                <label for="date">曜日</label>
            </div>
            <div class="content" v-for="day in dayArray" :key="day">
                <p>{{ day }}</p>
            </div>
        </div>
        <div class="colum" id="colum">
            <div class="label">
                <label for="status">出欠</label>
            </div>
            <div class="content" v-for="date in dateArray" :key="date">
                <p>{{ getStatus(date) }}</p>
            </div>
        </div>
        <div class="colum" id="colum">
            <div class="label">
                <label for="clockIn">始業時刻</label>
            </div>
            <div class="content" v-for="date in dateArray" :key="date">
                <p>{{ getClockIn(date) }}</p>
            </div>
        </div>
        <div class="colum" id="colum">
            <div class="label">
                <label for="clockOut">終業時刻</label>
            </div>
            <div class="content" v-for="date in dateArray" :key="date">
                <p>{{ getClockOut(date) }}</p>
            </div>
        </div>
        <div class="colum" id="colum">
            <div class="label">
                <label for="rest">休憩</label>
            </div>
            <div class="content" id="content" v-for="date in dateArray" :key="date">
                <p>{{ getRest(date) }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
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

#date:hover {
    cursor: pointer;
    opacity: 0.6;
}
</style>
