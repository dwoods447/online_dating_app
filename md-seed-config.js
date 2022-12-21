const mongoose = require('mongoose');
const config = require('./api/config/config');
const mongoURL = process.env.MONGO_URL || config.db.connectString;
const Users = require('./api/seeders/users');
mongoose.set('bufferCommands', false);
/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  Users
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
// 
async function connect () {
  console.log(`Connecting...`)
  try {
    return await mongoose.connect(config.db.connectString, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch (error) {
    console.log('Error connecting with Mongoose')
  }
}
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */

async function dropDB () {
  console.log(`Dropping...`)
  try {
     return await await mongoose.connection.db.dropDatabase();
  } catch (error) {
    console.log('Error dropping')
  }
}

require('./api/models/User')
require('./api/models/Message')
module.exports = {
  connect: connect,
  dropdb: dropDB,
  seedersList: seedersList,
}
