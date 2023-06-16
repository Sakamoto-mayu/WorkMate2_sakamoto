<script setup lang="ts">
import { ref } from 'vue';
import { useUpdateMonthStore } from '@/stores/updateMonth';
// import { getMonthlyDate } from '@/lib/getMonthlyDate';

const store = useUpdateMonthStore();
const today = ref(store.newToday)
const currentMonth = ref(today.value.getFullYear() + '年' + (today.value.getMonth() + 1) + '月')
// console.log(currentMonth.value);

// 「◀」ボタンクリックで前月のデータを表示する
const prevMonth = () => {
    today.value.setMonth(today.value.getMonth() - 1)
    currentMonth.value = today.value.getFullYear() + '年' + (today.value.getMonth() + 1) + '月'
    const year = today.value.getFullYear()
    const month = today.value.getMonth() + 1
    store.updateYear(year)
    store.updateMonth(month)
    const newToday = today.value
    store.setToday(newToday)
}

// 「▶」ボタンクリックで次月のデータを表示する
const nextMonth = () => {
    today.value.setMonth(today.value.getMonth() + 1)
    currentMonth.value = today.value.getFullYear() + '年' + (today.value.getMonth() + 1) + '月'
    const year = today.value.getFullYear()
    const month = today.value.getMonth() + 1
    store.updateYear(year)
    store.updateMonth(month)
    const newToday = today.value
    store.setToday(newToday)
}

</script>

<template>
    <div class="selectMonth">
        <button @click="prevMonth">◀</button>
        <p>{{ currentMonth }}</p>
        <button @click="nextMonth">▶</button>
    </div>
</template>

<style scoped>
.selectMonth {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
}

.selectMonth p {
    font-size: 25px;
    color: #977A58;
}

.selectMonth button {
    cursor: pointer;
    background-color: #fff;
    color: #977A58;
    border: none;
    font-size: 20px;
}

.selectMonth button:hover {
    opacity: 0.6;
}
</style>
