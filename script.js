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

// Only create hearts when finale section is in view + autoplay music
let musicStarted = false;
const birthdaySong = document.getElementById('birthdaySong');

const finaleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      createHearts();
      // Autoplay music
      if (!musicStarted && birthdaySong) {
        birthdaySong.volume = 0.5;
        birthdaySong.play().catch(() => {
          // Autoplay blocked — will play on first button click
        });
        musicStarted = true;
      }
      finaleObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const finaleSection = document.getElementById('finale');
if (finaleSection) finaleObserver.observe(finaleSection);


// ===== FIREWORKS ENGINE =====

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const particles = [];
const rockets = [];
let fireworkIntensity = 0;

function resizeCanvas() {
  if (!canvas) return;
  const section = document.getElementById('finale');
  canvas.width = section.offsetWidth;
  canvas.height = section.offsetHeight;
}

if (canvas) {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = 0.01 + Math.random() * 0.02;
    this.color = color;
    this.size = 1.5 + Math.random() * 2;
    this.gravity = 0.03;
    this.trail = [];
  }

  update() {
    this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
    if (this.trail.length > 5) this.trail.shift();
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.99;
    this.alpha -= this.decay;
  }

  draw(ctx) {
    // Draw trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = this.color.replace('1)', `${t.alpha * 0.3})`);
      ctx.fill();
    }
    // Draw particle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace('1)', `${this.alpha})`);
    ctx.fill();
    // Glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace('1)', `${this.alpha * 0.15})`);
    ctx.fill();
  }
}

class Rocket {
  constructor(x, targetY) {
    this.x = x;
    this.y = canvas.height;
    this.targetY = targetY;
    this.vy = -(6 + Math.random() * 4);
    this.alpha = 1;
    this.trail = [];
    this.exploded = false;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 8) this.trail.shift();
    this.y += this.vy;
    this.vy += 0.05;

    if (this.vy >= 0 || this.y <= this.targetY) {
      this.explode();
      this.exploded = true;
    }
  }

  draw(ctx) {
    // Rocket trail
    for (let i = 0; i < this.trail.length; i++) {
      const t = this.trail[i];
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 220, 150, ${i / this.trail.length * 0.6})`;
      ctx.fill();
    }
    // Rocket head
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  explode() {
    const colors = [
      'rgba(255, 107, 157, 1)',
      'rgba(245, 200, 66, 1)',
      'rgba(192, 132, 252, 1)',
      'rgba(100, 200, 255, 1)',
      'rgba(255, 165, 0, 1)',
      'rgba(0, 255, 150, 1)',
      'rgba(255, 80, 80, 1)',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 40 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(this.x, this.y, color));
    }
  }
}

function launchFireworks(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = canvas.width * 0.15 + Math.random() * canvas.width * 0.7;
      const targetY = canvas.height * 0.1 + Math.random() * canvas.height * 0.4;
      rockets.push(new Rocket(x, targetY));
    }, i * (80 + Math.random() * 150));
  }
}

function animateFireworks() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update & draw rockets
  for (let i = rockets.length - 1; i >= 0; i--) {
    rockets[i].update();
    if (!rockets[i].exploded) {
      rockets[i].draw(ctx);
    } else {
      rockets.splice(i, 1);
    }
  }

  // Update & draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    } else {
      particles[i].draw(ctx);
    }
  }

  requestAnimationFrame(animateFireworks);
}

if (canvas) animateFireworks();

// Salute button
const saluteBtn = document.getElementById('saluteBtn');
let clickCount = 0;

if (saluteBtn) {
  saluteBtn.addEventListener('click', () => {
    clickCount++;

    // Start music if autoplay was blocked
    if (birthdaySong && birthdaySong.paused) {
      birthdaySong.volume = 0.5;
      birthdaySong.play().catch(() => {});
    }

    // More clicks = more fireworks
    const count = Math.min(3 + clickCount * 2, 25);
    launchFireworks(count);

    // Screen shake on heavy firepower
    if (clickCount > 5) {
      document.getElementById('finale').style.animation = 'screenShake 0.3s ease';
      setTimeout(() => {
        document.getElementById('finale').style.animation = '';
      }, 300);
    }
  });
}


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
