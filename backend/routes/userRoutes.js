import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  emailSend,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/email').post(protect, emailSend)
export default router
