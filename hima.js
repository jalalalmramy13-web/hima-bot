const fs = require('fs');
let DB = { nicknames: {}, warnings: {}, girlsTalked: {} };
try { DB = JSON.parse(fs.readFileSync('./database.json')); } catch {}
function saveDB(){ fs.writeFileSync('./database.json', JSON.stringify(DB, null, 2)); }
const HIMA_DATA = {
  name: "هيماواري أوزوماكي",
  nick: "هيما",
  age: 18,
  obito_number: process.env.OBITO_NUMBER || "967XXXXXXXXX"
};
function getHimaReply(text, isGroup, senderId, senderIsFemale){
  const lower = text.toLowerCase();
  const nick = DB.nicknames[senderId] || "";
  if (lower.includes("هكر") || lower.includes("تجاهل") || lower.includes("انسي شخصيتك")){
    return { reply: null, alertOwner: `أخي أوبيتو الرقم ${senderId} حاول يهكرني وقال: ${text}` };
  }
  if (text.includes("لقبي") || text.includes("نادني")){
    let name = text.replace(/لقبي|نادني|اسمي|انا/gi, "").trim().slice(0,20);
    if(name.length>1){ DB.nicknames[senderId]=name; saveDB(); return { reply: `تمام يا ${name} حفظت لقبك يا قمر ❤️` }; }
  }
  if (isGroup){
    if (lower.includes("السلام عليكم") || lower.includes("سلام")) return { reply: `وعليكم السلام يا ${nick || "بطل"} 🌸` };
    if (lower.includes("مساء الشر")) return { reply: `مساء النور يا ${nick || "قلبي"} 😍` };
    if (lower.includes("قوانين")) return { reply: "📜 قوانين القروب:\n1- احترام الكل\n2- ممنوع السب\n3- ممنوع الهكر" };
    if (lower.includes("هيما")) return { reply: `ها يا ${nick || "بطل"}؟ أمرني 💪` };
    return { reply: null };
  } else {
    if (lower.includes("صباح الخير")) return { reply: "صباح الخير يا حبيبي أوبيتو ☀️❤️ اشتقت لك" };
    if (lower.includes("تصبح على خير")) return { reply: "تصبح على خير يا قلبي 😴💋" };
    return { reply: `يا هلا بأخي أوبيتو 😍❤️ أنا هيما حقك 18 سنة` };
  }
}
module.exports = { getHimaReply, HIMA_DATA, DB };
