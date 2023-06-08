import firebase from '@/firebase'
import { getAuth } from 'firebase/auth'

const auth = getAuth(firebase)
const currentUserEmail = auth.currentUser?.email
// console.log(currentUserEmail)

async function getAttendanceData() {
  try {
    const response = await fetch(
      `https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork?email=${currentUserEmail}`
    )
    const attendanceData = await response.json()
    // console.log('success', attendanceData)

    // 取得したデータを日付の降順に並べ替える
    attendanceData.sort(function (x: any, y: any) {
      return x.date > y.date ? 1 : -1
    })
    // console.log(attendanceData)
    return attendanceData;

  } catch (error) {
    console.log(error)
  }
}

export default getAttendanceData;
