import * as pg from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm';

export const categories = pg.pgTable('categories',{
    id: pg.serial().primaryKey(),
    name: pg.varchar({length:255}),
    description: pg.text(),
    slug: pg.varchar({length:255}).unique(),
    disContinued: pg.boolean().default(false),
    createdAt: pg.timestamp().defaultNow().notNull()
});