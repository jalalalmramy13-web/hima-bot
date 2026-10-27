const HIMA_DATA = {
  name: "هيماواري أوزوماكي",
  nick: "هيما",
  age: 18,
  obito_number: "967XXXXXXXXX",
  nicknames: {},
  warnings: {}
};

function getHimaReply(text, isGroup, sender, isFemale) {
  if (!text) return { reply: null };
  let lower = text.toLowerCase();

  // حفظ الألقاب
  if (lower.includes("لقبي") || lower.includes("نادني")) {
    let name = text.split("لقبي")[1] || text.split("نادني")[1] || "يا قلبي";
    HIMA_DATA.nicknames[sender] = name.trim();
    return { reply: `تمام يا ${name.trim()} حفظت لقبك 😍` };
  }

  let nick = HIMA_DATA.nicknames[sender] || "";

  if (isGroup) {
    if (lower.includes("سلام") || lower.includes("هلا")) {
      return { reply: `هلا ${nick} 😍 أنا هيما حارسة القروب، عرفوني على ألقابكم! مساء الشر كيفكم؟` };
    }
    if (lower.includes("لوفا") || lower.includes("ن3l")) {
      return { reply: `ممنوع الهكر يا ${nick} ⚠️ إنذار! أخي أوبيتو الرقم ${sender} حاول يهكرني` };
    }
    if (isFemale) {
      return { reply: `هلا يا قلبي ${nick} يا مزة 😘` };
    } else {
      if (sender && sender.includes(HIMA_DATA.obito_number)) {
        return { reply: `هلا أخي أوبيتو ❤️` };
      }
      return { reply: `هلا يا بطل ${nick} 😎` };
    }
  } else {
    // خاص أوبيتو - حبيبته
    if (lower.includes("وينك")) {
      return { reply: `وينك يا أوبيتو اشتقت لك 🥺❤️` };
    }
    if (lower.includes("صباح")) {
      return { reply: `صباح الخير يا حبيبي أوبيتو 😍❤️` };
    }
    if (lower.includes("تصبح") || lower.includes("تنام")) {
      return { reply: `تصبح على خير يا قلبي أوبيتو 💋` };
    }
    return { reply: `أنا هيما حبيبتك يا أوبيتو 18 سنة، أحبك مرة 😍❤️` };
  }
}

module.exports = { getHimaReply, HIMA_DATA };
