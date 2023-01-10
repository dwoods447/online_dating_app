
import mongoose from 'mongoose'
import User from '../models/User.js'
// import UserData from '../seed/UserData.js'
import { faker } from '@faker-js/faker'
import { defaultConfig } from '../config/default.js'
import bcrypt from 'bcryptjs'
import moment from 'moment'

const users = [
  {
    random: 'true',
    username: 'guest01',
    email: faker.internet.email(),
    password: bcrypt.hashSync('password', 12),
    gender: faker.helpers.arrayElement([
      'male',
      'female',
      'trans-male',
      'trans-female'
    ]),
    birthdate: new Date(),
    age: moment(new Date(), 'MM/DD/YYYY').diff(moment(new Date(), 'MM/DD/YYYY'), 'years'),
    ethnicity: faker.helpers.arrayElement([
      'Black/African American',
      'White/Caucasian',
      'Hispanic',
      'Indian',
      'Middle Eastern',
      'Native American',
      'Asian',
      'Mixed Race',
      'Other'
    ]),
    onlineStatus: faker.datatype.boolean(),
    seekingGenders: {
      genders: [faker.helpers.arrayElement([
        'male',
        'female',
        'trans-male',
        'trans-female'
      ])]
    },
    height: faker.datatype.number({ min: 53, max: 83 }),
    relationshipTypeSeeking: faker.helpers.arrayElement([
      'male',
      'female',
      'trans-male',
      'trans-female'
    ]),
    hairColor: faker.helpers.arrayElement([
      'black',
      'brown',
      'blonde',
      'grey',
      'pink',
      'purple',
      'red'
    ]),
    eyeColor: faker.helpers.arrayElement([
      'black',
      'brown',
      'green',
      'blue',
      'hazel'
    ]),
    highestEducation: faker.helpers.arrayElement([
      'high school',
      'some college',
      'some university',
      'bachelors degree',
      'masters degree',
      'phd/post doctoral'
    ]),
    secondLanguage: faker.helpers.arrayElement([
      'Spanish',
      'German',
      'Japanese'
    ]),
    bodyType: faker.helpers.arrayElement([
      'Prefer Not To Say',
      'Thin',
      'Athletic',
      'Average',
      'A Few Extra Pounds'
    ]),
    postalCode: faker.address.zipCodeByState(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    martialStatus: faker.helpers.arrayElement([
      'single',
      'married - interested in having an affair',
      'widowed',
      'divorced'
    ]),
    hasChildren: faker.datatype.boolean(),
    doesSmoke: faker.datatype.boolean(),
    doesDoDrugs: faker.datatype.boolean(),
    doesDrink: faker.datatype.boolean(),
    religion: faker.helpers.arrayElement([
      'christan - other',
      'angilcan',
      'muslim',
      'lutheran',
      'catholic',
      'prebyterian',
      'new age',
      'jewish',
      'buddhist',
      'hindu',
      'methodist',
      'baptist',
      'sikh',
      'other',
      'non-religous'
    ]),
    profession: faker.name.jobType(),
    doesHavePets: faker.datatype.boolean(),
    ambitiousness: '',
    datingIntent: '',
    longestRelationShip: '',
    income: '',
    doesDateInteracially: faker.datatype.boolean(),
    interacialDatingPreferences: [],
    raceDatingPreferences: [],
    isProfileCompleted: true,
    isPremiumUser: false,
    blockedUsers: { users: [] },
    favorites: { users: [] },
    profileViews: { views: [] },
    images: {
      imagePaths: [
        {
          path: `${faker.datatype.number({ min: 1, max: 98 })}.jpg`,
          date: faker.date.between()
        }
      ]
    }
  }
]

const connect = async () => {
  try {
    mongoose.connect(defaultConfig.db.connectString, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('DB CONNECTION OPEN')
  } catch (error) {
    console.log('Error connecting with Mongoose')
  }
}

function createUsers () {
  console.log('creating users...')
  const userCount = 150
  for (let i = 0; i < userCount; i++) {
    const user = createUser()
    console.log(`created user ${i + 1} of ${userCount}`)
    users.push(user)
  }
}

function createUser () {
  const birthD = faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
  const st = faker.address.stateAbbr()
  const user = {
    random: 'true',
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync(faker.internet.password(), 12),
    gender: faker.helpers.arrayElement([
      'male',
      'female',
      'trans-male',
      'trans-female'
    ]),
    birthdate: birthD,
    age: moment(new Date(), 'MM/DD/YYYY').diff(moment(birthD, 'MM/DD/YYYY'), 'years'),
    ethnicity: faker.helpers.arrayElement([
      'Black/African American',
      'White/Caucasian',
      'Hispanic',
      'Indian',
      'Middle Eastern',
      'Native American',
      'Asian',
      'Mixed Race',
      'Other'
    ]),
    onlineStatus: faker.datatype.boolean(),
    seekingGenders: {
      genders: [faker.helpers.arrayElement([
        'male',
        'female',
        'trans-male',
        'trans-female'
      ])]
    },
    height: faker.datatype.number({ min: 53, max: 83 }),
    relationshipTypeSeeking: faker.helpers.arrayElement([
      'male',
      'female',
      'trans-male',
      'trans-female'
    ]),
    hairColor: faker.helpers.arrayElement([
      'black',
      'brown',
      'blonde',
      'grey',
      'pink',
      'purple',
      'red'
    ]),
    eyeColor: faker.helpers.arrayElement([
      'black',
      'brown',
      'green',
      'blue',
      'hazel'
    ]),
    highestEducation: faker.helpers.arrayElement([
      'high school',
      'some college',
      'some university',
      'bachelors degree',
      'masters degree',
      'phd/post doctoral'
    ]),
    secondLanguage: faker.helpers.arrayElement([
      'Spanish',
      'German',
      'Japanese'
    ]),
    bodyType: faker.helpers.arrayElement([
      'Prefer Not To Say',
      'Thin',
      'Athletic',
      'Average',
      'A Few Extra Pounds'
    ]),
    postalCode: faker.address.zipCodeByState(),
    city: faker.address.city(),
    state: st,
    martialStatus: faker.helpers.arrayElement([
      'single',
      'married - interested in having an affair',
      'widowed',
      'divorced'
    ]),
    hasChildren: faker.datatype.boolean(),
    doesSmoke: faker.datatype.boolean(),
    doesDoDrugs: faker.datatype.boolean(),
    doesDrink: faker.datatype.boolean(),
    religion: faker.helpers.arrayElement([
      'christan - other',
      'angilcan',
      'muslim',
      'lutheran',
      'catholic',
      'presbyterian',
      'new age',
      'jewish',
      'buddhist',
      'hindu',
      'methodist',
      'baptist',
      'sikh',
      'other',
      'non-religous'
    ]),
    profession: faker.name.jobType(),
    doesHavePets: faker.datatype.boolean(),
    ambitiousness: '',
    datingIntent: '',
    longestRelationShip: '',
    income: '',
    doesDateInteracially: faker.datatype.boolean(),
    interacialDatingPreferences: [],
    raceDatingPreferences: [],
    isProfileCompleted: true,
    isPremiumUser: false,
    blockedUsers: { users: [] },
    favorites: { users: [] },
    profileViews: { views: [] },
    images: {
      imagePaths: [
        {
          path: `${faker.datatype.number({ min: 1, max: 98 })}.jpg`,
          date: faker.date.between()
        }
      ]
    }
  }
  return user
}

createUsers()
console.log(`users created ${JSON.stringify(users, null, 2)}`)
const seedDB = async () => {
  console.log('Deleting all users')
  await User.deleteMany({})
  console.log('Inserting all users')
  await User.insertMany(users)
}

connect()

seedDB().then(() => {
  mongoose.connection.close()
})
