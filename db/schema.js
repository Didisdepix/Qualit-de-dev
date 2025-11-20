import {sqliteTable, text, integer} from 'drizzle-orm/sqlite-core'
import {randomUUID} from 'crypto'


export const questionsTable = sqliteTable('questions', {
    id: text().primaryKey().$defaultFn(()=>randomUUID()),
    questionText: text('question_text', { length: 300 }).notNull(),
    answer: text({length: 300}).notNull(),
    difficulty: text({enum: ['easy', 'medium', 'difficult']}).notNull().default('easy'),
    createdBy: text().references(() => usersTable.id, {onDelete: 'cascade'}),
    createdAt: integer('created_at', {mode: 'timestamp'}).$defaultFn(()=> new Date()),
    //user: text().references()
})

export const usersTable = sqliteTable('users', {
    id: text().primaryKey().$defaultFn(()=> randomUUID()),
    email: text('email', {length:30}).notNull().unique(),
    username: text('username', {length:30}).notNull().unique(),
    password:  text('password', {length:255}).notNull()
})