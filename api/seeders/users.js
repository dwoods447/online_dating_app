const { Seeder } = require('mongoose-data-seed');
const data = require('../seed/UserData.js');
const User = require('../models/User.js');

class UsersSeeder extends Seeder {

    async shouldRun() {
      return User.countDocuments()
        .exec()
        .then(count => count === 0);
    }

    async run() {
      return User.create(data);
    }
  }

module.exports = UsersSeeder;
