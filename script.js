// 1. Таймерді 05.06.2026, 19:00-ге орнату
const weddingDate = new Date("Jun 05, 2026 19:00:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    if (diff > 0) {
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000);
    }
}
setInterval(updateTimer, 1000);

// 2. WhatsApp-қа жіберу логикасы
function sendToWhatsApp(e) {
    e.preventDefault();

    // 1. Формадан мәліметтерді алу
    const nameInput = document.querySelector('input[type="text"]');
    const attendanceInput = document.querySelector('input[name="r"]:checked');

    if (!nameInput.value || !attendanceInput) {
        alert("Өтініш, аты-жөніңізді жазып, жауапты таңдаңыз!");
        return;
    }

    // 2. Нөмірді жазу (МАҢЫЗДЫ: Тек сандар, "+" белгісінсіз!)
    // Мысалы: "77071234567"
    const phoneNumber = "77XXXXXXXXX"; 

    // 3. Мәтінді қауіпсіз форматқа айналдыру (URL encode)
    const name = nameInput.value.trim();
    const status = attendanceInput.parentElement.innerText.trim();
    
    const message = encodeURIComponent(`Сәлеметсіз бе! Тойға шақыру бойынша жауап:\n\n👤 Есімі: ${name}\n✅ Таңдауы: ${status}`);

    // 4. WhatsApp сілтемесі (api.whatsapp.com - ең сенімді нұсқа)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    
    // Жаңа терезеде ашу
    window.open(whatsappUrl, '_blank');
}

document.querySelector("form").addEventListener("submit", sendToWhatsApp);

// 3. Авто-музыка және Пауза батырмасы
const music = document.getElementById("bgMusic");
const icon = document.getElementById("music-icon");

function toggleMusic() {
    if (music.paused) {
        music.play();
        icon.innerText = "⏸";
    } else {
        music.pause();
        icon.innerText = "🎵";
    }
}

// Браузерлердегі авто-плей шектеуін айналып өту:
// Қолданушы сайтты алғаш рет басқанда немесе айналдырғанда музыка қосылады
function autoPlayMusic() {
    if (music.paused) {
        music.play().then(() => {
            icon.innerText = "⏸";
            // Музыка қосылған соң оқиғаларды тыңдауды тоқтату
            window.removeEventListener('click', autoPlayMusic);
            window.removeEventListener('scroll', autoPlayMusic);
        }).catch(error => console.log("Авто-плей әлі рұқсат етілмеді"));
    }
}

window.addEventListener('click', autoPlayMusic);
window.addEventListener('scroll', autoPlayMusic);

// 2. Скролл эффектісі
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        let elementVisible = 100; // Элемент көрінуі үшін қажетті арақашықтық

        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);

// Сайт ашылғанда бір рет тексеру (жоғарғы бөлімдер үшін)
window.onload = reveal;

function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.innerHTML = "🌸";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = Math.random() * 15 + 10 + "px";
    petal.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.getElementById("flower-container").appendChild(petal);
    setTimeout(() => petal.remove(), 5000);
}
setInterval(createPetal, 500);
