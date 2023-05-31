import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
//認証に必要
import firebase from '../firebase'
import { getAuth } from 'firebase/auth'
//
// import HomeView from '../views/HomeView.vue'
import TopPage from '../views/TopPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TOP',
      component: TopPage,
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    //   meta: { requiresAuth: true } // 認証が必要なページにつける
    // },
    {
      path: '/registerTest',
      name: 'registerTest',
      component: () => import('../views/RegisterTest.vue')
    },
    {
      path: '/s3test',
      name: 's3test',
      component: () => import('../views/s3test.vue')
    },
    // {

    //   path: '/about',
    //   name: 'about',
    //   component: () => import('../views/AboutView.vue'),
    //   meta: { requiresAuth: true } // 認証が必要なページにつける
    // },
    // {
    //   path: '/registerTest',
    //   name: 'registerTest',
    //   component: () => import('../views/RegisterTest.vue')
    // },
    {
      path: '/userRegister',
      name: 'ユーザー登録',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserRegister.vue')
    },
    {
      path: '/dayWork',
      name: '日次勤怠',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DayWork.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/monthWork',
      name: '月次勤怠',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MonthWork.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/monthWorkTest',
      name: '月次勤怠test',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MonthWork_test.vue'),
    },
    {
      path: '/setting',
      name: '各種設定',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SetupPass.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'ログイン',
      component: () => import('../views/Login.vue')
    }
  ]
})

//認証に必要
const auth = getAuth(firebase)

router.beforeEach((to, from, next) => {
  const currentUser = auth.currentUser // auth.currentUserを使用する
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  console.log(currentUser?.uid)
  console.log(requiresAuth)

  if (requiresAuth && !currentUser) {
    next('/login') // 認証がない場合はregister画面に遷移
  } else {
    next()
  }
})
//

export default router
