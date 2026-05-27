import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const apartments = [
    {
      "id": "green-palace-263-studio-1",
      "name": "г. Сочи, Молодогвардейская ул., 2/63",
      "shortDescription": "Уютная студия в ЖК Green Palace с круглогодично подогреваемым бассейном и комфортным размещением для отдыха в Сочи.",
      "description": "Апартаменты в Сочи с круглогодично подогреваемым бассейном. Современная студия в ЖК Green Palace в центральном районе города всего в 10–12 минутах от моря. На территории комплекса доступны бассейны, зоны отдыха, спортивные и детские площадки, Wi-Fi и бесконтактное заселение. Отличный вариант для комфортного отдыха и длительного проживания.",
      "capacity": 2,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/136758#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/136758#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/3243/3243113/booking_widget_xxlarge_2000__11_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3243/3243115/booking_widget_xxlarge_2000__15_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3243/3243116/booking_widget_xxlarge_2000__21_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3243/3243118/booking_widget_xxlarge_2000__19_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3243/3243120/booking_widget_xxlarge_2000__26_.png"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "28.1 м²",
          "floor": "3 из 3",
          "view": "На улицу",
          "capacity": 2,
          "beds": [
            "1 Двуспальная кровать"
          ]
        },
        "features": [
          "Круглогодично подогреваемый бассейн",
          "Закрытая территория",
          "Детская площадка",
          "Зона барбекю"
        ],
        "equipment": [
          "Кондиционер",
          "Стиральная машина",
          "Wi-Fi",
          "Телевизор",
          "Фен",
          "Утюг",
          "Микроволновая печь",
          "Холодильник"
        ],
        "bookingConditions": {
          "deposit": "5000 ₽",
          "cleaningFee": "1500 ₽",
          "checkIn": "15:00",
          "checkOut": "12:00"
        },
        "rules": {
          "petsAllowed": true,
          "childrenAllowed": true,
          "smokingAllowed": false
        },
        "location": {
          "address": "Краснодарский край, Сочи, Молодогвардейская ул., 2/63",
          "seaDistance": "10 минут на автомобиле"
        }
      }
    },
    {
      "id": "green-palace-290a-studio-20",
      "name": "г. Сочи, 20 - Молодогвардейская - 2/90А",
      "shortDescription": "Современная студия в ЖК Green Palace с подогреваемым бассейном и размещением до 4 гостей.",
      "description": "Комфортные апартаменты в центральном районе Сочи с круглогодично подогреваемым бассейном и развитой инфраструктурой комплекса. Гостям доступны зоны отдыха, детские и спортивные площадки, Wi-Fi на территории и удобное онлайн-бронирование. Апартаменты отлично подойдут для отдыха семьёй или небольшой компанией.",
      "capacity": 4,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/148078#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/148078#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/3196/3196988/booking_widget_xxlarge___________________16_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3196/3196989/booking_widget_xxlarge___________________23_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3196/3196992/booking_widget_xxlarge___________________29_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3196/3196995/booking_widget_xxlarge___________________30_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3196/3196990/booking_widget_xxlarge___________________18_.png"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "30.6 м²",
          "floor": "1 из 3",
          "view": "Во двор",
          "capacity": 4,
          "beds": [
            "1 Двуспальная кровать",
            "1 Диван-кровать"
          ]
        },
        "features": [
          "Круглогодично подогреваемый бассейн",
          "Закрытая территория",
          "Спортивная площадка",
          "Детская площадка"
        ],
        "equipment": [
          "Кондиционер",
          "Стиральная машина",
          "Wi-Fi",
          "Телевизор",
          "Фен",
          "Утюг",
          "Микроволновая печь",
          "Холодильник"
        ],
        "bookingConditions": {
          "deposit": "5000 ₽",
          "cleaningFee": "1500 ₽",
          "checkIn": "15:00",
          "checkOut": "12:00"
        },
        "rules": {
          "petsAllowed": true,
          "childrenAllowed": true,
          "smokingAllowed": false
        },
        "location": {
          "address": "Краснодарский край, Сочи, Молодогвардейская ул., 2/90А",
          "seaDistance": "10 минут на автомобиле"
        }
      }
    },
    {
      "id": "green-palace-263-studio-2",
      "name": "г. Сочи, Молодогвардейская ул., 2/63",
      "shortDescription": "Компактная студия в ЖК Green Palace с удобной локацией и круглогодично подогреваемым бассейном.",
      "description": "Уютные апартаменты в центральном районе Сочи с комфортной инфраструктурой для отдыха. Гостям доступны подогреваемый бассейн, прогулочные зоны, спортивные и детские площадки, а также бесконтактное заселение и удобное онлайн-бронирование. Отличный вариант для спокойного отдыха у моря.",
      "capacity": 3,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/137811#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/137811#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/6343/6343983/booking_widget_xxlarge_08_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6343/6343985/booking_widget_xxlarge_11_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6343/6343986/booking_widget_xxlarge_12_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6343/6343992/booking_widget_xxlarge_02_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6343/6343990/booking_widget_xxlarge_07_resized.jpg"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "21 м²",
          "floor": "3 из 3",
          "view": "На улицу",
          "capacity": 3,
          "beds": [
            "1 Полуторная кровать",
            "1 Односпальная кровать"
          ]
        },
        "features": [
          "Круглогодично подогреваемый бассейн",
          "Закрытая территория",
          "Прогулочные зоны",
          "Детская площадка"
        ],
        "equipment": [
          "Кондиционер",
          "Стиральная машина",
          "Wi-Fi",
          "Телевизор",
          "Фен",
          "Утюг",
          "Микроволновая печь",
          "Холодильник"
        ],
        "bookingConditions": {
          "deposit": "5000 ₽",
          "cleaningFee": "1500 ₽",
          "checkIn": "15:00",
          "checkOut": "12:00"
        },
        "rules": {
          "petsAllowed": true,
          "childrenAllowed": true,
          "smokingAllowed": false
        },
        "location": {
          "address": "Краснодарский край, Сочи, Молодогвардейская ул., 2/63",
          "seaDistance": "10 минут на автомобиле"
        }
      }
    }
  ];

  for (const apt of apartments) {
    await prisma.apartment.upsert({
      where: { id: apt.id },
      update: apt,
      create: apt,
    });
    console.log(`Apartment ${apt.id} added/updated successfully`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
