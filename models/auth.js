import z from 'zod'

export const registerSchema = z.object({
    email: z.email(),
    username: z.string().min(3).max(30),
    password: z.string().min(6).max(100),
    isAdmin: z.boolean().default(false)
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(100)
})