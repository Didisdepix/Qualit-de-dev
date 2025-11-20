import {hash, compare} from 'bcrypt'
import { usersTable } from '../db/schema.js'
import { db } from '../db/database.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { eq } from 'drizzle-orm'

export const registerUser = async (request, response)=>{
    try{
        const {email, username,password} = request.body
        const hashedPassword = await hash(password, 12)
        const [newUser] = await db.insert(usersTable).values({email, username,password: hashedPassword}).returning({
            email: usersTable.email,
            username: usersTable.username,
            id: usersTable.id
        })

        const token = jwt.sign({ userId: newUser.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        response.status(201).json({message: 'User created', userData: newUser, token })
    }catch(error){
        console.error(error)
        response.status(500).json({message: "User couldn't be created"})
    }
}

export const login = async (request, response)=>{
    try{
        const {email, password} = request.body
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)

        if(!user){
            return response.status(401).json({error: "Le username ou le mot de passe est incorrect"})
        }

        const isValidPassword = await compare(password, user.password)

        if(!isValidPassword) {
            return response.status(401).json({error: "Le username ou le mot de passe est incorrect"})
        }

        const token = jwt.sign({ userId: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        response.status(201).json({message: 'User logged in', userData: user, token })
    }catch(error){
        console.error(error)
        response.status(500).json({message: "Couldn't login"})
    }
}