import { Scenes, Markup } from 'telegraf';
import { prisma } from '../services/prisma.service';

export const editAboutWizard = new Scenes.WizardScene(
  'edit_about_wizard',
  async (ctx) => {
    await ctx.reply('Что вы хотите отредактировать?', Markup.inlineKeyboard([
      [Markup.button.callback('📝 Текст описания', 'edit_about_text')],
      [Markup.button.callback('📸 Фотографии (JSON)', 'edit_about_photos')],
      [Markup.button.callback('⬅️ Отмена', 'cancel')],
    ]));
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;
      if (action === 'cancel') {
        await ctx.reply('Редактирование отменено.');
        return ctx.scene.leave();
      }
      (ctx.scene.state as any).editType = action;
      if (action === 'edit_about_text') {
        await ctx.reply('Введите новый текст для раздела "О комплексе":');
      } else {
        await ctx.reply('Введите новый список ссылок на фото в формате JSON (массив строк):');
      }
      return ctx.wizard.next();
    }
    return ctx.reply('Пожалуйста, выберите вариант в меню.');
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, отправьте текст.');
    const state = ctx.scene.state as any;
    
    try {
      if (state.editType === 'edit_about_text') {
        await prisma.setting.upsert({
          where: { key: 'about_text' },
          update: { value: ctx.message.text },
          create: { key: 'about_text', value: ctx.message.text },
        });
        await ctx.reply('✅ Текст описания успешно обновлен!');
      } else {
        const photos = JSON.parse(ctx.message.text);
        if (!Array.isArray(photos)) throw new Error('Not an array');
        await prisma.setting.upsert({
          where: { key: 'about_photos' },
          update: { value: JSON.stringify(photos) },
          create: { key: 'about_photos', value: JSON.stringify(photos) },
        });
        await ctx.reply('✅ Список фотографий успешно обновлен!');
      }
    } catch (error) {
      console.error('Edit About error:', error);
      await ctx.reply('❌ Ошибка при сохранении. Проверьте формат данных.');
    }
    return ctx.scene.leave();
  }
);
