<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 日付
const today = new Date();
const week = today.getDay();
const days = ['日', '月', '火', '水', '木', '金', '土'];
const dayOfWeek = '(' + days[week] + ')';
console.log(dayOfWeek);
const currentDate = today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日' + dayOfWeek

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
    <div class="wrap" id="app">
        <table border="1" style="border-collapse: collapse">
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
    </div>
</template>

<style scoped>
.wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    width: 280px;
    font-size: 25px;
    text-align: center;
}

.title {
    text-align: left;
    padding-left: 10px;
}
</style>
