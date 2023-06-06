<script setup lang="ts">
</script>

<template>
    <h2 class="pageTitle">承認履歴</h2>
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
                <div class="content">
                    <!-- <p>{{ value }}</p> -->
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="weekDay">曜日</label>
                </div>
                <div class="content" id="content">
                    <!-- <p>（{{ value }}）</p> -->
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="attendance">出欠</label>
                </div>
                <div class="content" id="content">
                    <!-- <p>{{ value }}</p> -->
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="clockIn">始業時刻</label>
                </div>
                <div class="content" id="content">
                    <!-- <p>{{ value }}</p> -->
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="clockOut">就業時刻</label>
                </div>
                <div class="content" id="content">
                    <!-- <p>{{ value }}</p> -->
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="rest">休憩時間</label>
                </div>
                <div class="content" id="content">
                    <!-- <p>{{ value }}</p> -->
                </div>
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

#content {
    border-left: 1px solid #000
}
</style>
