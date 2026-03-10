import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' }
    ]
})

async function testConnection() {
    try {
        await prisma.$connect();
        console.log("Database was connected")
    } catch(err) {
        console.error("[ERROR] Database connection error: ", err);
        process.exit(1);
    }
}

testConnection();

export default prisma;