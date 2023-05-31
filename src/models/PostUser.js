/* eslint-disable no-undef */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const PostUserSchema = new mongoose.Schema({
//   name: String,
//   password: String,
//   email: String
// })

const PostUserSchema = Schema(
  {
    name: String,
    password: String,
    email: String
  },
  { collection: 'users' }
)
module.exports = mongoose.model('PostUser', PostUserSchema)
