<script lang="ts">
export default {
    data() {
        return {
            now: "",
            today: "",
        };
    },
    mounted() {
        this.updateTime();
        setInterval(this.updateTime, 1000); // 1秒ごとに時間を更新
        const date = new Date();
        const week = date.getDay()
        const weekItems = ['日', '月', '火', '水', '木', '金', '土'];
        const dayOfWeek = weekItems[week];
        this.today = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + "(" + dayOfWeek +")"

    },
    methods: {
        updateTime() {
            this.now = new Date().toLocaleTimeString();
        },
    },
};

// const data = new Date();
// const today = data.getFullYear() + '年' + (data.getMonth() + 1) + '月' + data.getDate() + '日'
// console.log(today);

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
                    <td class="today">{{ today }}</td>
                </tr>
                <tr>
                    <td class="now">{{ now }}</td>
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
