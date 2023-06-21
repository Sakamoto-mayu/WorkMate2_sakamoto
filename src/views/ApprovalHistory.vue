<script setup lang="ts">
import firebase from '../firebase'
import { getAuth } from 'firebase/auth'
import { getApprovedDataByGM, getApprovedDataByHRD, getApprovedDataByGAD, getApprovedDataByDD } from "@/lib/getApprovedData";
import { ref, onMounted } from 'vue';
import { getUserList } from '@/lib/getUserList'

const auth = getAuth(firebase)
const currentUserEmail = auth.currentUser?.email
// console.log(currentUserEmail)

const department = ref('')
const role = ref('')

// emailをキーにしてログインユーザーの権限・部署を取得する(mongoDB)
const getUserDepartmentAndRole = async () => {
    try {
        const response = await fetch(`http://localhost:3000/userData?email=${currentUserEmail}`)
        const userData = await response.json();
        department.value = userData[0].department
        // console.log(department.value)
        role.value = userData[0].role
        // console.log(role.value)
    } catch (error) {
        console.log('失敗', error)
    }
}
getUserDepartmentAndRole()

// 承認済み勤怠データ一覧
const approvedData = ref([] as any[]);

// 権限と部署の値によって表示するデータを取得する
onMounted(async () => {
    await getUserDepartmentAndRole()
    // console.log(role)
    if (role.value === 'GM') {
        approvedData.value = await getApprovedDataByGM()
    } else if (role.value === 'Admin') {
        if (department.value === '総務') {
            approvedData.value = await getApprovedDataByGAD()
        } else if (department.value === '人事') {
            approvedData.value = await getApprovedDataByHRD()
        } else {
            approvedData.value = await getApprovedDataByDD()
        }
    }
})


const userList = ref([] as any[])
// ユーザー情報一覧を取得する
onMounted(async () => {
    userList.value = await getUserList()
})

const getUserName = (email: any) => {
    const user = userList.value.find((data) => data.email === email)
    console.log(approvedData.value)
    console.log(userList.value)
    return user ? user.name : '-'
}

</script>

<template>
    <h2 class="pageTitle">承認済勤怠履歴</h2>
    <div class="approvalHistory">
        <div class="table">
            <div class="colum">
                <div class="label">
                    <label for="userName">ユーザ名</label>
                </div>
                <div class="content" v-for="(data, index) in approvedData" :key="index">
                    <p>{{ getUserName(data.email) }}</p>
                </div>
            </div>
            <div class="colum">
                <div class="label">
                    <label for="date">日付</label>
                </div>
                <div class="content" id="content" v-for="(data, index) in approvedData" :key="index">
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
