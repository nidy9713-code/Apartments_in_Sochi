import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

async function main() {
  const photos = await prisma.setting.findUnique({ where: { key: 'about_photos' } });
  console.log('About Photos:', photos ? photos.value : 'Not found');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
