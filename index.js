const TelegramApi = require('node-telegram-bot-api')

const token = '6852802433:AAE8ER8tV5DxpvSSuBpBPcRRGziVoKCj3xI'

const bot = new TelegramApi(token, {polling:true})


//Рисуем кнопки на стартовой странице
const buttonOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Информация о конференции', callback_data: '1'}],
            [{text: 'Информация о спонсорах', callback_data: '2'}],
            [{text: 'Стать участником', callback_data: '3'}],
            [{text: 'Магазин', callback_data: '4'}],
        ]
    })
}


const buttonInformation = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Общая информация', callback_data: '5'}],
            [{text: 'Дата и место проведения', callback_data: '6'}],
            [{text: 'Оргвзносы за участие', callback_data: '7'}],
        ]
    })
}
const buttonReport = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Требования к докладу', callback_data: '8'}],
            [{text: 'Подать стендовый доклад', callback_data: '9'}],
            [{text: 'Подать устный доклад', callback_data: '10'}],
        ]
    })
}




const start = () => {
    //Команды из меню
    bot.setMyCommands([
        {command: '/start', description: 'Начальное привествие'},
        {command: '/info', description: 'Информация о конференции'},
        {command: '/sponsors', description: 'Информация о спонсорах'},
        {command: '/part', description: 'Стать участником'},
        {command: '/shop', description: "Магазин"}
    ])


    bot.on('message',async msg =>{

        //Текст, который отправил пользователь
        const text = msg.text;
        //ID чата
        const chatId = msg.chat.id;


        if (text === '/start'){
            //Добавление ссылки на стикер
            //await bot.sendSticker(ChatId, 'C:\\Users\\Ольга\\Desktop\\Holoexpo\\welcome.png')

            //Привественное сообщение
            return bot.sendMessage(chatId, `${msg.from.first_name}, добро пожаловать в телеграм бот команды Holoexpo! `, buttonOptions)

        }

        return bot.sendMessage(chatId, `${msg.from.first_name}, я Вас не понимаю.. Попробуйте ещё раз!`,buttonOptions)
    })


    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '1'){
            bot.sendMessage(chatId,'Мы рады, что Вы хотите узнать больше о конференции Holoexpo 2024! Выберите, пожалуйста, интересующий раздел', buttonInformation)

        }
        else if (data === '2'){
            bot.sendMessage(chatId, 'Тут пока пусто...')
        }
        else if (data === '3'){
            bot.sendMessage(chatId, `${msg.from.first_name}, мы рады, что Вы хотите стать участником конференции Holoexpo 2024! Эта информация для Вас`, buttonReport)
        }
        else if (data === '4'){
            bot.sendMessage(chatId, 'Это магазин и тут пока пусто...')
        }

    })
}


start()

//информация о конференции 2024: 1) общаяя инормация 2)дата и место проведения 3)оргвзносы за участие 4)