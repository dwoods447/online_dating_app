const mongoose = require('mongoose');
const config = require('./api/config/config');
const mongoURL = process.env.MONGO_URL || config.db.connectString;
const Users = require('./api/seeders/users');
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
const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports = {
  seedersList: seedersList,
  connect: connect,
  dropdb: dropdb
}
