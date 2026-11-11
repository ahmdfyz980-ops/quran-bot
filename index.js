const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('9031468987:AAH1tATer0CqopEFrTnXESerRK9tZlsvYTg');

// بنك أسئلة كبير ومتنوع عشان الأسئلة تتجدد وما تتكررش
const questions = [
  {
    question: "ما هي أعظم آية في القرآن الكريم؟",
    options: ["آية الكرسي", "آية الدين", "خواتيم سورة البقرة", "آية النور", "سورة الفاتحة", "آية الكوثر"],
    correct: 0
  },
  {
    question: "كم عدد سور القرآن الكريم؟",
    options: ["112 سورة", "114 سورة", "120 سورة", "110 سورة", "116 سورة", "108 سورة"],
    correct: 1
  },
  {
    question: "ما هي السورة التي تسمى بروح القرآن؟",
    options: ["سورة البقرة", "سورة يس", "سورة الرحمن", "سورة الملك", "سورة الكهف", "سورة الواقعة"],
    correct: 2
  },
  {
    question: "كم عدد أجزاء القرآن الكريم؟",
    options: ["20 جزءاً", "25 جزءاً", "30 جزءاً", "15 جزءاً", "40 جزءاً", "10 أجزاء"],
    correct: 2
  },
  {
    question: "ما هي السورة التي تنتهي كل آياتها بحرف السين؟",
    options: ["سورة الإخلاص", "سورة الناس", "سورة العاديات", "سورة الكوثر", "سورة الشرح", "سورة الفلق"],
    correct: 1
  }
];

bot.start((ctx) => {
  ctx.reply(
    `أهلاً بك يا بو حميد في بوت القرآن الكريم والمسابقات الدينية 🌙✨\n\nاختر ما تحب أن تبدأ به:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('📖 آية عشوائية', 'random_ayah')],
      [Markup.button.callback('🧠 ابدأ مسابقة القرآن الكريم (6 اختيارات)', 'start_quiz')]
    ])
  );
});

bot.action('random_ayah', (ctx) => {
  ctx.answerCbQuery();
  const ayahs = [
    "﴿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾\n\n'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ'",
    "﴿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾\n\n'إِنَّ مَعَ الْعُسْرِ يُسْرًا'",
    "﴿بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ﴾\n\n'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ'"
  ];
  const randomAyah = ayahs[Math.floor(Math.random() * ayahs.length)];
  ctx.reply(randomAyah);
});

bot.action('start_quiz', (ctx) => {
  ctx.answerCbQuery();
  
  // اختيار سؤال عشوائي من القائمة في كل مرة يضغط فيها المستخدم
  const randomIndex = Math.floor(Math.random()  * questions.length);
  const q = questions[randomIndex];

  const buttons = q.options.map((opt, index) => {
    // بنخزن رقم السؤال مع رقم الإجابة عشان نعرفه وقت الضغط
    return [Markup.button.callback(opt, `ans_${randomIndex}_${index}`)];
  });

  ctx.reply(`🧠 **سؤال مسابقة جديد:**\n\n${q.question}`, Markup.inlineKeyboard(buttons));
});

// استقبال الإجابة والتحقق منها بناءً على السؤال الذي ظهر
bot.action(/ans_(\d+)_(\d+)/, (ctx) => {
  ctx.answerCbQuery();
  const qIndex = parseInt(ctx.match[1]);
  const selectedIndex = parseInt(ctx.match[2]);
  const q = questions[qIndex];

  if (selectedIndex === q.correct) {
    ctx.reply("✅ إجابة صحيحة برافو عليك يا بو حميد! استمر 🌟\n\nاضغط على (ابدأ مسابقة) مرة أخرى لسؤال جديد!");
  } else {
    ctx.reply(`❌ إجابة خاطئة للأسف.\nالإجابة الصحيحة هي: **${q.options[q.correct]}**\n\nحاول مرة أخرى في سؤال جديد!`);
  }
});

bot.launch();
console.log("Bot is running successfully...");
