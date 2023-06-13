import firebase from '../firebase'
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
// import { useRouter } from 'vue-router'
// import { useSelectedDateStore } from '../stores/selectedDate'

// const resetRole = useSelectedDateStore()

const auth = getAuth(firebase)

const logout = () => {
  //   const router = useRouter()
  signOut(auth)
    .then(() => {
      Cookies.remove('user')
      // resetRole.$reset
      //   router.push('/login')
      //   window.location.href = '/login' // ログアウト後に/loginに遷移
    })
    .catch((error) => {
      console.log(error)
    })
}

export default logout
