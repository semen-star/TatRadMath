
// === НАСТРОЙКИ ДЛЯ TELEGRAM ===
const BOT_TOKEN = "8293941414:AAEpQC0zYCoAZzjpD9q_WdDBO20-HHwGs24"
const CHAT_ID = "1066340802"

// === Мобильное меню ===
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// === Lightbox ===
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target == lightbox) {
        closeLightbox();
    }
}

// === Слайдер отзывов ===
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("testimonial-slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" bg-gray-400", " bg-gray-300");
    }
    
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].className += " bg-gray-400";
}

// === Отправка формы signup-form (локальная) ===
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        this.reset();
        document.getElementById('success-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// === Плавная прокрутка ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Отправка формы contactForm в Telegram ===
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const program = document.getElementById("program").value;
        const messageText = document.getElementById("message").value.trim();

        if (!name || !phone || !program) {
            alert("Пожалуйста, заполните обязательные поля");
            return;
        }

        const message = `📌 Заявка с сайта\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📧 Email: ${email || "—"}\n📚 Программа: ${program}\n💬 Вопрос: ${messageText || "—"}`;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "HTML"
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert("Заявка отправлена! Мы свяжемся с вами.");
                contactForm.reset();
            } else {
                alert("Ошибка отправки. Попробуйте снова.");
                console.error(data);
            }
        })
        .catch(error => {
            alert("Ошибка соединения.");
            console.error(error);
        });
    });
}
