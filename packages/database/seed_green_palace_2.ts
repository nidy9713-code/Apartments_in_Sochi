import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const apartmentData = {
    id: "green-palace-studio-2",
    name: "Студия Green Palace С Подогреваемым Бассейном",
    shortDescription: "Современные Апартаменты В Центральном Районе Сочи С Круглогодично Подогреваемым Бассейном И Бесконтактным Заселением.",
    description: "Если Вы Любите Комфорт, Сервис И Чистоту — Тогда Вы Наш Гость. Современные Апартаменты В ЖК Green Palace Подходят Для Комфортного Отдыха До 4 Гостей. На Территории Комплекса Доступны Круглогодично Подогреваемый Бассейн, Летний Бассейн, Спортивные И Детские Площадки, Зоны Отдыха И Бесплатный Wi-Fi. В Апартаментах Есть Всё Необходимое Для Комфортного Проживания: Постельное Бельё, Комплекты Полотенец, Текстиль Для Бассейна, Средства Гигиены, Фен, Утюг, Сушилка И Полностью Оснащённая Кухня. Для Гостей Доступно Онлайн-Бронирование И Бесконтактное Заселение.",
    capacity: 4,
    homeReserveUrl: "https://homereserve.ru/7rgUPbpYQz/detail/148085#",
    websiteUrl: "https://homereserve.ru/7rgUPbpYQz/detail/148085#",
    photos: [
      "https://img.realtycalendar.ru/uploads/photo/file/6343/6343878/booking_widget_xxlarge_13_resized.jpg",
      "https://img.realtycalendar.ru/uploads/photo/file/6343/6343879/booking_widget_xxlarge_12_resized.jpg",
      "https://img.realtycalendar.ru/uploads/photo/file/6343/6343882/booking_widget_xxlarge_11_resized.jpg",
      "https://img.realtycalendar.ru/uploads/photo/file/6343/6343887/booking_widget_xxlarge_03_resized.jpg",
      "https://img.realtycalendar.ru/uploads/photo/file/6343/6343883/booking_widget_xxlarge_08_resized.jpg"
    ],
    details: {
      about: {
        rooms: "Студия",
        area: "31.6 м²",
        floor: "3 Из 3",
        view: "На Улицу",
        capacity: 4,
        beds: [
          "1 Двуспальная Кровать",
          "1 Диван-Кровать"
        ]
      },
      features: [
        "Круглогодично Подогреваемый Бассейн 28–32°",
        "Летний Бассейн С Зоной Отдыха",
        "Закрытая Охраняемая Территория",
        "Спортивная Площадка",
        "Настольный Теннис",
        "Детские Площадки",
        "Банный Комплекс",
        "Зона Барбекю",
        "Ландшафтный Дизайн И Прогулочные Зоны",
        "Wi-Fi На Территории"
      ],
      equipment: [
        "Кондиционер",
        "Холодильник",
        "Плита",
        "Микроволновая Печь",
        "Стиральная Машина",
        "Водонагреватель",
        "Телевизор",
        "Фен",
        "Утюг",
        "Сушилка",
        "Гладильная Доска",
        "Постельное Бельё",
        "Полотенца",
        "Средства Гигиены"
      ],
      bookingConditions: {
        deposit: "5000 ₽",
        cleaningFee: "1500 ₽",
        checkIn: "15:00",
        checkOut: "12:00",
        minAge: 18,
        longStayDiscount: "7–25%",
        earlyBookingDiscount: "15%"
      },
      rules: {
        petsAllowed: true,
        childrenAllowed: true,
        smokingAllowed: false,
        partiesAllowed: false,
        silentHours: "23:00–08:00",
        contactlessCheckIn: true
      },
      location: {
        address: "Краснодарский Край, Сочи, Молодогвардейская Ул., 2/90А",
        district: "Хостинский Район",
        seaDistance: "10–12 Минут На Автомобиле",
        stationDistance: "2.5 Км До Вокзала Сочи"
      },
      nearby: [
        "Магазины И Супермаркеты",
        "Пекарни И Кофейни",
        "Аптеки",
        "Ozon И Wildberries",
        "Каршеринг И Электросамокаты"
      ],
      included: [
        "Доступ Ко Всем Бассейнам",
        "Детские И Спортивные Площадки",
        "Прогулочные Зоны И Беседки",
        "Текстиль Для Бассейна",
        "Бесплатный Wi-Fi"
      ]
    }
  };

  await prisma.apartment.upsert({
    where: { id: apartmentData.id },
    update: apartmentData,
    create: apartmentData,
  });

  console.log('Apartment Green Palace Studio 2 added successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
