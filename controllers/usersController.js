import {db} from '../db/database.js'
import { usersTable } from '../db/schema.js'
import {genSalt, hash, hashSync} from 'bcrypt'

export const getAllUsers = (request, response)=>{
    response.send({message: 'Get all users'})
}