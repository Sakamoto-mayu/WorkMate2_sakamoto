<script setup lang="ts">
import { getApprovedData } from "@/lib/getApprovedData";
import { ref, onMounted } from 'vue';

// 承認済み勤怠データを表示する
const approvedData = ref([]as any[]);

onMounted(async () => {
    approvedData.value = await getApprovedData()
    console.log(approvedData.value);
})
</script>

<template>
    <h2 class="pageTitle">承認済勤怠履歴</h2>
    <div class="approvalHistory">
        <div class="table">
            <div class="colum">
                <div class="label">
                    <label for="userName">ユーザ名</label>
                </div>
                <div class="content">
                    <!-- <p>{{ value }}</p> -->
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="date">日付</label>
                </div>
                <div class="content" v-for="(data, index) in approvedData" :key="index">
                    <p>{{ data.date }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="day">曜日</label>
                </div>
                <div class="content" id="content" v-for="(data, index) in approvedData" :key="index">
                    <p>（{{ data.day }}）</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="attendance">出欠</label>
                </div>
                <div class="content" id="content" v-for="(data, index) in approvedData" :key="index">
                    <p>{{ data.status }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="clockIn">始業時刻</label>
                </div>
                <div class="content" id="content" v-for="(data, index) in approvedData" :key="index">
                    <p>{{ data.clockIn || '-' }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="clockOut">就業時刻</label>
                </div>
                <div class="content" id="content" v-for="(data, index) in approvedData" :key="index">
                    <p>{{ data.clockOut || '-' }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="rest">休憩時間</label>
                </div>
                <div class="content" id="content" v-for="(data, index) in approvedData" :key="index">
                    <p>{{ data.rest || '-' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pageTitle {
  width: max-content;
  margin: 10px 0;
  padding: 0 5px;
  border: 1px solid #977a58;
  border-radius: 5px;
  background-color: #f6e9d8;
  color: #977a58;
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
