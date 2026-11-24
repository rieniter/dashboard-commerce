import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/schema.js";
import * as dotenv from "dotenv";
import { expand } from 'dotenv-expand';

expand(dotenv.config());

if(!process.env.DATABASE_URL){
    throw new Error(`DATABASE_URL environment variable is missing in api/.env'`);
}

export const DRIZZLE = Symbol('DRIZZLE_CONNECTION');
export const databaseProvider = {
    provide: DRIZZLE,
    useFactory: async () => {
        const connectionString = process.env.DATABASE_URL!;
        const option = {prepare: false, max:10};
        const queryClient = postgres(connectionString, option);

        return drizzle(queryClient, {schema, casing: "snake_case"});
    }
}