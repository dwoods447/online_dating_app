import bodyParser from 'body-parser'
import {
  checkUserNameUnique,
  // checkEmailUnique,
  userRegistration,
  userLogin,
  userLogout,
  updatePassword,
  resetPassword
} from '../controllers/AuthenticationContoller'
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

} from '../controllers/ProfileController'
import { isAuthenticated } from '../server_middleware/isAuthenticated'
import { isPasswordRestTokenValid } from '../server_middleware/isPasswordRestTokenValid'

function routes (app) {
  // app.get('/test/route/:id', (req, res) => {
  //    console.log(req.params.id)
  //   return res.status(200).json({ message: 'route works!', userId: req.params.id })
  // })
  app.use(bodyParser.json())
  // app.post('/check/username/unique', checkUserNameUnique)
  // app.post('/check/email/unique', checkUserNameUnique)
  // app.post('/user/password/reset', resetPassword)
  // app.post('/user/update/password', isPasswordRestTokenValid, updatePassword)
  app.get('/inbox/messages', isAuthenticated, getInboxMessagesForUser) // tested || works but need to adjust
  app.get('/sender/:senderId/messages', isAuthenticated, getMessagesFromSender)
  app.get('/sent/messages', isAuthenticated, getSentMessagesForUser)
  app.get('/profile/views', isAuthenticated, getUserProfileViews)
  app.get('/user-list/blocked', isAuthenticated, getUsersInBlockList)
  app.get('/user-list/favorites', isAuthenticated, getUsersInFavoriteList)
  app.get('/user/matchmaker', isAuthenticated, getRandomUserForMatchMaker)
  app.get('/view/random/users', getRandomTenRandomUsers) // tested || works but need to adjust
  app.post('/add-user/matchlist', isAuthenticated, addUserToMatchList)
  app.post('/user/update/userprofile', isAuthenticated, updateExtendedUserProfile) // tested
  app.post('/add/favorites', isAuthenticated, addUserToFavorites)
  app.post('/remove/favorites', isAuthenticated, removeUserFromFavorites)
  app.post('/user/block/add', isAuthenticated, addUserToBlockList) // tested
  app.post('/user/block/remove', isAuthenticated, removeUserFromBlockList)
  app.post('/send/message', isAuthenticated, sendMessageToInbox) // tested
  app.post('/mark/message/read', isAuthenticated, markMessageAsRead)
  app.post('/general/search', isAuthenticated, generalUsersSearch) // tested
  app.post('/advanced/search', isAuthenticated, advancedUsersSearch)
  app.post('/username/lookup', usernameLookUp)
  app.post('/remove/user', isAuthenticated, deleteUserProfile)
  app.post('/image/upload', isAuthenticated, uploadImage) // tested
  app.post('/remove/image/upload', isAuthenticated, deleteImage)
  app.post('/view/user', isAuthenticated, getUserDetails) // tested
//   app.get('/add/views', isAuthenticated, addUserProfileViews)
//   app.post('/remove/message', isAuthenticated, deleteMessageFromInbox)
}

export default routes
