import http from 'http'
import express, { response } from 'express'
import { error } from 'console'

const PORT = process.env.PORT || 3000
/*
const server = http.createServer((request, response)=>{
    response.end('Bonjour Monde poti coeur')
})

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})*/

const app = express()

app.use(express.json())

app.get("/questions/:id", (request, response)=> {
    response.status(200).send([
        {
            question: "Do you da wae ?",
            answer: 'I know da wae klq klq'
        }
    ])
})

app.post('/questions', (request, response)=>{
    const {question, answer} = request.body
    if(!question||!answer){
        return response.status(400).send({error:'Invalid request'})
    }
    response.status(201).send({message: 'Question created'})
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})