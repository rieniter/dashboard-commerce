import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/schema.js";
import * as dotenv from "dotenv";
import { expand } from 'dotenv-expand';

expand(dotenv.config());

if(!process.env.DATABASE_URL){
    throw new Error(`DATABASE_URL environment variable is missing in api/.env'`);
}

export const DRIZZLE = 'DRIZZLE_CONNECTION';
export const databaseProvider = {
    provide: DRIZZLE,
    useFactory: async () => {
        const queryClient = postgres(process.env.DATABASE_URL!, {prepare: false});
        return drizzle(queryClient, {schema});
    }
}