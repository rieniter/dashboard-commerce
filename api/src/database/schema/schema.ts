import {pgTable, uuid, varchar, timestamp} from 'drizzle-orm/pg-core'
import {v7 as uuidv7} from 'uuid'


export const users = pgTable('user',{
    id: uuid().primaryKey().$defaultFn(() => uuidv7()),
    email:varchar({length:255}).notNull().unique(),
    username: varchar({length:50}).notNull().unique(),
    passwordHash: varchar({length:255}).notNull(),
    createAt: timestamp('create_at').defaultNow()
});