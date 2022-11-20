const tgBot = require("node-telegram-bot-api");
const token = `5395482139:AAFeebmrdWKh_YfGPUl3rGmAm8gBRA1--wc`;
const express = require("express");
const cors = require("cors");
// Create a bot that uses 'polling' to fetch new updates
const bot = new tgBot(token, { polling: true });
const app = express();
app.use(express.json()); // middleware for parsing json
app.use(cors()); // cross-domain queries

const webAppUrl = "https://fancy-centaur-b5ff64.netlify.app/";
// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Заполнить форму", web_app: { url: webAppUrl + "form" } }],
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
  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data);
      console.log(data);
      await bot.sendMessage(chatId, "Спасибо за обратную связь!");
      await bot.sendMessage(chatId, "Ваша страна: " + data?.country);
      await bot.sendMessage(chatId, "Ваша улица: " + data?.street);
    } catch (e) {
      console.log(e);
    }
  }
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});

app.post("/web-data", async (req, res) => {
  const { queryId, products, totalPrice } = req.body;
  try {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успешная покупка",
      inpout_message_content: {
        message_text:
          "Поздравляю с покупкой, Вы приобрели товар на сумму " + totalPrice,
      },
    });
    return res.status(200).json({});
  } catch (e) {
    await bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Не удалось приобрести товары",
      inpout_message_content: {
        message_text: "Не удалось приобрести товары, ошибка: " + e,
      },
    });
    return res.status(500).json({});
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("server started on port ", PORT));
