import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

async function main() {
  const settings = await prisma.setting.findMany();
  console.log('Current settings:', settings.map(s => s.key));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
