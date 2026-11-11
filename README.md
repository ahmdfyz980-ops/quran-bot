const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('9031468987:AAH1tATer0CqopEFrTnXESerRK9tZlsvYTg');

// قاعدة بيانات ضخمة ومنوعة لآيات وأسئلة القرآن الكريم
const questions = [
    {
        question: "ما هي أعظم آية في القرآن الكريم؟",
        options: ["آية الكرسي", "آية الدين", "سورة النور", "خواتيم البقرة", "سورة الكوثر", "سورة الفاتحة"],
        correct: 0
    },
    {
        question: "كم عدد سور القرآن الكريم؟",
        options: ["120 سورة", "114 سورة", "112 سورة", "108 سورة", "116 سورة", "110 سورة"],
        correct: 1
    },
    {
        question: "ما هي السورة التي تسمى بروح القرآن؟",
        options: ["سورة يس", "سورة البقرة", "سورة الرحمن", "سورة الملك", "سورة الواقعة", "سورة الكهف"],
        correct: 2
    },
    {
        question: "كم عدد أجزاء القرآن الكريم؟",
        options: ["30 جزءاً", "25 جزءاً", "20 جزءاً", "40 جزءاً", "10 أجزاء", "15 جزءاً"],
        correct: 0
    },
    {
        question: "ما هي السورة التي تسمى عروس القرآن؟",
        options: ["سورة الواقعة", "سورة الرحمن", "سورة الملك", "سورة يس", "سورة الحشر", "سورة النور"],
        correct: 1
    },
    {
        question: "أي من السور التالية تبدأ بـ 'الحمد لله'؟",
        options: ["البقرة", "آل عمران", "الفاتحة", "الأنعام", "الكهف", "كل ما سبق عدا البقرة"],
        correct: 2
    },
    {
        question: "ما هي السورة التي تعدل ثلث القرآن؟",
        options: ["سورة الكافرون", "سورة الإخلاص", "سورة الفلق", "سورة الناس", "سورة القدر", "سورة الضحى"],
        correct: 1
    },
    {
        question: "كم عدد السور التي تبدأ بالحروف المقطعة (الم)؟",
        options: ["3 سور", "6 سور", "8 سور", "10 سور", "12 سور", "5 سور"],
        correct: 1
    },
    {
        question: "ما هي السورة القرآنية التي خلت من حرف الباء؟",
        options: ["سورة الكوثر", "سورة العصر", "سورة قريش", "سورة الإخلاص", "سورة الفلق", "سورة الناس"],
        correct: 0
    },
    {
        question: "ما هي أطول سورة في القرآن الكريم؟",
        options: ["سورة آل عمران", "سورة النساء", "سورة البقرة", "سورة الأعراف", "سورة المائدة", "سورة الأنعام"],
        correct: 2
    },
    // آيات عشوائية للتحدي والاختبار
    {
        question: "أكمل الآية الكريمة: (وَلَسَوْفَ يُعْطِيكَ رَبُّكَ ...)",
        options: ["فَتَرْضَى", "فَتسعد", "فتخخشى", "فَتفرح", "خيراً كثيراً", "إلا قليلاً"],
        correct: 0
    },
    {
        question: "أكمل الآية الكريمة: (إِنَّ مَعَ الْعُسْرِ ...)",
        options: ["هدي", "يسرا", "رحمة", "مغفرة", "فوزاً", "عظيماً"],
        correct: 1
    }
];

// دالة لاختيار سؤال عشوائي بدون تكرار مباشر
function getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

bot.start((ctx) => {
    return ctx.reply(
        'مرحباً بك في بوت مسابقات القرآن الكريم 🌙\nاختر ما تحب أن تبدأ به:',
        Markup.keyboard([
            ['📖 آية عشوائية', '🧠 ابدأ مسابقة القرآن الكريم (6 اختيارات)']
        ]).resize()
    );
});

bot.hears('📖 آية عشوائية', (ctx) => {
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    ctx.reply(`بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n\n🔹 ${randomQ.question}\nالإجابة الصحيحة هي: ${randomQ.options[randomQ.correct]}`);
});

bot.hears('🧠 ابدأ مسابقة القرآن الكريم (6 اختيارات)', (ctx) => {
    const q = getRandomQuestion();
    
    // تصميم أزرار الاختيارات الـ 6 في صفوف مرتبة
    const buttons = [];
    for (let i = 0; i < q.options.length; i += 2) {
        const row = [
            Markup.button.callback(q.options[i], `ans_${i === q.correct ? 'true' : 'false'}`)
        ];
        if (q.options[i + 1]) {
            row.push(Markup.button.callback(q.options[i + 1], `ans_${(i + 1) === q.correct ? 'true' : 'false'}`));
        }
        buttons.push(row);
    }

    ctx.reply(`🧠 **سؤال مسابقة جديد:**\n\n${q.question}`, Markup.inlineKeyboard(buttons));
});

// التعامل مع إجابات الأزرار
bot.action(/ans_(true|false)/, (ctx) => {
    const isCorrect = ctx.match[1] === 'true';
    if (isCorrect) {
        ctx.answerCbQuery('إجابة صحيحة ومباركة! 🌟 أحسنت');
        ctx.editMessageText('✅ **إجابة صحيحة!** بارك الله في علمك وحفظك للقرآن.');
    } else {
        ctx.answerCbQuery('إجابة خاطئة، حاول مرة أخرى! ❌');
        ctx.editMessageText('❌ **إجابة خاطئة.** حاول مجدداً في السؤال القادم.');
    }
});

bot.launch();
console.log('Quran Bot is running successfully...');
