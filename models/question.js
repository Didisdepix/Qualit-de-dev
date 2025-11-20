// Le but de ce fichier est d'éviter que l'utilisateur rentre des valeurs d'un mauvais type dans ses requêtes

import { z } from 'zod'

const difficultyEnum = z.enum(['easy','medium','difficult'])

export const createQuestionSchema = z.object({
    questionText: z.string().min(1, 'Question text is required').max(300, 'Question text must be at most 300 characters'),
    answer: z.string().min(1, 'Answer is required').max(300),
    difficulty: difficultyEnum
})

export const questionIdSchema = z.object({
    id: z.uuid(),

})