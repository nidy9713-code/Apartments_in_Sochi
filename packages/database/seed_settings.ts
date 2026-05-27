import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL,
    },
  },
});

async function main() {
  const aboutText = `🏡 *О Комплексе Green Palace*

Добро пожаловать в ЖК Green Palace — современный жилой комплекс в центральном районе Сочи, созданный для комфортного отдыха в любое время года. Комплекс сочетает приватную атмосферу, развитую инфраструктуру и удобную локацию всего в 10–12 минутах от моря. 🌴

✨ *Для гостей комплекса доступны:*

🏊‍♂️ *Круглогодично подогреваемый бассейн*
Температура воды поддерживается на уровне +28–32° круглый год.

☀️ *Летний бассейн и терраса для загара*
Пространство для отдыха с шезлонгами и прогулочной зоной.

🌿 *Закрытая охраняемая территория*
Комфорт, безопасность и спокойная атмосфера для отдыха всей семьёй.

🏡 *Ландшафтный дизайн и прогулочные зоны*
Зелёные аллеи, беседки, зоны отдыха и уютный парк на территории комплекса.

🏓 *Спортивные и игровые площадки*
Настольный теннис, workout-зоны и пространства для активного отдыха.

🛝 *Детские площадки*
Безопасные игровые зоны для детей разных возрастов.

🔥 *Зона барбекю*
Отдельная зона для уютных вечеров и отдыха на свежем воздухе.

🧖 *Банный комплекс*
Доступен для гостей на специальных условиях.

📶 *Бесплатный Wi-Fi на всей территории комплекса*

📍 *Удобная локация:*
• До моря — около 10 минут на автомобиле
• Остановка общественного транспорта — 200 м
• Ж/д вокзал Сочи — около 5 км
• Рядом магазины, кофейни, аптеки, Ozon и Wildberries

✨ *Green Palace* — это сочетание комфорта, сервиса и атмосферы настоящего отдыха в Сочи.`;

  const aboutPhotos = [
    'https://static.tildacdn.com/tild3164-6238-4530-b333-663539303366/IMG_2589.jpg',
    'https://static.tildacdn.com/tild3532-3536-4034-b236-393234666336/IMG_2615.jpg',
    'https://static.tildacdn.com/tild3831-3165-4433-a238-343538356133/IMG_2587.jpg',
    'https://static.tildacdn.com/tild3732-3430-4131-a536-383739663762/IMG_2592.jpg',
    'https://static.tildacdn.com/tild3734-6331-4135-b238-666362393339/IMG_2591.jpg',
    'https://static.tildacdn.com/tild6439-6138-4235-b131-373336306562/IMG_2627.jpg',
    'https://static.tildacdn.com/tild6434-3136-4166-a364-643539656138/IMG_2593.jpg',
    'https://static.tildacdn.com/tild3330-3134-4531-b634-373866383664/IMG_2628.jpg'
  ];

  await prisma.setting.upsert({
    where: { key: 'about_text' },
    update: { value: aboutText },
    create: { key: 'about_text', value: aboutText },
  });

  await prisma.setting.upsert({
    where: { key: 'about_photos' },
    update: { value: JSON.stringify(aboutPhotos) },
    create: { key: 'about_photos', value: JSON.stringify(aboutPhotos) },
  });

  console.log('Settings seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
