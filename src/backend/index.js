const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const GetUserList = require('../models/GetUsers')
const PostUser = require('../models/PostUser')
const ChangePass = require('../models/ChangePass')

const connectOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb://127.0.0.1:27017/userData', connectOption)
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/userData', (req, res) => {
  const { email, pass, id } = req.query

  if (email) {
    if (email === '*') {
      GetUserList.find()
        .then((result) => {
          return res.json(result)
        })
        .catch((err) => {
          console.error(err)
          return res.status(500).send('取得できませんでした')
        })
    } else {
      // メールアドレスを検索条件としてデータを取得するハンドラ
      GetUserList.find({ email: email })
        .then((result) => {
          return res.json(result)
        })
        .catch((err) => {
          console.error(err)
          return res.status(500).send('取得できませんでした')
        })
    }
  } else if (pass && id) {
    // パスワードとIDを検索条件としてデータを取得するハンドラ
    ChangePass.find({ $and: [{ password: pass }, { _id: id }] })
      .then((result) => {
        return res.json(result)
      })
      .catch((err) => {
        console.error(err)
        return res.status(500).send('取得できませんでした')
      })
  } else {
    return res.status(400).send('無効なリクエスト')
  }
})

app.post('/userData', (req, res) => {
  const { id, newPass, newRole } = req.body

  if (id && newPass) {
    // パスワードを変更する処理
    ChangePass.findByIdAndUpdate(id, { password: newPass }, { new: true })
      .then((result) => {
        return res.json(result)
      })
      .catch((err) => {
        console.error(err)
        return res.status(500).send('パスワードの変更に失敗しました')
      })
  } else if (id && newRole) {
    // roleを変更する処理
    ChangePass.findByIdAndUpdate(id, { role: newRole }, { new: true })
      .then((result) => {
        return res.json(result)
      })
      .catch((err) => {
        console.error(err)
        return res.status(500).send('roleの変更に失敗しました')
      })
  } else {
    // 新しいユーザーを作成する処理
    const userData = req.body
    const newUser = new PostUser(userData)

    newUser
      .save()
      .then((result) => {
        return res.json(result)
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).send('失敗しました')
      })
  }
})

app.listen(process.env.PORT || 3000)
