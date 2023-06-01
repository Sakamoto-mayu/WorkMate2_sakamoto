<script setup lang="ts">
import { ref } from 'vue'
import { saveCsvToS3, s3 } from '../lib/s3Methods'
import axios from 'axios'
import json2csv from '../lib/json2csv'
import AWS from 'aws-sdk'
import getCalendarArray from '../lib/getMonth'
import Run from '../lib/ddb_query'

const selectedFile = ref<File | null>(null)

const calender = getCalendarArray(2023, 6)

console.log(calender)

// Run()

const getCSV = async () => {
  // const getDate = () => {
  //   const date = new Date()
  //   const year = date.getFullYear()
  //   const month = date.getMonth() + 1
  //   const day = date.getDate()
  //   if (month < 10 && day < 10) {
  //     return `${year}-0${month}-0${day}`
  //   } else if (month < 10) {
  //     return `${year}-0${month}-${day}`
  //   } else if (day < 10) {
  //     return `${year}-${month}-0${day}`
  //   } else {
  //     return `${year}-${month}-${day}`
  //   }
  // }
  // await axios
  //   .get('http://localhost:3000/userData', { params: { email: 'rakus@example.com' } })
  //   .then((response) => {
  //     // console.log(response.data[0])
  //     const data = response.data
  //     const csv = json2csv(data)
  //     try {
  //       const uploadParams = {
  //         Bucket: 'workmate-s3',
  //         Key: getDate(),
  //         Body: csv,
  //         ContentType: 'text/csv'
  //       }
  //       s3.upload(uploadParams).promise()
  //       console.log('CSVファイルがS3に保存されました。')
  //     } catch (error) {
  //       console.error('CSVファイルの保存中にエラーが発生しました:', error)
  //     }
  //     const downloadLink = document.createElement('a')
  //     downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
  //     downloadLink.download = 'data.csv'
  //     downloadLink.style.display = 'none'
  //     document.body.appendChild(downloadLink)
  //     downloadLink.click()
  //     document.body.removeChild(downloadLink)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
}

const handleSubmit = (event: any) => {
  event.preventDefault() // フォームが送信されたときにページがリロードされないようにする
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
  }
}

const uploadCsv = async () => {
  const file = selectedFile.value
  if (!file) {
    console.error('ファイルが選択されていません。')
    return
  }
  // await axios
  //   .put('https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/s3', {
  //     Bucket: 'workmate-s3',
  //     Key: file.name,
  //     Body: file,
  //     ContentType: 'text/csv'
  //   })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err))
  await axios
    .put('https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/s3', {
      Key: file.name,
      Body: file,
      ContentType: 'text/csv'
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  // try {
  //   const file = selectedFile.value
  //   if (!file) {
  //     console.error('ファイルが選択されていません。')
  //     return
  //   }

  //   await saveCsvToS3(file)
  //   // console.log('CSVファイルがS3にアップロードされました。')
  // } catch (error) {
  //   console.error('CSVファイルのアップロード中にエラーが発生しました:', error)
  // }
}
</script>

<template>
  <div>
    <h1>S3テスト</h1>
    <form @submit="handleSubmit">
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button @click="uploadCsv">CSVファイルをアップロード</button>
    </form>
    <button @click="getCSV">CSV取得</button>
  </div>
</template>
