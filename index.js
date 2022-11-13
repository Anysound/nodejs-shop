const tgBot = require("node-telegram-bot-api");
const token = `5395482139:AAFeebmrdWKh_YfGPUl3rGmAm8gBRA1--wc`;

// Create a bot that uses 'polling' to fetch new updates
const bot = new tgBot(token, { polling: true });
const webAppUrl = "https://ya.ru";
// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Заполнить форму", web_app: { url: webAppUrl } }],
        ],
      },
    });

    await bot.sendMessage(chatId, "Заходи в наш интернет-магазин", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Сделать заказ", web_app: { url: webAppUrl } }],
        ],
      },
    });
  }
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});
