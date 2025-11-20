import { Router } from 'express'
import { writeInFile } from './todosController.js'

const router = Router()

router.post("/", writeInFile)