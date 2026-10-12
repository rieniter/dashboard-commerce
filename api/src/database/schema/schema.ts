import * as pg from 'drizzle-orm/pg-core'
import {sql} from 'drizzle-orm'


export const roles = pg.pgTable('roles',{
    id: pg.smallserial().primaryKey(),
    name: pg.varchar({length:255}),
    description: pg.text(),
    createdAt: pg.timestamp().defaultNow().notNull()
});

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

export const categories = pg.pgTable('categories',{
    id: pg.serial().primaryKey(),
    name: pg.varchar({length:255}),
    description: pg.text(),
    slug: pg.varchar({length:255}).unique(),
    disContinued: pg.boolean().default(false),
    createdAt: pg.timestamp().defaultNow().notNull()
});

export const products = pg.pgTable('products',{
    id: pg.uuid().primaryKey().default(sql`uuidv7()`),
    categoryID: pg.integer().references(() => categories.id),
    name: pg.varchar({length:255}),
    description: pg.text(),
    unitPrice: pg.bigint({mode:"number"}).notNull(),
    images: pg.jsonb().default([]),
    disContinued: pg.boolean().default(false),
    createdAt: pg.timestamp().defaultNow().notNull()
}, (table) => [
        sql`CHECK(${table.unitPrice} >= 0)`
    ]
);