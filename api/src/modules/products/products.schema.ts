import * as pg from 'drizzle-orm/pg-core';
import {sql, relations} from 'drizzle-orm';
import {categories} from '../categories/categories.schema.js'

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
        pg.check('unit_price_non_negative', sql`${table.unitPrice} >= 0`)
    ]
);

export const productsCategories = pg.pgTable('productsCategories', {
    productID: pg.uuid().notNull().references(() => products.id, {onDelete:'cascade'}),
    categoryID: pg.uuid().notNull().references(() => categories.id, {onDelete: 'cascade'})
}, (table) => [
    pg.primaryKey({columns:[table.productID, table.categoryID]})
]);


export const productsRelations = relations(products, ({many}) => ({
    productCategories: many(productsCategories)
}));