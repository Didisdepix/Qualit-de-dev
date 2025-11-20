import { Router } from 'express'
import { logger } from '../middleware/logger.js'
import { getAllQuestions } from '../controllers/questionsController.js'
import { createQuestion } from '../controllers/questionsController.js'
import { deleteQuestion } from '../controllers/questionsController.js'
import { validateBody, validateParams } from '../middleware/validation.js'
import { createQuestionSchema, questionIdSchema } from '../models/question.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = Router()

router.use(authenticateToken)

router.get("/", getAllQuestions)

router.post('/', validateBody(createQuestionSchema),createQuestion)

router.delete('/:id', validateParams(questionIdSchema),deleteQuestion)

export default router