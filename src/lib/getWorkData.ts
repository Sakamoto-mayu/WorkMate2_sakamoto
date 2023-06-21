import firebase from '@/firebase'
import { getAuth } from 'firebase/auth'


async function getAttendanceData() {
  const auth = getAuth(firebase)
  const currentUserEmail = auth.currentUser?.email
  console.log(currentUserEmail)
  try {
    const response = await fetch(
      `https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork`, {
        method: 'POST',
        body: JSON.stringify({
          email: currentUserEmail
        })
    })
    const attendanceData = await response.json()
    // console.log('success', attendanceData.Items);
    
    // 取得したデータを日付の降順に並べ替える
    attendanceData.Items.sort(function (x: any, y: any) {
      return x.date > y.date ? 1 : -1
    })
    // console.log(attendanceData.Items)
    return attendanceData.Items;

  } catch (error) {
    console.log(error)
  }
}

export default getAttendanceData;
