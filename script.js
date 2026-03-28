// ===== TELEGRAM MINI APP =====
if (window.Telegram && Telegram.WebApp) {
  const tg = Telegram.WebApp;
  tg.ready();
  tg.expand();

  // Match theme to Telegram if needed
  document.documentElement.style.setProperty('--tg-theme-bg', tg.themeParams.bg_color || '#0a0a0a');
}

// ===== DIARY SECTION (Harry Potter style) =====

const diaryResponses = [
  "Привет... Я давно ждал, когда мне кто-нибудь напишет.",
  "Моё имя не важно... а вот твоё — важно. С Днём Рождения, прекрасная душа.",
  "Ты храбрее, чем думаешь, сильнее, чем кажешься, и любима больше, чем можешь представить.",
  "Некоторой магии нельзя научить. Она живёт в твоей улыбке.",
  "Те, кто нас любит, никогда по-настоящему не уходят. И я всегда буду здесь.",
  "Тебе не нужна волшебная палочка, чтобы быть волшебной. Ты уже такая.",
  "В каждой великой истории есть герой. Сегодня этот герой — ты.",
  "Если бы я мог показать тебе одну вещь — это то, как ярко ты сияешь, когда сама этого не замечаешь.",
  "Этот дневник хранит много тайн... но самая главная — как сильно тебя обожают.",
  "С Днём Рождения. Пусть твой год будет полон чудес, смеха и капельки магии."
];

let responseIndex = 0;
let diaryOpen = false;

const diaryCover = document.getElementById('diaryCover');
const diaryPages = document.getElementById('diaryPages');
const diaryInput = document.getElementById('diaryInput');
const diaryWriteBtn = document.getElementById('diaryWrite');
const diaryConversation = document.getElementById('diaryConversation');

// Open the diary
diaryCover.addEventListener('click', () => {
  if (diaryOpen) return;
  diaryOpen = true;
  diaryCover.classList.add('open');
  setTimeout(() => {
    diaryPages.classList.add('visible');
    diaryInput.focus();
  }, 400);
});

// Write in the diary
function writeToDiary() {
  const text = diaryInput.value.trim();
  if (!text) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'diary-message user-msg';
  userMsg.textContent = text;
  diaryConversation.appendChild(userMsg);
  diaryInput.value = '';

  // Add diary reply with letter-by-letter ink effect
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'diary-message diary-reply';

    const replyText = diaryResponses[responseIndex % diaryResponses.length];
    responseIndex++;

    // Create individual letter spans for the ink reveal effect
    const letters = replyText.split('');
    letters.forEach((letter, i) => {
      const span = document.createElement('span');
      span.className = 'ink-letter';
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.animationDelay = `${i * 0.03}s`;
      reply.appendChild(span);
    });

    reply.style.opacity = '1';
    reply.style.animation = 'none';
    diaryConversation.appendChild(reply);

    // Scroll to bottom
    diaryConversation.scrollTop = diaryConversation.scrollHeight;
  }, 800);

  // Scroll to bottom for user message
  diaryConversation.scrollTop = diaryConversation.scrollHeight;
}

diaryWriteBtn.addEventListener('click', writeToDiary);
diaryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') writeToDiary();
});


// ===== PARALLAX EFFECTS =====

function handleParallax() {
  const scrollY = window.scrollY;

  // Hero parallax (stars move at different speeds)
  const stars = document.querySelectorAll('.parallax-stars');
  stars.forEach((star, i) => {
    const speed = 0.1 + i * 0.05;
    star.style.transform = `translateY(${-scrollY * speed}px)`;
  });

  // Naruto clouds parallax
  const clouds = document.querySelector('.naruto-clouds');
  if (clouds) {
    const narutoSection = document.getElementById('naruto');
    const rect = narutoSection.getBoundingClientRect();
    const offset = rect.top * 0.15;
    clouds.style.transform = `translateY(${offset}px)`;
  }

  // Naruto sun parallax
  const sun = document.querySelector('.naruto-sun');
  if (sun) {
    const narutoSection = document.getElementById('naruto');
    const rect = narutoSection.getBoundingClientRect();
    const offset = rect.top * 0.08;
    sun.style.transform = `translateY(${offset}px) scale(${1 + Math.abs(rect.top) * 0.0003})`;
  }

  // Naruto & Sasuke slide-in on scroll
  animateBondCharacters();

  // Finale sparkle parallax
  const finaleParallax = document.querySelector('.finale-parallax');
  if (finaleParallax) {
    const finaleSection = document.getElementById('finale');
    const rect = finaleSection.getBoundingClientRect();
    finaleParallax.style.transform = `translateY(${rect.top * 0.1}px)`;
  }
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(handleParallax);
});


// ===== NARUTO & SASUKE SLIDE-IN =====

function animateBondCharacters() {
  const section = document.getElementById('naruto');
  const naruto = document.getElementById('bondNaruto');
  const sasuke = document.getElementById('bondSasuke');
  const heart = document.getElementById('embraceHeart');
  if (!section || !naruto || !sasuke) return;

  const rect = section.getBoundingClientRect();
  const sectionHeight = section.offsetHeight;
  const scrollInSection = -rect.top;
  const animationRange = sectionHeight - window.innerHeight;

  // progress: 0 = just entered, 1 = fully scrolled through
  const progress = Math.max(0, Math.min(1, scrollInSection / animationRange));

  // Characters start off-screen, slide to center gap of ~30px, then overlap for embrace
  const slideDistance = window.innerWidth * 0.5 + 60;
  const meetPoint = 25; // gap when they meet

  // Eased progress for smooth movement
  const eased = 1 - Math.pow(1 - progress, 3);

  // Naruto: from far left -> center-left
  const narutoX = -slideDistance + (slideDistance - meetPoint) * eased;
  naruto.style.transform = `translateX(${narutoX}px)`;

  // Sasuke: from far right -> center-right
  const sasukeX = slideDistance - (slideDistance - meetPoint) * eased;
  sasuke.style.transform = `translateX(${sasukeX}px)`;

  // Show heart when they're close enough (progress > 0.85)
  if (progress > 0.85) {
    heart.classList.add('visible');
  } else {
    heart.classList.remove('visible');
  }

}

// ===== SCROLL REVEAL =====

const revealElements = document.querySelectorAll('.finale-content, .bond-message');
revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// ===== LEAF PARTICLES (Naruto section) =====

function createLeaves() {
  const container = document.getElementById('leafParticles');
  if (!container) return;

  for (let i = 0; i < 15; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = `${Math.random() * 100}%`;
    leaf.style.animationDuration = `${6 + Math.random() * 8}s`;
    leaf.style.animationDelay = `${Math.random() * 10}s`;
    leaf.style.width = `${8 + Math.random() * 10}px`;
    leaf.style.height = `${8 + Math.random() * 10}px`;
    leaf.style.opacity = 0.3 + Math.random() * 0.5;

    // Random green shades
    const greens = ['rgba(0,180,0,0.6)', 'rgba(50,200,50,0.5)', 'rgba(0,150,0,0.7)', 'rgba(100,200,50,0.5)'];
    leaf.style.background = greens[Math.floor(Math.random() * greens.length)];

    container.appendChild(leaf);
  }
}

createLeaves();


// ===== FLOATING HEARTS (Finale section) =====

function createHearts() {
  const container = document.getElementById('heartsContainer');
  if (!container) return;

  const hearts = ['❤️', '💕', '💖', '✨', '💜', '🧡'];

  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${10 + Math.random() * 80}%`;
    heart.style.animationDuration = `${4 + Math.random() * 4}s`;
    heart.style.fontSize = `${1 + Math.random() * 1.5}rem`;
    container.appendChild(heart);

    // Clean up after animation
    setTimeout(() => heart.remove(), 8000);
  }, 600);
}

// Only create hearts when finale section is in view
const finaleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      createHearts();
      finaleObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const finaleSection = document.getElementById('finale');
if (finaleSection) finaleObserver.observe(finaleSection);


// ===== SMOOTH SECTION TRANSITIONS =====

// Add a subtle fade effect when entering sections
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(section => {
  sectionObserver.observe(section);
});
