import { defineConfig } from "drizzle-kit";
import * as path from "path"
import * as dotenv from "dotenv";
import { expand } from 'dotenv-expand';

expand(dotenv.config());

if(!process.env.DATABASE_URL){
  throw new Error('DATABASE_URL environment variable is missing in api/.env');
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema/index.ts",
  out: "./src/database/migrations",
  dbCredentials:{
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
  casing: 'snake_case'
});
