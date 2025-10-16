import { Router } from 'express'
import { getAllQuestions } from '../controllers/questionsController.js'
import { createQuestion } from '../controllers/questionsController.js'
import { deleteQuestion } from '../controllers/questionsController.js'

const router = Router()

router.get("/", getAllQuestions)

router.post('/', createQuestion)

router.delete('/:id', deleteQuestion)

export default router