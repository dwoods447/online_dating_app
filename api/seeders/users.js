const { Seeder } = require('mongoose-data-seed');
const data = require('../seed/UserData.js');
const User = require('../models/User');
class UsersSeeder extends Seeder {

    async shouldRun() {
      console.log(`Counting...`)
      return User.countDocuments()
        .exec()
        .then(count => count === 0);
    }

    async run() {
      console.log(`Creating...`)
      return User.create(data);
    }
  }

module.exports = UsersSeeder;
