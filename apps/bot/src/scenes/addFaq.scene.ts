import { Scenes, Markup } from 'telegraf';
import { prisma } from '../services/prisma.service';

export const addFaqWizard = new Scenes.WizardScene(
  'add_faq_wizard',
  async (ctx) => {
    await ctx.reply('Введите текст вопроса:');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, введите текст.');
    (ctx.scene.state as any).question = ctx.message.text;
    await ctx.reply('Введите текст ответа:');
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, введите текст.');
    const state = ctx.scene.state as any;
    
    try {
      await prisma.fAQ.create({
        data: {
          question: state.question,
          answer: ctx.message.text,
          order: (await prisma.fAQ.count()) + 1,
        }
      });
      await ctx.reply('✅ Вопрос успешно добавлен в FAQ!');
    } catch (error) {
      console.error('Add FAQ error:', error);
      await ctx.reply('Ошибка при сохранении вопроса.');
    }
    return ctx.scene.leave();
  }
);
