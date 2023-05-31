/* eslint-disable no-undef */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GetUsersListSchema = new Schema(
  {
    email: String,
    name: String,
    password: String
  },
  { collection: 'users' }
)

module.exports = mongoose.model('GetUserList', GetUsersListSchema)

