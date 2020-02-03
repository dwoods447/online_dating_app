const express = require('express');

const ProfileController = require('../controllers/ProfileController');

const isAuthenticated = require('../server_middleware/isAuthenticated');




const router = express.Router();

router.get('/inbox/messages', isAuthenticated,  ProfileController.getInboxMessagesForUser); // tested || works but need to adjust
router.get('/sender/:senderId/messages', isAuthenticated,  ProfileController.getMessagesFromSender);
router.get('/profile/views', isAuthenticated, ProfileController.getUserProfileViews);
router.get('/add/views', isAuthenticated, ProfileController.addUserProfileViews);
router.get('/view/random/users', ProfileController.getRandomUsersInAuthUsersPostalCode);  // tested || works but need to adjust
router.post('/user/update/userprofile', isAuthenticated, ProfileController.updateExtendedUserProfile);  // tested
router.post('/favorites/add', isAuthenticated, ProfileController.addUserToFavorites);
router.post('/favorites/remove', isAuthenticated, ProfileController.removeUserFromFavorites);
router.post('/user/block/add', isAuthenticated, ProfileController.addUserToBlockList);  // tested
router.post('/user/block/remove', isAuthenticated, ProfileController.removeUserFromBlockList);
router.post('/send/message', isAuthenticated, ProfileController.sendMessageToInbox); // tested
router.post('/remove/message', isAuthenticated, ProfileController.deleteMessageFromInbox);
router.post('/general/search', isAuthenticated, ProfileController.generalUsersSearch); // tested
router.post('/advanced/search', isAuthenticated,ProfileController.advancedUsersSearch);
router.post('/username/lookup', ProfileController.usernameLookUp);
router.post('/remove/user', isAuthenticated, ProfileController.deleteUserProfile);
router.post('/remove/image/upload', isAuthenticated, ProfileController.deleteImage)

router.post('/image/upload', isAuthenticated, ProfileController.uploadImage); // tested



router.post('/remove/image/upload', isAuthenticated, ProfileController.deleteImage);
router.post('/view/user', isAuthenticated,  ProfileController.getUserDetails); // tested

module.exports = router;
