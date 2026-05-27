import { Markup } from 'telegraf';

export const adminKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('🏨 Управление апартаментами', 'admin_apts'),
  Markup.button.callback('❓ Управление FAQ', 'admin_faq'),
  Markup.button.callback('ℹ️ О комплексе', 'admin_about'),
  Markup.button.callback('📅 Просмотр заявок', 'admin_bookings'),
  Markup.button.callback('📊 Статистика', 'admin_stats'),
  Markup.button.callback('⬅️ Выйти из админки', 'start'),
], { columns: 1 });

export const adminAptsKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('➕ Добавить апартамент', 'admin_apt_add')],
  [Markup.button.callback('✏️ Редактировать', 'admin_apt_list')],
  [Markup.button.callback('⬅️ Назад', 'admin_main')],
]);

export const adminFaqKeyboard = Markup.inlineKeyboard([
  [Markup.button.callback('➕ Добавить вопрос', 'admin_faq_add')],
  [Markup.button.callback('✏️ Редактировать / Удалить', 'admin_faq_list')],
  [Markup.button.callback('⬅️ Назад', 'admin_main')],
]);
