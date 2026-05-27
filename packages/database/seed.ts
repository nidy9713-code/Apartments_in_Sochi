import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const apt = await prisma.apartment.create({
    data: {
      name: 'Апартаменты в центре Сочи',
      description: 'Прекрасные апартаменты с видом на море. Полностью оборудованная кухня, кондиционер, Wi-Fi.',
      shortDescription: 'Вид на море, центр города',
      capacity: 4,
      photos: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000'],
      homeReserveUrl: 'https://homereserve.ru/7rgUPbpYQz',
      websiteUrl: 'https://example.com/sochi-apt-1',
    },
  });

  console.log(`Created apartment with ID: ${apt.id}`);

  await prisma.fAQ.createMany({
    data: [
      {
        question: 'Как забронировать?',
        answer: 'Вы можете забронировать апартаменты через кнопку "Проверить даты" или оставить заявку в разделе "Связаться".',
        order: 1,
      },
      {
        question: 'Есть ли парковка?',
        answer: 'Да, на территории комплекса есть бесплатная охраняемая парковка.',
        order: 2,
      },
    ],
  });

  console.log('Created FAQ items');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
