import { Markup } from 'telegraf';

export const mainKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('🏨 Апартаменты', 'apartments'),
  Markup.button.callback('📅 Свободные даты', 'free_dates'),
  Markup.button.callback('❓ Частые вопросы', 'faq'),
  Markup.button.callback('🏢 О комплексе', 'about'),
  Markup.button.callback('📞 Связаться', 'contact'),
], { columns: 1 });

export const contactKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('📝 Оставить заявку на бронь', 'create_booking')],
  [Markup.button.callback('⬅️ Назад', 'start')],
]);
