import {db} from '../db/database.js'
import { questionsTable } from '../db/schema.js'
import {eq} from 'drizzle-orm'

export const getAllQuestions = async (request, response)=> {

    try{
        const questions = await db.select().from(questionsTable).orderBy('createdAt', 'desc')
        response.status(200).json(questions)
    }catch(error){
        console.error(error)
        response.status(500).json({
            error:"Failed to fetch questions"
        })
    }

    //response.status(200).send([
    //    {
    //        question: "Do you da wae ?",
    //        answer: 'I know da wae klq klq'
    //    }
    //])
}

export const createQuestion = async (request, response)=>{
    const {questionText, answer, difficulty} = request.body
   // if(!question||!answer){
   //     return response.status(400).send({error:'Invalid request'})
   // }

    try{
        const author = request.user.userId
        const newQuestion = await db.insert(questionsTable).values({questionText, answer, difficulty, createdBy: author}).returning()
        response.status(201).send({message: 'Question created'})
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: 'Failed to create'
        })
    }
}

export const deleteQuestion = async (request, response) =>{
    try{
        const { id } = request.params
        const userId= request.user.userId

        const [question] = await db.select().from(questionsTable).where(eq(questionsTable.id, id)).limit(1)
        const userIdOfQuestion = question.createdBy

        if(userIdOfQuestion != userId){
            response.status(403).send({message: "Couldn't delete question"})
        }else{

        const deletedQuestion = await db.delete(questionsTable).where(eq(questionsTable.id, id)).returning()
        response.status(200).send({message:`Question ${id} deleted`}) 

        }

        if(!deletedQuestion){
            return response.status(404).json({error: 'Question not found'})
        }
    }catch(error){
        console.error(error)
        response.status(500).json({
            error: 'Failed to delete'
        })
    }
    
    
}