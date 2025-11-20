//import writeInFile from './todosFileManager.js'
//import crypto from 'crypto'
//
//export const writeTodo = (request, response)=>{
//    if(!request.body){
//        return response.status(400).send(
//            [
//                {
//                    error: "Invalid body"
//                }
//            ]
//        )
//    }
//
//    const id = crypto.randomInt(100000)
//    const completed = response.body.completed || false
//    const text = response.body.text
//
//    writeInFile({id: id, completed: completed, text: text})
//
//    response.status(201).send(
//        [
//            {
//                todo: {id: id, completed: completed, text: text}
//            }
//        ]
//    )
//}

import { error } from 'console'
import { readFile, writeFile } from 'fs/promises'
import { randomUUID } from 'crypto'
//SE SOUVENIR DE CET IMPORT

const readTodos = async()=>{
    try{
        const content = await readFile('./exo1/todos.json', 'utf-8') 
        return JSON.parse(content)
    }catch(error){
        if(error.code === "ENOENT"){
            return []
        }
        throw error
    }
}


export const writeInFile = async(req, res)=> {
    //TOUJOURS METTRE DES TRY CATCH DANS DES ASYNCHRONES
    try{
        const { text, completed = false } = req.body
        //completed = false s'exécute uniquement si pas défini
        if(!text.trim() || typeof completed !== 'boolean'){
            //pas oublier le trim
            return res.status(400).send({
                error: 'Invalid body'
            })
            //return != res.send()
        }

        const todos = await readTodos()

        todos.push({
            id: randomUUID(),
            text: text.trim(),
            completed
        })

        await writeFile('./exo1/todos.json', JSON.stringify(todos, null, 2))

        res.status(201).send({
            message: 'Todo created'
        })
    }catch (error){
        res.status(500).send(error)
    }
    
}