const mongoose = require('mongoose');
const User = require('../models/User')
const UserData = require('../seed/UserData')
const config = require('../config/config')



const connect = async () => {
    try {
        mongoose.connect(config.db.connectString, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('DB CONNECTION OPEN');
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

  seedDB().then(()=> {
    mongoose.connection.close()
  })