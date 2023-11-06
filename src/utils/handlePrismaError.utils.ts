import type { Prisma } from '@prisma/client'

export type PrismaErrorResponse = {
  statusCode: number
  message: string
}

// Helper function to handle errors thrown by Prisma
export function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError
): PrismaErrorResponse {
  switch (error.code) {
    case 'P2001':
      return {
        statusCode: 404, // Not Found
        message: `The record searched for does not exist. Details: ${error.meta?.cause}`,
      }
    case 'P2002':
      return {
        statusCode: 409, // Conflict
        message: `The item already exists in the database. Constraint failed on ${error.meta?.target}.`,
      }
    case 'P2004':
      return {
        statusCode: 400, // Bad Request
        message: `A database constraint failed. Error: ${error.meta?.cause}`,
      }
    case 'P2025':
      return {
        statusCode: 404, // Not Found
        message: `The required record was not found. Details: ${error.meta?.cause}`,
      }
    default:
      return {
        statusCode: 500, // Internal Server Error
        message: `An unexpected error occurred: ${error.message}`,
      }
  }
}
