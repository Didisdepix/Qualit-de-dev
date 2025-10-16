export const getAllQuestions = (request, response)=> {
    response.status(200).send([
        {
            question: "Do you da wae ?",
            answer: 'I know da wae klq klq'
        }
    ])
}

export const createQuestion = (request, response)=>{
    const {question, answer} = request.body
    if(!question||!answer){
        return response.status(400).send({error:'Invalid request'})
    }
    response.status(201).send({message: 'Question created'})
}

export const deleteQuestion = (request, response) =>{
    const { id } = request.params
    response.status(200).send({message:`Question ${id} deleted`})
}