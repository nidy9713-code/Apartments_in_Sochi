import { Scenes, Markup } from 'telegraf';
import { prisma } from '../services/prisma.service';

export const editFaqWizard = new Scenes.WizardScene(
  'edit_faq_wizard',
  async (ctx) => {
    const faqId = (ctx.scene.state as any).faqId;
    const faq = await prisma.fAQ.findUnique({ where: { id: faqId } });
    if (!faq) {
      await ctx.reply('Вопрос не найден.');
      return ctx.scene.leave();
    }
    (ctx.scene.state as any).faq = faq;
    await ctx.reply(`Редактирование вопроса:\n\n*Вопрос:* ${faq.question}\n\nЧто вы хотите изменить?`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('❓ Изменить вопрос', 'edit_q')],
        [Markup.button.callback('💡 Изменить ответ', 'edit_a')],
        [Markup.button.callback('⬅️ Отмена', 'cancel')],
      ])
    });
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (ctx.callbackQuery && 'data' in ctx.callbackQuery) {
      const action = ctx.callbackQuery.data;
      if (action === 'cancel') {
        await ctx.reply('Редактирование отменено.');
        return ctx.scene.leave();
      }
      (ctx.scene.state as any).editField = action === 'edit_q' ? 'question' : 'answer';
      await ctx.reply(action === 'edit_q' ? 'Введите новый текст вопроса:' : 'Введите новый текст ответа:');
      return ctx.wizard.next();
    }
    return ctx.reply('Пожалуйста, выберите вариант в меню.');
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, отправьте текст.');
    const state = ctx.scene.state as any;
    
    try {
      await prisma.fAQ.update({
        where: { id: state.faqId },
        data: { [state.editField]: ctx.message.text }
      });
      await ctx.reply('✅ Изменения успешно сохранены!');
    } catch (error) {
      console.error('Edit FAQ error:', error);
      await ctx.reply('❌ Ошибка при сохранении.');
    }
    return ctx.scene.leave();
  }
);
