import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete apartments that are not the Green Palace studio
  const result = await prisma.apartment.deleteMany({
    where: {
      NOT: {
        id: "green-palace-studio-1"
      }
    }
  });

  console.log(`Deleted ${result.count} test apartments. Green Palace studio kept.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
