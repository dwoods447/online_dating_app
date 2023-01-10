import mongoose from 'mongoose'
import User from '../models/User.js'
import UserData from '../seed/UserData.js'
import { defaultConfig }  from '../config/default.js'

const connect = async () => {
  try {
    mongoose.connect( defaultConfig.db.connectString, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('DB CONNECTION OPEN')
  } catch (error) {
    console.log('Error connecting with Mongoose')
  }
}

const seedDB = async () => {
  console.log('Deleting all users')
  await User.deleteMany({})
  console.log('Inserting all users')
  await User.insertMany(UserData)
}

connect()

seedDB().then(() => {
  mongoose.connection.close()
})
