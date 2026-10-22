const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true, args: ['--no-sandbox'] }
});

const MSG = `👑🔥 أهلاً وسهلاً بيكم في جروبنا الرسمي 🔥👑
💨❤️ نورتونا يا رجالة، الجروب جروبكم!
📢 تابعونا عشان تعرفوا كل جديد.
💬 يلا ورّونا تفاعلكم!`;

client.on('qr', qr => qrcode.generate(qr, {small: true}));
client.on('ready', () => console.log('شغال ✅'));
client.on('group_join', async (n) => {
    const chat = await n.getChat();
    await chat.sendMessage(MSG);
});
client.initialize();
require('http').createServer((req,res)=>res.end('ok')).listen(3000);
