import prisma from '@prisma/client'

// Export database client
const dbClient = new prisma.PrismaClient()

export default dbClient
