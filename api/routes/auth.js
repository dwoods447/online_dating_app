const express = require('express');

const AuthenticationController = require('../controllers/AuthenticationContoller');

const isAuthneticated = require('../server_middleware/isAuthenticated')

const router = express.Router();

router.post('/login', AuthenticationController.userLogin);
router.post('/register', AuthenticationController.userRegistration);
router.post('/logout', AuthenticationController.userLogout)

module.exports = router;
