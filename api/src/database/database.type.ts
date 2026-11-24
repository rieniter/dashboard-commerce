import {PostgresJsDatabase} from 'drizzle-orm/postgres-js'
import * as schema from './schema/schema.js'

export type DrizzleDB = PostgresJsDatabase<typeof schema>;