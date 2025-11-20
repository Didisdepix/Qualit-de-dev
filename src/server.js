import http from 'http'
import express, { response } from 'express'
import { error } from 'console'
import { logger } from '../middleware/logger.js'
import questionsRouter from '../routers/questionsRoutes.js'
import usersRouter from '../routers/usersRoutes.js'
import authRouter from '../routers/authRouter.js'

const PORT = process.env.PORT || 3000
/*
const server = http.createServer((request, response)=>{
    response.end('Bonjour Monde poti coeur')
})

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})*/

const app = express()

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(express.json())
app.use('/questions', logger,questionsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)