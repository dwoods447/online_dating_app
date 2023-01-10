import express from 'express'
import AuthenticationController from '../controllers/AuthenticationContoller'
// import isAuthneticated from '../server_middleware/isAuthenticated'

const router = express.Router()

router.post('/login', AuthenticationController.userLogin)
router.post('/register', AuthenticationController.userRegistration)
router.post('/logout', AuthenticationController.userLogout)

export default router
