import { Seeder } from 'mongoose-data-seed'
import data from '../seed/UserData'
import User from '../models/User'
class UsersSeeder extends Seeder {
  async shouldRun () {
    console.log('Counting...')
    return User.countDocuments()
      .exec()
      .then(count => count === 0)
  }

  async run () {
    console.log('Creating...')
    return User.create(data)
  }
}

export default UsersSeeder
