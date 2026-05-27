import { Scenes, Markup } from 'telegraf';
import { prisma } from '../services/prisma.service';

export const bookingWizard = new Scenes.WizardScene(
  'booking_wizard',
  async (ctx) => {
    await ctx.reply('Давайте оформим заявку. Как вас зовут?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, введите имя текстом.');
    (ctx.scene.state as any).name = ctx.message.text;
    await ctx.reply('Ваш номер телефона?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, введите номер телефона.');
    (ctx.scene.state as any).phone = ctx.message.text;
    
    const apartments = await prisma.apartment.findMany();
    const keyboard = Markup.inlineKeyboard(
      apartments.map(a => [Markup.button.callback(a.name, `select_apt_${a.id}`)])
    );
    
    await ctx.reply('Какой апартамент вас интересует?', keyboard);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!('callback_query' in ctx.update)) return ctx.reply('Пожалуйста, выберите апартамент из списка.');
    const cbQuery = ctx.update.callback_query as any;
    const aptId = cbQuery.data.replace('select_apt_', '');
    (ctx.scene.state as any).apartmentId = aptId;
    
    await ctx.answerCbQuery();
    await ctx.reply('На какие даты планируете заезд? (например, 01.06 - 10.06)');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, введите даты.');
    (ctx.scene.state as any).dates = ctx.message.text;
    await ctx.reply('Любые пожелания или комментарии? (или напишите "нет")');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, введите комментарий.');
    const state = ctx.scene.state as any;
    state.comment = ctx.message.text;

    try {
      const booking = await prisma.booking.create({
        data: {
          name: state.name,
          phone: state.phone,
          apartmentId: state.apartmentId,
          dates: state.dates,
          comment: state.comment === 'нет' ? null : state.comment,
        },
        include: { apartment: true }
      });

      await ctx.reply('✅ Спасибо! Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.');
      
      // Notify manager
      const managerId = process.env.MANAGER_ID;
      if (managerId) {
        const notificationText = `🔔 *Новая заявка на бронирование!*\n\n` +
          `👤 Имя: ${booking.name}\n` +
          `📱 Телефон: ${booking.phone}\n` +
          `🏨 Апартамент: *${booking.apartment.name}*\n` +
          `📅 Даты: ${booking.dates}\n` +
          `💬 Комментарий: ${booking.comment || 'нет'}\n` +
          `🕒 Время: ${booking.createdAt.toLocaleString()}`;
        
        await ctx.telegram.sendMessage(managerId, notificationText, { parse_mode: 'Markdown' });
      }
      
      console.log(`New booking: ${booking.id} for ${booking.apartment.name}`);
      
    } catch (error) {
      console.error('Booking error:', error);
      await ctx.reply('Произошла ошибка при сохранении заявки. Пожалуйста, попробуйте позже или свяжитесь с менеджером напрямую.');
    }

    return ctx.scene.leave();
  }
);
