<script setup lang="ts">
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCNnVJtsQ9FJp8DAa2Ms-P63S7cMeFupnE',
  authDomain: 'workmate-d451a.firebaseapp.com',
  projectId: 'workmate-d451a',
  storageBucket: 'workmate-d451a.appspot.com',
  messagingSenderId: '508482000907',
  appId: '1:508482000907:web:03852fe4081b6949478f0e'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
</script>
