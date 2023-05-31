import firebase from '../firebase'
import { getAuth, signOut } from 'firebase/auth'
import Cookies from 'js-cookie'
// import { useRouter } from 'vue-router'

const auth = getAuth(firebase)

const logout = () => {
  //   const router = useRouter()
  signOut(auth)
    .then(() => {
      Cookies.remove('user')
      //   router.push('/login')
      //   window.location.href = '/login' // ログアウト後に/loginに遷移
    })
    .catch((error) => {
      console.log(error)
    })
}

export default logout
