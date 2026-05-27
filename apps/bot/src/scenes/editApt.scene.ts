import { Scenes, Markup } from 'telegraf';
import { prisma } from '../services/prisma.service.js';

export const editAptWizard = new Scenes.WizardScene(
  'edit_apt_wizard',
  async (ctx) => {
    const aptId = (ctx.scene.state as any).aptId;
    const apt = await prisma.apartment.findUnique({ where: { id: aptId } });
    if (!apt) {
      await ctx.reply('Апартамент не найден.');
      return ctx.scene.leave();
    }
    (ctx.scene.state as any).apt = apt;
    await ctx.reply(`Редактирование апартамента: *${apt.name}*\n\nВыберите действие:`, {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        [Markup.button.callback('✏️ Изменить название', 'edit_name')],
        [Markup.button.callback('📝 Изменить описание', 'edit_desc')],
        [Markup.button.callback('👥 Изменить вместимость', 'edit_cap')],
        [Markup.button.callback('🔗 Изменить ссылку HomeReserve', 'edit_link')],
        [Markup.button.callback('📦 Обновить всё через JSON', 'edit_json')],
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
      (ctx.scene.state as any).editAction = action;
      
      const prompts: Record<string, string> = {
        edit_name: 'Введите новое название:',
        edit_desc: 'Введите новое полное описание:',
        edit_cap: 'Введите новую вместимость (число):',
        edit_link: 'Введите новую ссылку на HomeReserve:',
        edit_json: 'Отправьте новый JSON с данными апартамента (все поля будут обновлены):',
      };
      
      await ctx.reply(prompts[action]);
      return ctx.wizard.next();
    }
    return ctx.reply('Пожалуйста, выберите вариант в меню.');
  },
  async (ctx) => {
    if (!('text' in ctx.message!)) return ctx.reply('Пожалуйста, отправьте текст.');
    const state = ctx.scene.state as any;
    const text = ctx.message.text;
    
    try {
      let data: any = {};
      if (state.editAction === 'edit_name') data.name = text;
      else if (state.editAction === 'edit_desc') data.description = text;
      else if (state.editAction === 'edit_cap') data.capacity = parseInt(text);
      else if (state.editAction === 'edit_link') data.homeReserveUrl = text;
      else if (state.editAction === 'edit_json') {
        const json = JSON.parse(text);
        data = {
          name: json.name,
          description: json.description,
          shortDescription: json.shortDescription,
          capacity: json.capacity,
          photos: json.photos,
          homeReserveUrl: json.homeReserveUrl,
          details: json.details,
        };
      }

      await prisma.apartment.update({
        where: { id: state.aptId },
        data
      });
      await ctx.reply('✅ Изменения успешно сохранены!');
    } catch (error) {
      console.error('Edit Apartment error:', error);
      await ctx.reply('❌ Ошибка при сохранении. Проверьте формат данных.');
    }
    return ctx.scene.leave();
  }
);
