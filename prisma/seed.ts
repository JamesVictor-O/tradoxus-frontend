import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: "test@tradoxus.com",
      name: "Test User",
      portfolios: {
        create: {
          name: "Main Portfolio",
          cashBalance: 10000.00
        }
      }
    }
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())