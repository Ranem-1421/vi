const medicines = {
    "دواء 1": {
        "الجرعات": ["جرعة 1", "جرعة 2"],
        "الأعراض الجانبية": ["ألم رأس", "غثيان"],
        "المكونات": ["مكون 1", "مكون 2"]
    },
    "دواء 2": {
        "الجرعات": ["جرعة 3", "جرعة 4"],
        "الأعراض الجانبية": ["دوار", "إسهال"],
        "المكونات": ["مكون 3", "مكون 4"]
    }
};

let currentMedicine = null;

function appendMessage(text, sender) {
    const chat = document.getElementById('chat');
    const newMessage = document.createElement('div');
    newMessage.className = 'message ' + (sender === "البوت" ? "bot" : "user");
    newMessage.textContent = `${sender}: ${text}`;
    chat.appendChild(newMessage);
    chat.scrollTop = chat.scrollHeight; // التمرير لأسفل
}

function handleUserInput() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (!message) return;

    // إضافة رسالة المستخدم
    appendMessage(message, "أنت");

    if (!currentMedicine) {
        // ترحيب واختيار الدواء
        if (medicines[message]) {
            currentMedicine = message;
            appendMessage("لقد اخترت: " + message + ". اختر نوع المعلومات: الجرعات، الأعراض الجانبية، المكونات.", "البوت");
        } else {
            appendMessage("الدواء غير موجود. اختر من: " + Object.keys(medicines).join(", "), "البوت");
        }
    } else {
        // عرض المعلومات المحددة
        const medicineInfo = medicines[currentMedicine];
        if (message in medicineInfo) {
            appendMessage(message + ": " + medicineInfo[message].join(", "), "البوت");
            currentMedicine = null; // إعادة تعيين بعد العرض
            appendMessage("اختر دواء آخر أو ابدأ من جديد.", "البوت");
        } else {
            appendMessage("الاختيار غير صحيح. اختر: الجرعات، الأعراض الجانبية، أو المكونات.", "البوت");
        }
    }

    userInput.value = '';
}

document.getElementById('sendButton').addEventListener('click', handleUserInput);
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});

// عرض الرسالة الترحيبية
appendMessage("مرحباً بك! ابدأ بإدخال اسم دواء (دواء 1 أو دواء 2).", "البوت");
