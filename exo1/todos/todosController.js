import writeInFile from '/todosFileManager'
import crypto from 'crypto'

export const writeTodo = (request, response)=>{
    if(!request.body){
        return response.status(400).send(
            [
                {
                    error: "Invalid body"
                }
            ]
        )
    }

    const id = crypto.randomInt(100000)
    const completed = response.body.completed || false
    const text = response.body.text

    writeInFile({id: id, completed: completed, text: text})

    response.status(201).send(
        [
            {
                todo: {id: id, completed: completed, text: text}
            }
        ]
    )
}