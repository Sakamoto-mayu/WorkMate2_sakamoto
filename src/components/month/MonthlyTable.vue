<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue';
// import getMonthlyDate from '@/lib/getMonthlyDate'
import getAttendanceData from '@/lib/getWorkData';
import { useSelectedDateStore } from '@/stores/selectedDate'
import { useUpdateMonthStore } from '@/stores/updateMonth'
import { useRouter } from 'vue-router';

const store = reactive(useUpdateMonthStore())
const router = useRouter()


// 日付の一覧を取得する
const getMonthlyDate = () => {
    // 今日
    const today = ref(store.newToday)
    console.log(today.value)

    // 曜日
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    // 月初
    const firstDay = ref(new Date(today.value.getFullYear(), today.value.getMonth(), 1))
    // console.log(firstDay)
    // 月末
    const lastDay = ref(new Date(today.value.getFullYear(), today.value.getMonth() + 1, 0))

    
    // 当月の月初から月末までの日付を取得する
    const currentDate = firstDay
    const monthlyDatesArray: any = []
    while (currentDate.value <= lastDay.value) {
        let monthlyDate =
            currentDate.value.getFullYear() +
            '-' +
            (currentDate.value.getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            currentDate.value.getDate().toString().padStart(2, '0') +
            '(' + days[currentDate.value.getDay()] + ')';
        monthlyDatesArray.push(monthlyDate)
        currentDate.value.setDate(currentDate.value.getDate() + 1)
    }
    // console.log(monthlyDatesArray)
    return monthlyDatesArray;
}

watch(() => store.newToday, () => {
    getMonthlyDate()
})

// 日付のみ
const dateArray = getMonthlyDate().map((date: any) => date.slice(0, 10))
// console.log(dateArray)
// 曜日のみ
const dayArray = getMonthlyDate().map((date: any) => date.slice(-3))
// console.log(dayArray)

// 日付をクリックするとdateの値をstoreに保持し、日次勤怠へ遷移する
function handleDateClick(date: any) {
    const dateStore = useSelectedDateStore();
    dateStore.setSelectedDate(date);
    router.push({ path: '/dayWork' });
}

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
                <label for="day">曜日</label>
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
