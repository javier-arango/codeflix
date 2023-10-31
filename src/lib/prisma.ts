import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

// Prevent hot reloading from creating new instances of PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Check to use prisma instance if it exists.
// If not, create a new instance.
export const prisma = globalForPrisma.prisma || new PrismaClient()

// If in development, set prisma instance to global object
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
