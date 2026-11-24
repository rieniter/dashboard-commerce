import * as pg from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm';
import {relations} from 'drizzle-orm'
import {roles} from '../roles/roles.schema.js'


export const users = pg.pgTable('users',{
    id: pg.uuid().primaryKey().default(sql`uuidv7()`),
    roleID: pg.smallint().references(() => roles.id).default(1), // Customers
    email: pg.varchar({length:255}).notNull().unique(),
    passwordHash: pg.varchar({length:255}).notNull(),
    firstName: pg.varchar({length:255}),
    lastName: pg.varchar({length:255}),
    birthDate: pg.date(),
    image: pg.varchar({length: 500}),
    createdAt: pg.timestamp().defaultNow().notNull()
});

export const usersRelations = relations(users, ({one}) => ({
    roles: one(roles, {
        fields: [users.roleID],
        references:[roles.id]
    })
}));

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;