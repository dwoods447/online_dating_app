import mongoose from 'mongoose'
import supertest from 'supertest'
import { jest, describe, it, expect, afterEach, beforeEach } from '@jest/globals'
import { faker } from '@faker-js/faker'
import userService from '../api/services/userService.js'
import { createServer } from '../api/utils/server.js'
import { defaultConfig } from '../api/config/default.js'
import jwtToken from 'jsonwebtoken'
import User from '../api/models/User.js'
const app = createServer()
const secret = defaultConfig.authentication.jwtSecret
// https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export


const user1Id = new mongoose.Types.ObjectId()
const user2Id = new mongoose.Types.ObjectId()

let currentUser = {}
let targetUser = {}




beforeEach(async () => {
// jest.resetModules()
  currentUser = {
    _id: user1Id,
    random: 'false',
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'password',
    gender: faker.helpers.arrayElement([
      'male',
      'female',
      'trans-male',
      'trans-female'
    ]),
    birthdate: new Date(),
    age: 22,
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
  }

  targetUser = {
    _id: user2Id,
    random: 'false',
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'password',
    gender: faker.helpers.arrayElement([
      'male',
      'female',
      'trans-male',
      'trans-female'
    ]),
    birthdate: new Date(),
    age: 23,
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
  }
})


function getJwt(userEmail, userID){
  return jwtToken.sign({
    email: userEmail,
    userId: userID
  }, secret, { expiresIn: '1h' })
}

afterEach(async () => {
  // restore the spy created with spyOn
  jest.restoreAllMocks()
})



describe('ProfileController - getUsersInFavoriteList', () => {
  describe('get favorite list', () => {
    it('should return a 401 unauthroized given no userId supplied', async () => {
      await supertest(app).get('/user-list/favorites').expect(401)
    })
    it('should return a 200 and a list of favorites given a user exists', async () => {
      const userServicedMock = jest.spyOn(userService, 'findUsersFavorites').mockReturnValueOnce(currentUser)

      const currentUserFavorites = {
        favorites: {
          users: [
            { userId: new mongoose.Types.ObjectId().toString() }
          ] 
        }
      }
      Object.assign(currentUser, currentUserFavorites)
      const jwt = getJwt(currentUser.email, currentUser._id.toString())
      const { body, status } = await supertest(app)
      .get('/user-list/favorites')
      .set("Authorization", `Bearer ${jwt}`)
      .send({userId: currentUser._id.toString()}).expect(200)

      expect(userServicedMock).toHaveBeenCalled()
      expect(body.favoriteList).toMatchObject(currentUserFavorites.favorites.users)
    })
  })
})

describe('ProfileController - getUsersInBlockList', () => {
  describe('get blocked list', () => {
    it('should retun a 401 unauthroized given no userId supplied', async () => {
      await supertest(app).get('/user-list/blocked').expect(401)
    })
    it('should return a 200 and the users\' block list given a user exists', async () => {
      const userServicedMock = jest.spyOn(userService, 'findUsersInBlockedList').mockReturnValueOnce(currentUser)
  
      const currentUserBlockedList = {
        blockedUsers: {
          users: [
            {
              userId: targetUser._id.toString()
            }
          ] 
        }
      }
      const jwt = getJwt(currentUser.email, currentUser._id.toString())
      Object.assign(currentUser, currentUserBlockedList)
      const { body, status } = await supertest(app)
      .get('/user-list/blocked')
      .set("Authorization", `Bearer ${jwt}`)

      expect(status).toBe(200)
      expect(userServicedMock).toHaveBeenCalled()
      expect(body.blockList).toMatchObject(currentUserBlockedList.blockedUsers.users)
    })
  })
})

describe('ProfileController - getRandomTenRandomUsers', ()=> {
  describe('retrieve random users', ()=> {
    it('should return a list of 10 users', async () => {
      const userServicedMock = jest.spyOn(userService, 'getTenRandomUsers').mockReturnValueOnce([
        { _id: 1234, username: 'user1' },
        { _id: 4567, username: 'user2' },
        { _id: 8911, username: 'user3' },
        { _id: 1213, username: 'user4' },
        { _id: 1415, username: 'user5' },
        { _id: 1617, username: 'user6' },
        { _id: 1819, username: 'user7' },
        { _id: 2021, username: 'user8' },
        { _id: 2223, username: 'user9' },
        { _id: 2425, username: 'user10' }
      ])
      const { body } = await supertest(app).get('/view/random/users').expect(200)
      expect(userServicedMock).toHaveBeenCalled()
      expect(body.users.length).toBe(10)
    })
  })
})

describe('ProfileController - addUserToBlockList', ()=> {
  describe('adding a user to block list', ()=> {
    it('should return 401 given no userId supplied', async ()=> {
      await supertest(app).post('/user/block/add').expect(401)
    })
    it('should return a 400 given blocked user is already in current users block list', async () => {
      const currentUserBlockList = { 
        blockedUsers: {
          users: [
            {
              userId: targetUser._id
            }
          ]
        } 
      }
      const targetUsersBlockList = { 
        blockedUsers: {
          users: [
            {
              
            }
          ]
        } 
      }
      Object.assign(currentUser, currentUserBlockList)
      Object.assign(targetUser, targetUsersBlockList)

      const blocker = new User(currentUser)
      const blockedUser = new User(targetUser)
      const jwt = getJwt(currentUser.email, currentUser._id.toString())
      const findBlockerMock = jest.spyOn(userService, 'findBlocker').mockReturnValue(blocker)
      const { body } = await supertest(app)
      .post('/user/block/add')
      .set("Authorization", `Bearer ${jwt}`)
      .send({userToBlockId: blockedUser._id.toString()}).expect(400)
      expect(findBlockerMock).toHaveBeenCalled()
      expect(body).toHaveProperty('message', 'User is already in the list')
    })
    it('should return a 200 and provided user should be added to current users block list', async () => {
      const currentUserBlockListBeforeAdd = { 
        blockedUsers: {
          users: [

          ]
        } 
      }
      const currentUserBlockListAfterAdd = { 
        blockedUsers: {
          users: [
            {
              userId: targetUser._id.toString()
            }
          ]
        } 
      }

      Object.assign(currentUser, currentUserBlockListBeforeAdd)
    
      const blocker = new User(currentUser)
     
      const jwt = getJwt(currentUser.email, currentUser._id.toString())
      const findBlockerMock = jest.spyOn(userService, 'findBlocker').mockReturnValue(blocker)

      const updatedBlocker = new User(currentUser)  
      Object.assign(currentUser, currentUserBlockListAfterAdd)
      const addUserToBlockMock = jest.spyOn(userService, 'addUserToBlockList').mockReturnValue(updatedBlocker)
      const { body } = await supertest(app)
      .post('/user/block/add')
      .set("Authorization", `Bearer ${jwt}`)
      .send({userToBlockId: targetUser._id.toString()})
      .expect(200)

      expect(findBlockerMock).toHaveBeenCalled()
      expect(addUserToBlockMock).toHaveBeenCalled()
      expect(body).toHaveProperty('message', 'User added to your block list')
    })
  })
})

describe('ProfileController - addUserToMatchList', () => {
 describe('adding user as a match', () => {
    it('should retun a 401 unauthroized given no userId supplied', async () => {
      await supertest(app).post('/add-user/matchlist').expect(401)
    })
    it('should return a 400 given a user doesn\'t exists', async () => {

      const findCurrentUserForMatchListMock = jest.spyOn(userService, 'findCurrentUserForMatchList').mockReturnValueOnce(currentUser)

      const findUserToAddForMatchListMock = jest.spyOn(userService, 'findUserToAddForMatchList').mockReturnValueOnce(null)

      const jwt = getJwt(currentUser.email, currentUser._id.toString())
      const { status } = await supertest(app)
      .post('/add-user/matchlist')
      .send({userProfileId: targetUser._id.toString()})
      .set("Authorization", `Bearer ${jwt}`)
      

      expect(status).toBe(400)
      expect(findCurrentUserForMatchListMock).toHaveBeenCalled()
      expect(findUserToAddForMatchListMock).toHaveBeenCalled()
    })
    it('should return 200 and mutual match if both users exist in each others match list', async () => {

      const currentUserMatchList = {
        userMatches: {
          matches: [
           { userId:  targetUser._id.toString() }
            ]
          }
        }
        
        
       const targetUserMatchList = {
         userMatches: {
         matches: [
           { userId: currentUser._id.toString() }
          ]
         }
       } 

      Object.assign(currentUser, currentUserMatchList)
      Object.assign(targetUser, targetUserMatchList)

      const user1 = new User(currentUser)
      const user2 = new User(targetUser)

      const findCurrentUserForMatchListMock = jest.spyOn(userService, 'findCurrentUserForMatchList').mockReturnValueOnce(user1)

      const findUserToAddForMatchListMock = jest.spyOn(userService, 'findUserToAddForMatchList').mockReturnValueOnce(user2)

      const jwt = getJwt(currentUser.email, currentUser._id.toString())

      const { body, status } = await supertest(app)
      .post('/add-user/matchlist')
      .send({userProfileId: user1._id.toString()})
      .set("Authorization", `Bearer ${jwt}`)

      expect(status).toBe(200)
      expect(body).toHaveProperty('message', 'User added to matches successfully! And is a Mutual Match')
      expect(findCurrentUserForMatchListMock).toHaveBeenCalled()
      expect(findUserToAddForMatchListMock).toHaveBeenCalled()
      expect(body).toHaveProperty('isMutualMatch', true)
    })
    it('should return 200 and User added to matches if there is not a mutual match', async ()=> {
      const currentUserMatchList = {
        userMatches: {
          matches: [
                { userId:  targetUser._id.toString() }
            ]
          }
        }
        
        
      const targetUserMatchList = {
         userMatches: {
          matches: []
         }
      }
      Object.assign(currentUser, currentUserMatchList)
      Object.assign(targetUser, targetUserMatchList)

      const user1 = new User(currentUser)
      const user2 = new User(targetUser)

      const findCurrentUserForMatchListMock = jest.spyOn(userService, 'findCurrentUserForMatchList').mockReturnValueOnce(user1)

      const findUserToAddForMatchListMock = jest.spyOn(userService, 'findUserToAddForMatchList').mockReturnValueOnce(user2)

      const jwt = getJwt()
      const { body, status } = await supertest(app)
      .post('/add-user/matchlist')
      .send({userProfileId: user1._id.toString()})
      .set("Authorization", `Bearer ${jwt}`)

      expect(status).toBe(200)
      expect(body).toHaveProperty('message', 'User added to matches successfully!')
      expect(findCurrentUserForMatchListMock).toHaveBeenCalled()
      expect(findUserToAddForMatchListMock).toHaveBeenCalled()
      expect(body).toHaveProperty('isMutualMatch', false)
    })
 })
})

describe('ProfileController - addUserToFavorites', () => {
  describe('adding a user to favorites', ()=> {
    it('should return 401 given no userId supplied', async ()=> {
      await supertest(app).post('/add/favorites').expect(401)
    })
    it('should return 400 given the target user is already in current users favorite list ', async ()=> {
      const currentUserFavoriteList = { 
        favorites: {
          users: [
            {
              userId: targetUser._id.toString()
            }
          ]
        } 
      }
    
      Object.assign(currentUser, currentUserFavoriteList)
    

      const currUsr = new User(currentUser)

      const jwt = getJwt(currentUser.email, currentUser._id.toString())
      const findCurrentUserMock = jest.spyOn(userService, 'findCurrentUser').mockReturnValue(currUsr)
      const favoriteUserCheckMock = jest.spyOn(userService, 'checkIfUserIsAlreadyInFavorites').mockReturnValue(currUsr)
      const { body } = await supertest(app)
      .post('/add/favorites')
      .set("Authorization", `Bearer ${jwt}`)
      .send({userProfileId: targetUser._id.toString()}).expect(400)
      expect(findCurrentUserMock).toHaveBeenCalled()
      expect(favoriteUserCheckMock).toHaveBeenCalled()
      expect(body).toHaveProperty('message', 'User is already in the list')
    })
    it('should return 200 and user should be added to the current user favorite list', async ()=> {
      const currentUserFavoriteListBeforeAdd = { 
        blockedUsers: {
          users: [

          ]
        } 
      }
      const currentUserFavoriteAfterAdd = { 
        blockedUsers: {
          users: [
            {
              userId: targetUser._id.toString()
            }
          ]
        } 
      }

      Object.assign(currentUser, currentUserFavoriteListBeforeAdd)
    
      const currentUsr = new User(currentUser)
     
      const jwt = getJwt(currentUser.email, currentUser._id.toString())
      const findCurrentUserMock = jest.spyOn(userService, 'findCurrentUser').mockReturnValue(currentUsr)

      const updatedCurrentUsr = new User(currentUser)  
      Object.assign(currentUser, currentUserFavoriteAfterAdd)
      const addUserToFavoriteMock = jest.spyOn(userService, 'addUserToFavoriteList').mockReturnValue(updatedCurrentUsr)
      const { body } = await supertest(app)
      .post('/add/favorites')
      .set("Authorization", `Bearer ${jwt}`)
      .send({userProfileId: targetUser._id.toString()})
      .expect(200)

      expect(findCurrentUserMock).toHaveBeenCalled()
      expect(addUserToFavoriteMock).toHaveBeenCalled()
      expect(body).toHaveProperty('message', 'User added to favorites successfully!')
    })
    // it('', async ()=> {
    //   await supertest(app).post('/add/favorites').expect(401)
    // })
  })
})