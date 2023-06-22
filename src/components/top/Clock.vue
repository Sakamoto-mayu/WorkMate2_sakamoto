<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 日付
const today = new Date();
const week = today.getDay();
const days = ['日', '月', '火', '水', '木', '金', '土'];
const dayOfWeek = '(' + days[week] + ')';
console.log(dayOfWeek);
const currentDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + dayOfWeek

// 現在時刻
const currentTime = ref(new Date().toLocaleTimeString());

onMounted(() => {
    // 現在時刻を１秒ごとに更新して表示する
    setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString();
    }, 1000);
})

</script>

<template>
        <table border="1" style="border-collapse: collapse" class="clock">
            <thead>
                <tr>
                    <th class="title">現在時刻</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="today">{{ currentDate }}</td>
                </tr>
                <tr>
                    <td class="now">{{ currentTime }}</td>
                </tr>
            </tbody>
        </table>
</template>

<style scoped>
.clock {
    width: 250px;
}

thead tr {
    height: 25px;
}

tbody tr {
    height: 50px;
    color: #977A58;
}

.today,
.now {
    /* width: 250px; */
    font-size: 25px;
    text-align: center;
}

.title {
    text-align: left;
    padding-left: 10px;
}
</style>
