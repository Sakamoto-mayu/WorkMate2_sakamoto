<script setup lang="ts">
import { ref } from 'vue';

import firebase from '../firebase'
import { getAuth } from 'firebase/auth'

const auth = getAuth(firebase)
const currentUserEmail = auth.currentUser?.email

// 始業時刻
const startHour = ref('');
const startMin = ref('');
const clockIn = ref('');
// 終業時刻
const finishHour = ref('');
const finishMin = ref('');
const clockOut = ref('');
// 休憩時間
const restHour = ref('');
const restMin = ref('');
const rest = ref('');

const date = ref('');
const email = ref(currentUserEmail);
const status = ref('');
const errMsg = ref('');

// 取得した勤怠データ（email,date）と入力値を比較する
const checkEmailAndDate = async () => {
    const response = await fetch(`http://localhost:8000/GetAttendanceData`)
    const attendanceData = await response.json();
    console.log(attendanceData);
    console.log(date.value)
    // 勤怠データからemailとdateの値を取り出す
    const newArray = attendanceData.map((item: any) => ({ email: item.email, date: item.date }))
    // console.log(newArray)

    // emailとdateの値が存在するかの判定
    const isDataExist = newArray.some((item: any) => item.email === email.value && item.date === date.value);
    if (isDataExist) {
        return true;
    } else {
        return false;
    }
}

const submitDayWorkData = async (e: Event) => {
    // dateの値から曜日を取得する
    const selectedDate = new Date(date.value);
    // console.log(selectedDate);
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const dayOfWeek = days[selectedDate.getDay()]

    // 始業時刻
    clockIn.value = startHour.value + ':' + startMin.value
    // console.log(clockIn.value)

    // 終業時刻
    clockOut.value = finishHour.value + ':' + finishMin.value
    // console.log(clockOut.value)

    // 休憩時間
    rest.value = restHour.value + ':' + restMin.value
    // console.log(rest.value)

    e.preventDefault()
    if (clockIn.value === '' || clockOut.value === '' || date.value === '' || dayOfWeek === '' || status.value === '' || rest.value === '') {
        errMsg.value = '※未入力箇所があります';
        return;
    } else {
        errMsg.value = '';
    }
    // 既にemailとdateが存在する場合（isDataExist = true）はPOSTさせない
    const isDataExist = await checkEmailAndDate();
    if (isDataExist) {
        console.log('既にデータが存在します')
        errMsg.value = '※この対象日は既に登録済みです'
        return;
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            date: date.value,
            day: dayOfWeek,
            status: status.value,
            clockIn: clockIn.value,
            clockOut: clockOut.value,
            rest: rest.value
        })
    }
    const result = await fetch('http://localhost:8000/PostDayWork', options)
    console.log('success', result)
}

</script>

<template>
    <h2 class="pageTitle">日次勤怠</h2>
    <div class="dayWork">
        <form @submit="submitDayWorkData">
            <h3>勤怠入力</h3>
            <div class="table">
                <div class="row">
                    <div class="label">
                        <label for="workPlace">就業先</label>
                    </div>
                    <div class="content">
                        <p>株式会社ラクスパートナーズRP 社内業務</p>
                    </div>
                </div>
                <div class="row">
                    <div class="label">
                        <label for="date">対象日</label>
                    </div>
                    <div class="content">
                        <input type="date" v-model="date">
                    </div>
                </div>
                <div class="row">
                    <div class="label">
                        <label for="status">出欠</label>
                    </div>
                    <div class="content">
                        <select name="" id="" v-model="status">
                            <option value="出勤">出勤</option>
                            <option value="有給">有給</option>
                            <option value="半休">半休</option>
                            <option value="特休">特休</option>
                            <option value="欠勤">欠勤</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="label">
                        <label for="status">就業時刻</label>
                    </div>
                    <div class="content">
                        <select name="hour1" v-model="startHour">
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                        </select>：
                        <select name="min1" v-model="startMin">
                            <option value="00">00</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>&nbsp;～&nbsp;
                        <select name="hour2" v-model="finishHour">
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="20">21</option>
                        </select>：
                        <select name="min2" v-model="finishMin">
                            <option value="00">00</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="label">
                        <label for="">休憩時間</label>
                    </div>
                    <div class="content">
                        <select v-model="restHour">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>：
                        <select name="" id="" v-model="restMin">
                            <option value="00">00</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                </div>
                <div class="errMsg">
                    <p class="errMsg" v-if="errMsg">{{ errMsg }}</p>
                </div>
                <!-- <div class="row">
                    <div class="label">
                        <label for="">コメント</label>
                    </div>
                    <div class="content">
                        <input type="text" size="50">
                    </div>
                </div> -->
                <div class="button">
                    <button type="submit" class="submit-button">登録</button>&nbsp;
                    <!-- <button class="request-button">承認依頼</button> -->
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.pageTitle {
    width: max-content;
    margin: 10px 0;
    padding: 0 5px;
    border: 1px solid #977A58;
    border-radius: 5px;
    background-color: #F6E9D8;
    color: #977A58;
}

.table {
    display: flex;
    flex-direction: column;
}

.row {
    display: flex;
}

.label {
    padding: 5px;
    width: 100px;
    border: 1px solid #000;
}

.content {
    display: flex;
    justify-content: left;
    padding: 5px;
    width: 500px;
    border: 1px solid #000;
}

.button {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.submit-button {
    width: 200px;
    height: 30px;
    cursor: pointer;
    border: 1px solid #977A58;
    border-radius: 100vh;
    background-color: #977A58;
    color: #fff;
}

.submit-button:hover {
    opacity: 0.8;
}

.errMsg {
    text-align: center;
    margin: 10px 0;
    width: 200px;
    color: red;
    font-size: 12px;
}
</style>
