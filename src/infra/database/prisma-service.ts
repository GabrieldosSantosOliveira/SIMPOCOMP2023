import { PrismaClient } from '@prisma/client'

export const prismaService = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
})
