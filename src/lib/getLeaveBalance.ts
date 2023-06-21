// leave_balanceテーブルから有給残日数を取得する
import firebase from '@/firebase'
import { getAuth } from 'firebase/auth'

const getLeaveBalance = async () => {
    const auth = getAuth(firebase)
    const currentUserEmail = auth.currentUser?.email
    console.log(currentUserEmail)
    try {
        const response = await fetch(`http://localhost:8000/GetLeaveBalanceData`)
        const leaveBalanceData = await response.json()
        console.log(leaveBalanceData)
        const leaveBalance = leaveBalanceData.filter((item: any) => item.user_email === currentUserEmail)
        console.log(leaveBalance)
        return leaveBalance;
    } catch (error) {
        console.log(error)
    }
}

export default getLeaveBalance
