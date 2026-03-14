import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

console.log("Connecting to:", process.env.DATABASE_URL);

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database was connected");
  } catch (err) {
    console.error("❌ Prisma Connection Error:", err.message);
  }
}

testConnection();

export default prisma;