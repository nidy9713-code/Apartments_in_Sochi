import { Telegraf, Context, Scenes, session, Markup } from 'telegraf';
import * as dotenv from 'dotenv';
import { mainKeyboard, contactKeyboard } from './keyboards/main.keyboard';
import { adminKeyboard, adminAptsKeyboard, adminFaqKeyboard } from './keyboards/admin.keyboard';
import { prisma } from './services/prisma.service';
import { bookingWizard } from './scenes/booking.scene';
import { addFaqWizard } from './scenes/addFaq.scene';
import { editFaqWizard } from './scenes/editFaq.scene';
import { editAptWizard } from './scenes/editApt.scene';
import { editAboutWizard } from './scenes/editAbout.scene';

dotenv.config();

console.log('Starting bot...');

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN must be provided!');
}

const ADMIN_IDS = process.env.ADMIN_IDS?.split(',').map(id => id.trim()) || [];

const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN);

// Scene setup
const stage = new Scenes.Stage<Scenes.SceneContext>([
  bookingWizard, 
  addFaqWizard, 
  editFaqWizard, 
  editAptWizard, 
  editAboutWizard
]);

// Middleware
bot.use(session());
bot.use(stage.middleware());

// Admin check middleware
const isAdmin = (ctx: Context) => {
  const userId = ctx.from?.id.toString();
  return userId && ADMIN_IDS.includes(userId);
};

// Start command
bot.start(async (ctx) => {
  await ctx.reply('Добро пожаловать в сервис бронирования апартаментов в Сочи! 🌴\nВыберите интересующий вас раздел:', mainKeyboard);
});

// Admin command
bot.command('admin', async (ctx) => {
  if (!isAdmin(ctx)) {
    return ctx.reply(`Ваш ID: ${ctx.from?.id}\nУ вас нет прав администратора. Добавьте этот ID в ADMIN_IDS в .env файле.`);
  }
  await ctx.reply('🔐 Панель администратора:', adminKeyboard);
});

// Admin handlers
bot.action('admin_main', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  await ctx.editMessageText('🔐 Панель администратора:', adminKeyboard);
});

bot.action('admin_faq', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  await ctx.editMessageText('❓ Управление FAQ:', adminFaqKeyboard);
});

bot.action('admin_about', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  return ctx.scene.enter('edit_about_wizard');
});

bot.action('admin_apts', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  await ctx.editMessageText('🏨 Управление апартаментами:', adminAptsKeyboard);
});

bot.action('admin_faq_add', (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  return ctx.scene.enter('add_faq_wizard');
});

bot.action('admin_bookings', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const bookings = await prisma.booking.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
    include: { apartment: true }
  });

  if (bookings.length === 0) {
    return ctx.editMessageText('Заявок пока нет.', adminKeyboard);
  }

  let text = '📅 *Последние 10 заявок:*\n\n';
  bookings.forEach((b, i) => {
    text += `${i + 1}. *${b.apartment.name}*\n`;
    text += `👤 ${b.guestName} (${b.guestPhone})\n`;
    text += `📅 ${b.checkIn.toLocaleDateString()} - ${b.checkOut.toLocaleDateString()}\n`;
    text += `👥 Гостей: ${b.guestsCount}\n`;
    text += `🕒 Создана: ${b.createdAt.toLocaleString()}\n\n`;
  });

  await ctx.editMessageText(text, { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('⬅️ Назад', 'admin_main')]]) });
});

bot.action('admin_stats', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const aptsCount = await prisma.apartment.count();
  const bookingsCount = await prisma.booking.count();
  const faqCount = await prisma.fAQ.count();
  
  const text = `📊 *Статистика*\n\n🏠 Апартаментов: ${aptsCount}\n📅 Заявок всего: ${bookingsCount}\n❓ Вопросов FAQ: ${faqCount}`;
  await ctx.editMessageText(text, { parse_mode: 'Markdown', ...Markup.inlineKeyboard([[Markup.button.callback('⬅️ Назад', 'admin_main')]]) });
});

bot.action('admin_faq_list', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
  
  if (faqs.length === 0) {
    return ctx.editMessageText('Список вопросов пуст.', adminFaqKeyboard);
  }

  const keyboard = Markup.inlineKeyboard(
    faqs.flatMap(f => [
      [Markup.button.callback(`✏️ ${f.question.slice(0, 30)}...`, `admin_faq_edit_${f.id}`)],
      [Markup.button.callback(`❌ Удалить`, `admin_faq_del_${f.id}`)]
    ]),
  );
  (keyboard.reply_markup as any).inline_keyboard.push([Markup.button.callback('⬅️ Назад', 'admin_faq')]);

  await ctx.editMessageText('Выберите вопрос для редактирования или удаления:', keyboard);
});

bot.action(/admin_faq_edit_(.+)/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const faqId = ctx.match[1];
  return ctx.scene.enter('edit_faq_wizard', { faqId });
});

bot.action(/admin_faq_del_(.+)/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const faqId = ctx.match[1];
  await prisma.fAQ.delete({ where: { id: faqId } });
  await ctx.answerCbQuery('Вопрос удален');
  // Refresh list
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
  const keyboard = Markup.inlineKeyboard(
    faqs.map(f => [Markup.button.callback(`❌ Удалить: ${f.question.slice(0, 20)}...`, `admin_faq_del_${f.id}`)]),
  );
  (keyboard.reply_markup as any).inline_keyboard.push([Markup.button.callback('⬅️ Назад', 'admin_faq')]);
  await ctx.editMessageText('Вопрос удален. Выберите следующий или вернитесь назад:', keyboard);
});

bot.action('admin_apt_list', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const apts = await prisma.apartment.findMany();
  
  if (apts.length === 0) {
    return ctx.editMessageText('Список апартаментов пуст.', adminAptsKeyboard);
  }

  const keyboard = Markup.inlineKeyboard(
    apts.flatMap(a => [
      [Markup.button.callback(`✏️ ${a.name}`, `admin_apt_edit_${a.id}`)],
      [Markup.button.callback(`❌ Удалить`, `admin_apt_del_${a.id}`)]
    ]),
  );
  (keyboard.reply_markup as any).inline_keyboard.push([Markup.button.callback('⬅️ Назад', 'admin_apts')]);

  await ctx.editMessageText('Выберите апартамент для редактирования или удаления:', keyboard);
});

bot.action(/admin_apt_edit_(.+)/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const aptId = ctx.match[1];
  return ctx.scene.enter('edit_apt_wizard', { aptId });
});

bot.action(/admin_apt_del_(.+)/, async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  const aptId = ctx.match[1];
  await prisma.apartment.delete({ where: { id: aptId } });
  await ctx.answerCbQuery('Апартамент удален');
  
  // Refresh list
  const apts = await prisma.apartment.findMany();
  const keyboard = Markup.inlineKeyboard(
    apts.map(a => [Markup.button.callback(`❌ Удалить: ${a.name}`, `admin_apt_del_${a.id}`)]),
  );
  (keyboard.reply_markup as any).inline_keyboard.push([Markup.button.callback('⬅️ Назад', 'admin_apts')]);
  await ctx.editMessageText('Апартамент удален. Выберите следующий или вернитесь назад:', keyboard);
});

bot.action('admin_apt_add', async (ctx) => {
  if (!isAdmin(ctx)) return ctx.answerCbQuery('Доступ запрещен');
  await ctx.reply('Для добавления апартаментов, пожалуйста, отправьте JSON в правильном формате.\n\nПример JSON:\n```json\n{\n  "name": "Название",\n  "description": "Полное описание",\n  "shortDescription": "Краткое описание",\n  "capacity": 4,\n  "photos": ["ссылка1", "ссылка2"],\n  "homeReserveUrl": "ссылка",\n  "details": { ... }\n}\n```', { parse_mode: 'Markdown' });
});

// Handle JSON for adding apartments or forward messages to manager
bot.on('text', async (ctx, next) => {
  if (isAdmin(ctx) && ctx.message.text.startsWith('{')) {
    try {
      const data = JSON.parse(ctx.message.text);
      if (!data.name || !data.description) {
        return ctx.reply('❌ Ошибка: В JSON должны быть как минимум поля "name" и "description".');
      }

      await prisma.apartment.create({
        data: {
          name: data.name,
          description: data.description,
          shortDescription: data.shortDescription || '',
          capacity: data.capacity || 2,
          photos: data.photos || [],
          homeReserveUrl: data.homeReserveUrl,
          details: data.details || {},
        }
      });

      return ctx.reply(`✅ Апартамент "${data.name}" успешно добавлен!`);
    } catch (e) {
      console.error('JSON parse error:', e);
      return ctx.reply('❌ Ошибка при разборе JSON или сохранении в базу.');
    }
  }

  // Forward other messages to manager if not a command
  if (!ctx.message.text.startsWith('/')) {
    const managerIds = process.env.MANAGER_ID?.split(',').map(id => id.trim()) || [];
    if (managerIds.length > 0 && ctx.from) {
      const forwardText = `📨 *Новое сообщение от пользователя!*\n\n` +
        `👤 Имя: ${ctx.from.first_name} ${ctx.from.last_name || ''}\n` +
        `🆔 ID: ${ctx.from.id}\n` +
        `💬 Сообщение: ${ctx.message.text}`;
      
      for (const id of managerIds) {
        await ctx.telegram.sendMessage(id, forwardText, { parse_mode: 'Markdown' }).catch(err => {
          console.error(`Failed to forward message to ${id}:`, err);
        });
      }
      await ctx.reply('Ваше сообщение отправлено менеджеру. Мы свяжемся с вами в ближайшее время!');
    }
  }
  
  return next();
});

// Callback handlers
bot.action('start', async (ctx) => {
  await ctx.editMessageText('Выберите интересующий вас раздел:', mainKeyboard);
});

bot.action(/apt_dates_(.+)/, async (ctx) => {
  const aptId = ctx.match[1];
  const apt = await prisma.apartment.findUnique({ where: { id: aptId } });

  if (!apt) return ctx.answerCbQuery('Апартамент не найден');

  if (apt.homeReserveUrl) {
    await ctx.reply(`📅 Проверить свободные даты для *${apt.name}* можно по ссылке:`, 
      Markup.inlineKeyboard([
        [Markup.button.url('Перейти в HomeReserve', apt.homeReserveUrl)],
        [Markup.button.callback('⬅️ Назад', 'apartments')]
      ])
    );
  } else {
    await ctx.reply('Для этого апартамента ссылка на календарь не настроена.', 
      Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Назад', 'apartments')]
      ])
    );
  }
});

bot.action('free_dates', async (ctx) => {
  const text = '📅 *Свободные даты*\n\nВы можете проверить доступность всех наших апартаментов и забронировать их онлайн через наш модуль бронирования:';
  const keyboard = Markup.inlineKeyboard([
    [Markup.button.url('Перейти к бронированию', 'https://homereserve.ru/7rgUPbpYQz')],
    [Markup.button.callback('⬅️ Назад', 'start')]
  ]);

  if (ctx.callbackQuery && 'message' in ctx.callbackQuery) {
    await ctx.editMessageText(text, { parse_mode: 'Markdown', ...keyboard });
  } else {
    await ctx.reply(text, { parse_mode: 'Markdown', ...keyboard });
  }
});

bot.action('apartments', async (ctx) => {
  const apartments = await prisma.apartment.findMany({ orderBy: { createdAt: 'asc' } });
  
  if (apartments.length === 0) {
    const emptyText = 'К сожалению, список апартаментов пока пуст.';
    const emptyKb = Markup.inlineKeyboard([Markup.button.callback('⬅️ Назад', 'start')]);
    try {
      return await ctx.editMessageText(emptyText, emptyKb);
    } catch {
      return await ctx.reply(emptyText, emptyKb);
    }
  }

  const keyboard = Markup.inlineKeyboard(
    apartments.map(apt => [Markup.button.callback(apt.name, `apt_preview_${apt.id}`)]),
  );
  (keyboard.reply_markup as any).inline_keyboard.push([Markup.button.callback('⬅️ В главное меню', 'start')]);

  const text = '🌴 *Наши апартаменты*\n\nВыберите интересующий вас адрес из списка ниже, чтобы посмотреть фото и подробную информацию:';
  
  // If the current message has a photo, we CANNOT use editMessageText.
  // We must delete it and send a new message.
  const message = ctx.callbackQuery && 'message' in ctx.callbackQuery ? ctx.callbackQuery.message : null;
  const hasPhoto = message && 'photo' in message;

  if (hasPhoto) {
    await ctx.deleteMessage().catch(() => {});
    await ctx.reply(text, { parse_mode: 'Markdown', ...keyboard });
  } else {
    try {
      await ctx.editMessageText(text, { parse_mode: 'Markdown', ...keyboard });
    } catch {
      await ctx.reply(text, { parse_mode: 'Markdown', ...keyboard });
    }
  }
});

bot.action(/apt_preview_(.+)/, async (ctx) => {
  const aptId = ctx.match[1];
  const apt = await prisma.apartment.findUnique({ where: { id: aptId } });

  if (!apt) return ctx.answerCbQuery('Апартамент не найден');

  const caption = `🏠 *${apt.name}*\n\n${apt.shortDescription}\n\n👥 Вместимость: ${apt.capacity} чел.`;
  
  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('📸 Посмотреть все фото', `apt_photos_${apt.id}`)],
    [Markup.button.callback('📖 Подробное описание', `apt_details_${apt.id}`)],
    [Markup.button.url('📅 Проверить даты', apt.homeReserveUrl || '#')],
    [Markup.button.callback('⬅️ Назад к списку', 'apartments')],
  ]);

  if (apt.photos.length > 0) {
    await ctx.replyWithPhoto(apt.photos[0], { caption, parse_mode: 'Markdown', ...keyboard });
    // Delete the previous menu message to keep chat clean
    if (ctx.callbackQuery && 'message' in ctx.callbackQuery) {
      await ctx.deleteMessage().catch(() => {});
    }
  } else {
    await ctx.reply(caption, { parse_mode: 'Markdown', ...keyboard });
  }
});

bot.action(/apt_photos_(.+)/, async (ctx) => {
  const aptId = ctx.match[1];
  const apt = await prisma.apartment.findUnique({ where: { id: aptId } });

  if (!apt || apt.photos.length === 0) return ctx.answerCbQuery('Фото не найдены');

  await ctx.answerCbQuery('Загружаю фотографии...');

  const media = apt.photos.map((photo, index) => ({
    type: 'photo' as const,
    media: photo,
    caption: index === 0 ? `📸 Фотографии: *${apt.name}*` : undefined,
    parse_mode: 'Markdown' as const,
  }));

  await ctx.replyWithMediaGroup(media);
  await ctx.reply('Вернуться к описанию:', Markup.inlineKeyboard([
    [Markup.button.callback('⬅️ Назад к апартаменту', `apt_preview_${apt.id}`)]
  ]));
});

bot.action(/apt_details_(.+)/, async (ctx) => {
  const aptId = ctx.match[1];
  const apt = await prisma.apartment.findUnique({ where: { id: aptId } });

  if (!apt) return ctx.answerCbQuery('Апартамент не найден');

  let text = `*${apt.name}*\n\n`;
  
  const details = apt.details as any;
  if (details) {
    // 1. О жилье
    if (details.about) {
      text += `🏠 *О жилье:*\n`;
      text += `— ${details.about.rooms}, ${details.about.area}\n`;
      text += `— Этаж: ${details.about.floor}\n`;
      if (details.about.view) text += `— Вид: ${details.about.view}\n`;
      text += `— Спальные места: ${details.about.beds.join(', ')}\n\n`;
    }

    // 2. Описание (если есть)
    text += `${apt.description}\n\n`;

    // 3. Удобства и территория
    if (details.features && details.features.length > 0) {
      text += `🏡 *Территория ЖК:*\n`;
      text += details.features.map((f: string) => `— ${f}`).join('\n') + '\n\n';
    }

    // 4. Оснащение
    if (details.equipment && details.equipment.length > 0) {
      text += `🛋 *В апартаментах:*\n`;
      text += details.equipment.slice(0, 15).join(', ') + ' и др.\n\n';
    }

    // 5. Условия и правила
    if (details.bookingConditions || details.rules) {
      text += `💰 *Условия:*\n`;
      if (details.bookingConditions?.deposit) text += `— Депозит: ${details.bookingConditions.deposit}\n`;
      if (details.bookingConditions?.cleaningFee) text += `— Уборка: ${details.bookingConditions.cleaningFee}\n`;
      if (details.bookingConditions?.checkIn) text += `— Заезд: с ${details.bookingConditions.checkIn}, выезд: до ${details.bookingConditions.checkOut}\n`;
      if (details.rules?.petsAllowed !== undefined) text += `— Питомцы: ${details.rules.petsAllowed ? 'по согласованию' : 'нет'}\n`;
      text += '\n';
    }

    // 6. Локация
    if (details.location) {
      text += `📍 *Локация:*\n`;
      text += `— ${details.location.address}\n`;
      if (details.location.seaDistance) text += `— До моря: ${details.location.seaDistance}\n`;
    }
  } else {
    text += `${apt.description}\n`;
  }

  text += `\n👥 Вместимость: ${apt.capacity} чел.`;
  
  const keyboard = Markup.inlineKeyboard([
    [Markup.button.url('📅 Забронировать в HomeReserve', apt.homeReserveUrl || '#')],
    [Markup.button.callback('⬅️ Назад к превью', `apt_preview_${apt.id}`)],
  ]);

  await ctx.replyWithMarkdown(text, keyboard);
  // Delete the preview message to keep chat clean
  if (ctx.callbackQuery && 'message' in ctx.callbackQuery) {
    await ctx.deleteMessage().catch(() => {});
  }
});

bot.action('faq', async (ctx) => {
  const faqs = await prisma.fAQ.findMany({ orderBy: { order: 'asc' } });
  
  if (faqs.length === 0) {
    const emptyText = 'Раздел FAQ пока пуст.';
    const emptyKb = Markup.inlineKeyboard([Markup.button.callback('⬅️ Назад', 'start')]);
    try {
      return await ctx.editMessageText(emptyText, emptyKb);
    } catch {
      return await ctx.reply(emptyText, emptyKb);
    }
  }

  const keyboard = Markup.inlineKeyboard(
    faqs.map(f => [Markup.button.callback(f.question, `faq_answer_${f.id}`)]),
  );
  (keyboard.reply_markup as any).inline_keyboard.push([Markup.button.callback('⬅️ Назад в меню', 'start')]);

  const text = '❓ *Часто задаваемые вопросы*\n\nВыберите интересующий вас вопрос, чтобы получить подробный ответ:';

  if (ctx.callbackQuery && 'message' in ctx.callbackQuery) {
    await ctx.editMessageText(text, { parse_mode: 'Markdown', ...keyboard });
  } else {
    await ctx.reply(text, { parse_mode: 'Markdown', ...keyboard });
  }
});

bot.action(/faq_answer_(.+)/, async (ctx) => {
  const faqId = ctx.match[1];
  const faq = await prisma.fAQ.findUnique({ where: { id: faqId } });

  if (!faq) return ctx.answerCbQuery('Вопрос не найден');

  await ctx.reply(`❓ ${faq.question}\n\n💡 ${faq.answer}`, Markup.inlineKeyboard([
    [Markup.button.callback('⬅️ К вопросам', 'faq')]
  ]));
});

bot.action('contact', async (ctx) => {
  const text = `📞 *Наши контакты*\n\n📱 Телефон: ${process.env.MANAGER_PHONE}\n\nВы можете написать менеджеру напрямую или оставить заявку, и мы свяжемся с вами!`;
  await ctx.editMessageText(text, { parse_mode: 'Markdown', ...contactKeyboard });
});

bot.action('about', async (ctx) => {
  const aboutTextSetting = await prisma.setting.findUnique({ where: { key: 'about_text' } });
  const aboutPhotosSetting = await prisma.setting.findUnique({ where: { key: 'about_photos' } });

  const text = aboutTextSetting?.value || `🏡 *О Комплексе Green Palace*...`;
  const photos = aboutPhotosSetting ? JSON.parse(aboutPhotosSetting.value) : [];

  const media = photos.map((photo: string) => ({
    type: 'photo' as const,
    media: photo,
    parse_mode: 'Markdown' as const,
  }));

  try {
    if (media.length > 0) {
      await ctx.replyWithMediaGroup(media);
    }
    
    await ctx.reply(text, { 
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('⬅️ Назад', 'start')]
      ])
    });

    if (ctx.callbackQuery && 'message' in ctx.callbackQuery) {
      await ctx.deleteMessage().catch(() => {});
    }
  } catch (error) {
    console.error('Error in about section:', error);
    await ctx.reply(text, { 
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([[Markup.button.callback('⬅️ Назад', 'start')]])
    });
  }
});

// Error handling
bot.catch((err: any, ctx) => {
  console.error(`Error for ${ctx.updateType}`, err);
});

// Launch
console.log('Launching bot...');
bot.launch().then(() => {
  console.log('Bot is running...');
}).catch(err => {
  console.error('Failed to launch bot:', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
