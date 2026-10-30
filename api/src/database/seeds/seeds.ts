import {drizzle} from "drizzle-orm/postgres-js"
import * as schema from "./../schema/schema.js"
import {sql} from "drizzle-orm"
import postgres from 'postgres';
import {faker, id_ID} from "@faker-js/faker"
import * as dotenv from "dotenv";
import { expand } from 'dotenv-expand';

expand(dotenv.config());

console.log(`Load Database: `, process.env.DATABASE_URL);
if(!process.env.DATABASE_URL){
    throw new Error(`DATABASE_URL environment variable is missing in api/.env'`);
}

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, {
    max: 5,
    idle_timeout: 200
});
const db = drizzle(client, {schema: schema, casing:'snake_case'});

async function insertRoles(){
    return await db.transaction(async (tx) => {
        await tx.execute(sql`TRUNCATE TABLE ${schema.roles} RESTART IDENTITY CASCADE;`)
        
        const insertedRole = await tx.insert(schema.roles).values([
            {name: 'User', description: 'Client'},
            {name: 'Admin', description: 'Administration'}
        ]).returning({id: schema.roles.id});

        console.log("Success inserted roles");
        return insertedRole;
    });
}

async function main(){
    const roles = await insertRoles();
    const roleIDs = roles.map(r => r.id);

    const totalRows = 10000;
    const chunkSize = 1000;

    console.log(`Start create ${totalRows} rows with ${chunkSize} rows each time`);

    for(let i = 0; i < totalRows; i+=chunkSize){
        const chunk = [];
        for(let j = 0; j < chunkSize; j++){
            const rawDate = faker.date.birthdate();
            const formatedBithDate = rawDate.toISOString().split(`T`)[0];

            chunk.push({
                email: faker.internet.email(),
                passwordHash: faker.internet.password(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                birthDate: formatedBithDate,
                image: faker.image.avatar(),
            });
        }

        await db.insert(schema.users).values(chunk)
        .onConflictDoNothing({
            target: schema.users.email
        });
    }

    await client.end();
};

main().catch(async(err) => {
    console.error("Failed seeding: ", err);
    await client.end();
    process.exit(1);
});