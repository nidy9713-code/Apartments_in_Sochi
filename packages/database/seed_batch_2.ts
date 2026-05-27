import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const apartments = [
    {
      "id": "green-palace-137813",
      "name": "г. Сочи, Сочи, Молодогвардейская улица, д. 2/63",
      "shortDescription": "Светлая студия с балконом в ЖК Green Palace и круглогодично подогреваемым бассейном.",
      "description": "Апартаменты в Сочи с круглогодично подогреваемым бассейном. Современная студия в ЖК Green Palace — комфортный отдых в центральном районе Сочи всего в 10–12 минутах от моря. Гостям доступны бассейны, зоны отдыха, спортивные и детские площадки, Wi-Fi и бесконтактное заселение.",
      "capacity": 2,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/137813#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/137813#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344002/booking_widget_xxlarge_15_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344005/booking_widget_xxlarge_08_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344006/booking_widget_xxlarge_12_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344008/booking_widget_xxlarge_09_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344012/booking_widget_xxlarge_19_resized.jpg"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "28.2 м²",
          "floor": "3 из 3",
          "view": "На улицу",
          "capacity": 2,
          "beds": [
            "1 Двуспальная кровать"
          ]
        },
        "features": [
          "Круглогодично подогреваемый бассейн",
          "Балкон",
          "Закрытая территория",
          "Детская площадка"
        ],
        "equipment": [
          "Кондиционер",
          "Wi-Fi",
          "Телевизор",
          "Стиральная машина",
          "Фен",
          "Утюг"
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
      "id": "green-palace-137817",
      "name": "г. Сочи, Молодогвардейская улица, 2/64",
      "shortDescription": "Просторная студия в ЖК Green Palace с размещением до 4 гостей и подогреваемым бассейном.",
      "description": "Комфортные апартаменты в центральном районе Сочи с круглогодично подогреваемым бассейном, спортивными и детскими площадками, Wi-Fi и современной инфраструктурой для отдыха.",
      "capacity": 4,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/137817#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/137817#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/6351/6351312/booking_widget_xxlarge_IMG_6836.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6351/6351313/booking_widget_xxlarge_IMG_6866.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6351/6351321/booking_widget_xxlarge_IMG_6843__1_.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6351/6351326/booking_widget_xxlarge_IMG_6891.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6351/6351318/booking_widget_xxlarge_IMG_6879.jpg"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "30.2 м²",
          "floor": "2 из 3",
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
          "Детская площадка",
          "Зона отдыха"
        ],
        "equipment": [
          "Кондиционер",
          "Wi-Fi",
          "Телевизор",
          "Стиральная машина",
          "Фен",
          "Утюг"
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
          "address": "Краснодарский край, Сочи, Молодогвардейская ул., 2/64",
          "seaDistance": "10 минут на автомобиле"
        }
      }
    },
    {
      "id": "green-palace-136763",
      "name": "г. Сочи, 28. Молодогвардейская 2/64",
      "shortDescription": "Уютная студия в центральном районе Сочи с бассейном и размещением до 3 гостей.",
      "description": "Апартаменты в ЖК Green Palace с круглогодично подогреваемым бассейном, прогулочными зонами и современной инфраструктурой для комфортного отдыха в Сочи.",
      "capacity": 3,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/136763#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/136763#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197080/booking_widget_xxlarge___._27__19_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197083/booking_widget_xxlarge___._27__26_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197085/booking_widget_xxlarge___._27__28_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197087/booking_widget_xxlarge___._27__2_.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197082/booking_widget_xxlarge___._27__17_.png"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "25.7 м²",
          "floor": "3 из 3",
          "view": "На улицу",
          "capacity": 3,
          "beds": [
            "1 Двуспальная кровать",
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
          "Wi-Fi",
          "Телевизор",
          "Стиральная машина",
          "Фен",
          "Утюг"
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
          "address": "Краснодарский край, Сочи, Молодогвардейская ул., 2/64",
          "seaDistance": "10 минут на автомобиле"
        }
      }
    },
    {
      "id": "green-palace-136754",
      "name": "г. Сочи, 27 Молодогвардейская ул., 2/62",
      "shortDescription": "Комфортная студия в ЖК Green Palace с круглогодично подогреваемым бассейном.",
      "description": "Современные апартаменты в центральном районе Сочи с доступом к бассейнам, прогулочным зонам, детским площадкам и удобной инфраструктуре комплекса.",
      "capacity": 3,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/136754#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/136754#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197158/booking_widget_xxlarge_DSC02646.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197164/booking_widget_xxlarge_DSC02675.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197166/booking_widget_xxlarge_DSC02686.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197168/booking_widget_xxlarge_DSC02657.png",
        "https://img.realtycalendar.ru/uploads/photo/file/3197/3197162/booking_widget_xxlarge_DSC02638.png"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "25.8 м²",
          "floor": "3 из 3",
          "view": "На улицу",
          "capacity": 3,
          "beds": [
            "1 Двуспальная кровать",
            "1 Односпальная кровать"
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
          "Wi-Fi",
          "Телевизор",
          "Стиральная машина",
          "Фен",
          "Утюг"
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
          "address": "Краснодарский край, Сочи, Молодогвардейская ул., 2/62",
          "seaDistance": "10 минут на автомобиле"
        }
      }
    },
    {
      "id": "green-palace-148077",
      "name": "г. Сочи, 6 - Молодогвардейская 2/90А",
      "shortDescription": "Просторная студия в ЖК Green Palace с размещением до 4 гостей и подогреваемым бассейном.",
      "description": "Современные апартаменты в Сочи с круглогодично подогреваемым бассейном, закрытой территорией и удобной инфраструктурой для комфортного отдыха у моря.",
      "capacity": 4,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/148077#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/148077#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344081/booking_widget_xxlarge_17_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344084/booking_widget_xxlarge_18_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344086/booking_widget_xxlarge_13_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344091/booking_widget_xxlarge_01_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344092/booking_widget_xxlarge_19_resized.jpg"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "30.2 м²",
          "floor": "3 из 3",
          "view": "На улицу",
          "capacity": 4,
          "beds": [
            "1 Двуспальная кровать",
            "1 Диван-кровать"
          ]
        },
        "features": [
          "Круглогодично подогреваемый бассейн",
          "Закрытая территория",
          "Зона отдыха",
          "Детская площадка"
        ],
        "equipment": [
          "Кондиционер",
          "Wi-Fi",
          "Телевизор",
          "Стиральная машина",
          "Фен",
          "Утюг"
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
      "id": "green-palace-148082",
      "name": "г. Сочи, 9 Молодогвардейская 2/90А",
      "shortDescription": "Уютная студия в ЖК Green Palace с бассейном и размещением до 4 гостей.",
      "description": "Комфортные апартаменты в центральном районе Сочи с круглогодично подогреваемым бассейном, современной инфраструктурой и удобным онлайн-бронированием.",
      "capacity": 4,
      "homeReserveUrl": "https://homereserve.ru/7rgUPbpYQz/detail/148082#",
      "websiteUrl": "https://homereserve.ru/7rgUPbpYQz/detail/148082#",
      "photos": [
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344179/booking_widget_xxlarge_12_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344180/booking_widget_xxlarge_13_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344184/booking_widget_xxlarge_14_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344189/booking_widget_xxlarge_01_resized.jpg",
        "https://img.realtycalendar.ru/uploads/photo/file/6344/6344185/booking_widget_xxlarge_09_resized.jpg"
      ],
      "details": {
        "about": {
          "rooms": "Студия",
          "area": "30.9 м²",
          "floor": "2 из 3",
          "view": "Во двор",
          "capacity": 4,
          "beds": [
            "1 Полуторная кровать",
            "1 Диван-кровать"
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
          "Wi-Fi",
          "Телевизор",
          "Стиральная машина",
          "Фен",
          "Утюг"
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
