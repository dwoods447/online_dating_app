const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path')
const config = require('./config/config')
const port = config.port;
const host = config.host;

const app = express();


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) =>{
      let imagePath = './static/uploads/';
      cb(null, imagePath);
  },
  filename: (req, file, cb) =>{
      let date = new Date();
      let time = date.getTime();
      let filename = date.toISOString().replace(/:/g, '-')+'_'+time+'_'+ file.originalname;
      cb(null, filename);
  }
});




const fileFilter = (req, file, cb) =>{
  // Set Allowed ext
const allowedFiletypes = /jpg|png|jpeg/;
// Check ext
const extname = allowedFiletypes.test(path.extname(file.originalname).toLowerCase());
// Check mime
const mimetype = allowedFiletypes.test(file.mimetype);
if(mimetype && extname){
    cb(null, true)
}else{
    cb(new Error('File type must be an document: .png, .jpg, or .jpeg!'), false);
}
}

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req

  next();
})

router.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));






app.use(bodyParser.json());


router.use('/images', express.static(path.join(__dirname, 'images')));
const AuthenticationController = require('./controllers/AuthenticationContoller');
const ProfileController = require('./controllers/ProfileController');
const isAuthenticated = require('./server_middleware/isAuthenticated');

router.get('/test', (req, res, next) =>{
  res.json({message: 'test router working'});
});
router.post('/login', AuthenticationController.userLogin);
router.post('/register', AuthenticationController.userRegistration);
router.post('/logout', AuthenticationController.userLogout)
router.post('/check/username/unique', AuthenticationController.checkUserNameUnique);
router.post('/check/email/unique', AuthenticationController.checkUserNameUnique);


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
router.post('/mark/message/read', isAuthenticated, ProfileController.markMessageAsRead);
router.post('/general/search', isAuthenticated, ProfileController.generalUsersSearch); // tested
router.post('/advanced/search', isAuthenticated,ProfileController.advancedUsersSearch);
router.post('/username/lookup', ProfileController.usernameLookUp);
router.post('/remove/user', isAuthenticated, ProfileController.deleteUserProfile);
router.post('/image/upload', isAuthenticated, ProfileController.uploadImage); // tested
router.post('/remove/image/upload', isAuthenticated, ProfileController.deleteImage);
router.post('/view/user', isAuthenticated,  ProfileController.getUserDetails); // tested



app.use('*', (req, res, next)=>{
    res.status(404).send({message: 'Page Not Found '});
})





mongoose.connect(config.db.connectString, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>{
  console.log("MonGoose connection created!" + result);
}).catch(()=>{
        console.log('Error connecting with Mongoose')
});



module.exports = {
  path: '/api',
  handler: router
}
