/* eslint-disable no-undef */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GetAllUsersListSchema = new Schema(
  {
    _id: String,
    email: String,
    name: String,
    password: String,
    department: String,
    role: String
  },
  { collection: 'users' }
)

module.exports = mongoose.model('GetAllUsersList', GetAllUsersListSchema)
