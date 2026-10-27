const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { getHimaPrompt, HIMA_DATA } = require('./hima.js');

async function startHima() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const sock = makeWASocket({ auth: state, printQRInTerminal: true });
    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if(shouldReconnect) startHima();
        } else if(connection === 'open') {
            console.log('هيما اشتغلت ❤️');
        }
    });
    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        if(!msg.message) return;
        const isGroup = msg.key.remoteJid.endsWith('@g.us');
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
        if(!text) return;
        const prompt = getHimaPrompt(isGroup, false, null);
        console.log(prompt, text);
        await sock.sendMessage(msg.key.remoteJid, { text: "هلا أنا هيما شغالة 😍" });
    });
}
startHima();
