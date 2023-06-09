<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSelectedDateStore } from '../stores/selectedDate'
import { getStatusName } from '@/lib/getStatusName'

import firebase from '../firebase'
import { getAuth } from 'firebase/auth'
import axios from 'axios';
import { useRouter } from 'vue-router';

const store = useSelectedDateStore()
console.log(store.selectedDate)

const handleDateInput = (event: Event) => {
  const inputDate = (event.target as HTMLInputElement).value;
  store.setSelectedDate(inputDate)
}

const attendanceType = ref<any[]>([]);

// 出欠のオプションを取得する
onMounted(async () => {
  attendanceType.value = await getStatusName();
  // console.log(attendanceType.value);
})

const auth = getAuth(firebase)
const currentUserEmail = auth.currentUser?.email

const router = useRouter()

// 始業時刻
const startHour = ref('9')
const startMin = ref('00')
const clockIn = ref('')
// 終業時刻
const finishHour = ref('18')
const finishMin = ref('00')
const clockOut = ref('')
// 休憩時間
const restHour = ref('1')
const restMin = ref('00')
const rest = ref('')

// 「現在日時の前から10文字目まで(例.2023/06/08)」もしくは「月次勤怠でクリックされた日付」を初期値に設定
const date = ref(store.selectedDate ?? new Date().toISOString().substring(0, 10))
const email = ref(currentUserEmail)
const status = ref('出勤')
const errMsg = ref('')

const department = ref('')

const submitDayWorkData = async (e: Event) => {
  const selectedDate = new Date(date.value)
  // console.log(selectedDate);

  //departmentを取得
  axios
    .get('http://localhost:3000/userData', { params: { email: currentUserEmail } })
    .then((response) => {
      // const department = response.data[0].department
      department.value = response.data[0].department
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  // dateの値から月を取得する
  const month = String(selectedDate.getMonth() + 1)
  // console.log(month)

  // dateの値から曜日を取得する
  const days = ['日', '月', '火', '水', '木', '金', '土']
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
  if (status.value === '欠勤' || status.value === '有給' || status.value === '特休') {
    if (date.value === '') {
      errMsg.value = '※日付を入力してください'
      return;
    } else {
      // 欠勤・有給・特休を登録する時は、日付以外の値を'-'にする
      clockIn.value = '-'
      clockOut.value = '-'
      rest.value = '-'
    }
  } else {
    if (
      startHour.value === '' ||
      startMin.value === '' ||
      finishHour.value === '' ||
      finishMin.value === '' ||
      date.value === '' ||
      dayOfWeek === '' ||
      status.value === '' ||
      restHour.value === '' ||
      restMin.value === ''
    ) {
      errMsg.value = '※未入力箇所があります'
      return;
    } else {
      errMsg.value = ''
    }
  }
  // // 既にemailとdateが存在する場合（isDataExist = true）はPOSTさせない
  // const isDataExist = await checkEmailAndDate()
  // if (isDataExist) {
  //   console.log('既にデータが存在します')
  //   errMsg.value = '※この対象日は既に登録済みです'
  //   return;
  // }

  // prisma用
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     email: email.value,
  //     month: month,
  //     date: date.value,
  //     day: dayOfWeek,
  //     status: status.value,
  //     clockIn: clockIn.value,
  //     clockOut: clockOut.value,
  //     rest: rest.value
  //   })
  // }

  // const result = await fetch('http://localhost:8000/PostDayWork', options)
  // console.log('承認依頼完了', result);
  // router.push('/monthWork');

  // DynamoDB へ登録
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      month: month,
      date: date.value,
      day: dayOfWeek,
      status: status.value,
      clockIn: clockIn.value,
      clockOut: clockOut.value,
      rest: rest.value,
      admin: false,
      gm: false,
      department: department.value
    })
  }
  const result = await fetch('https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork', options)
  console.log('承認依頼完了', result);
  router.push('/monthWork');
  // PUTに施工したら、日付を現在日時に戻す
  store.setSelectedDate(new Date().toISOString().substring(0, 10))
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
            <input type="date" v-model="date" @input="handleDateInput"/>
          </div>
        </div>
        <div class="row">
          <div class="label">
            <label for="status">出欠</label>
          </div>
          <div class="content">
            <select name="status" id="status" v-model="status">
              <option v-for="item in attendanceType" :key="item.id" :value="item.status_name">{{ item.status_name }}
              </option>
            </select>
            <p class="statusMsg">※欠勤・有給・特休を選択した場合、就業時刻と休憩時間は「-」になります。</p>
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
          <div class="label" id="rest">
            <label for="rest">休憩時間</label>
          </div>
          <div class="content" id="rest">
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
          <button type="submit" class="submit-button">承認依頼</button>&nbsp;
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
  border: 1px solid #977a58;
  border-radius: 5px;
  background-color: #f6e9d8;
  color: #977a58;
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
  border-bottom: none;
}

.content {
  display: flex;
  justify-content: left;
  padding: 5px;
  width: 500px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
}

.statusMsg {
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 12px;
}

#rest {
  border-bottom: 1px solid #000;
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
  border: 1px solid #977a58;
  border-radius: 100vh;
  background-color: #977a58;
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
