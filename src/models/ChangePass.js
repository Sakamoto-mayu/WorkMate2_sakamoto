const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChangePassSchema = new Schema(
  {
    email: String,
    name: String,
    password: String,
    department: String,
    role: String
  },
  { collection: 'users', versionKey: false }
)

module.exports = mongoose.model('ChangePass', ChangePassSchema)
