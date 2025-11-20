import { email } from 'zod'
import {db} from './database.js'
import { questionsTable, usersTable } from './schema.js'
import {genSalt, hash, hashSync} from 'bcrypt'

async function seed() {
    try{
        console.log('Database seeding starting...')

        await db.delete(questionsTable)
		await db.delete(usersTable)

		const seedUsers = [
			{
				email: 'User1@gmail.com',
				username: "User1",
				password: hashSync('password', 12)
			},
			{
				email: 'bro@gmail.com',
				username: "bro",
				password: hashSync('nobodycares', 12)
			}
		]

		const createdUsers=await db.insert(usersTable).values(seedUsers).returning()

        const seedQuestions = [
			{
				questionText: 'Quelle est la capitale de la France?',
				answer: 'Paris',
				difficulty: 'easy',
				createdBy: createdUsers[0].id

			},
			{
				questionText: 'Quel est le plus grand océan du monde?',
				answer: "L'océan Pacifique",
				difficulty: 'medium',
				createdBy: createdUsers[0].id

			},
			{
				questionText: 'Qui a écrit "Les Misérables"?',
				answer: 'Victor Hugo',
				difficulty: 'difficult',
				createdBy: createdUsers[0].id
			},
		]

        await db.insert(questionsTable).values(seedQuestions)
    }catch(error){console.error(error)}
}

seed()