import { Router } from 'express'
import { writeTodo } from './todosController.js'

const router = Router()

router.post("/", writeTodo)