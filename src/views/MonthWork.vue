<script setup lang="ts">
import SelectMonth from '../components/month/SelectMonth.vue'
import MonthlyTable from '../components/month/MonthlyTable.vue';
</script>

<template>
    <h2 class="pageTitle">月次勤怠データ</h2>
    <SelectMonth />
    <MonthlyTable />
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
</style>
