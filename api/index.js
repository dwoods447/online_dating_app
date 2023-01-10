import * as dotenv from 'dotenv'
import { createServer } from './utils/server.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import path from 'path'
import { defaultConfig } from './config/default.js'
import bodyParser from 'body-parser'
import {
  checkUserNameUnique,
  // checkEmailUnique,
  userRegistration,
  userLogin,
  userLogout,
  updatePassword,
  resetPassword
} from './controllers/AuthenticationContoller.js'
import {
  getInboxMessagesForUser,
  getMessagesFromSender,
  getSentMessagesForUser,
  getUserProfileViews,
  getUsersInBlockList,
  getUsersInFavoriteList,
  getRandomUserForMatchMaker,
  getRandomTenRandomUsers,
  addUserToMatchList,
  updateExtendedUserProfile,
  addUserToFavorites,
  removeUserFromFavorites,
  addUserToBlockList,
  removeUserFromBlockList,
  deleteUserProfile,
  sendMessageToInbox,
  markMessageAsRead,
  generalUsersSearch,
  advancedUsersSearch,
  usernameLookUp,
  uploadImage,
  deleteImage,
  getUserDetails
  // addUserProfileViews,
  // deleteMessageFromInbox

} from './controllers/ProfileController.js'
import { isAuthenticated } from './server_middleware/isAuthenticated'
import { isPasswordRestTokenValid } from './server_middleware/isPasswordRestTokenValid'
dotenv.config()
const router = express.Router();
const app = createServer()

const maxFileSize = (4 * (1000 * 1000))
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const imagePath = './static/uploads/'
    cb(null, imagePath)
  },
  filename: (req, file, cb) => {
    const date = new Date()
    const time = date.getTime()
    const filename = date.toISOString().replace(/:/g, '-') + '_' + time + '_' + file.originalname
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  // Set Allowed ext
  const allowedFiletypes = /jpg|png|jpeg/
  // Check ext
  const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = allowedFiletypes.test(file.mimetype)
  if (mimetype && extname) {
    cb(null, true)
  } else {
    cb(new Error('File type must be an document: .png, .jpg, or .jpeg!'), false)
  }
}

app.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req

  next()
})
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req

  next();
})
app.use(multer({ storage: fileStorage, fileFilter, limits: { fileSize: maxFileSize } }).single('image'))

// app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
// router.get('/test/route-123', (req, res) => {
//   return res.status(200).json({ mesage: 'route works!' })
// })
router.post('/login', userLogin);
router.post('/register', userRegistration);
router.post('/logout', userLogout)
router.post('/check/username/unique', checkUserNameUnique);
router.post('/check/email/unique', checkUserNameUnique);
router.post('/user/password/reset', resetPassword)
router.post('/user/update/password', isPasswordRestTokenValid,  updatePassword)
router.get('/inbox/messages', isAuthenticated, getInboxMessagesForUser); // tested || works but need to adjust
router.get('/sender/:senderId/messages', isAuthenticated, getMessagesFromSender);
router.get('/sent/messages', isAuthenticated, getSentMessagesForUser);
router.get('/profile/views', isAuthenticated, getUserProfileViews);
router.get('/user-list/blocked', isAuthenticated, getUsersInBlockList);
router.get('/user-list/favorites', isAuthenticated, getUsersInFavoriteList);
router.get('/user/matchmaker', isAuthenticated, getRandomUserForMatchMaker);
router.get('/view/random/users', getRandomTenRandomUsers);  // tested || works but need to adjust
router.post('/add/user/matchlist', isAuthenticated, addUserToMatchList);
router.post('/user/update/userprofile', isAuthenticated, updateExtendedUserProfile);  // tested
router.post('/add/favorites', isAuthenticated, addUserToFavorites);
router.post('/remove/favorites', isAuthenticated, removeUserFromFavorites);
router.post('/user/block/add', isAuthenticated, addUserToBlockList);  // tested
router.post('/user/block/remove', isAuthenticated, removeUserFromBlockList);
router.post('/send/message', isAuthenticated, sendMessageToInbox); // tested
router.post('/mark/message/read', isAuthenticated, markMessageAsRead);
router.post('/general/search', isAuthenticated, generalUsersSearch); // tested
router.post('/advanced/search', isAuthenticated,advancedUsersSearch);
router.post('/username/lookup', usernameLookUp);
router.post('/remove/user', isAuthenticated, deleteUserProfile);
router.post('/image/upload', isAuthenticated, uploadImage); // tested
router.post('/remove/image/upload', isAuthenticated, deleteImage);
router.post('/view/user', isAuthenticated,  getUserDetails); 


app.use('*', (req, res, next) => {
  res.status(404).send({ message: 'Page Not Found ' })
})
mongoose.set('bufferCommands', false)
mongoose.set('strictQuery', true)

try {
  mongoose.connect(defaultConfig.db.connectString, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Mongoose connection created!')
} catch (error) {
  console.log('Error connecting with Mongoose')
}

export default {
  path: '/api',
  handler: router
}