import http from 'http'
import express, { response } from 'express'
import { error } from 'console'
import todosRoutes from './todos/todosRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(express.json())
app.use('/todos', todosRoutes)