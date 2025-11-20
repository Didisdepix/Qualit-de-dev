import { Router } from 'express'
import { getAllUsers } from '../controllers/usersController.js'
import { registerUser } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = Router()

router.use(authenticateToken)

router.get('/', getAllUsers)
router.get('/auth', registerUser)

export default router