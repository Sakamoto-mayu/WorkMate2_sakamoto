import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


// import AWS from 'aws-sdk'

// const bucketRegion = import.meta.env.VITE_REGION
// const IdentityPoolId = import.meta.env.VITE_POOL_ID

// AWS.config.region = import.meta.env.VITE_REGION
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: import.meta.env.VITE_POOL_ID
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
