import http from 'http'
import express, { response } from 'express'
import { error } from 'console'
import questionsRouter from './routers/questionsRouter.js'
import usersRouter from './routers/usersRouter.js'

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
app.use('/questions', questionsRouter)
app.use('/users', usersRouter)