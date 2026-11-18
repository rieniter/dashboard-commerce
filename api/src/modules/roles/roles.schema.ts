import * as pg from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm';

export const roles = pg.pgTable('roles',{
    id: pg.smallserial().primaryKey(),
    name: pg.varchar({length:255}),
    description: pg.text(),
    createdAt: pg.timestamp().defaultNow().notNull()
});