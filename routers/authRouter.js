import { Router } from "express";
import { validateBody } from "../middleware/validation.js";
import { registerSchema, loginSchema } from "../models/auth.js";
import { login, registerUser } from "../controllers/authController.js";

const router = Router()

router.post('/register', validateBody(registerSchema), registerUser)
router.post('/login', validateBody(loginSchema), login)

export default router