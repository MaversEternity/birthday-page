// ===== DIARY SECTION (Harry Potter style) =====

const diaryResponses = [
  "Hello... I've been waiting for someone to write to me.",
  "My name is not important... but yours is. Happy Birthday, beautiful soul.",
  "You are braver than you believe, stronger than you seem, and loved more than you know.",
  "Some magic cannot be taught. It lives in your smile.",
  "The ones who love us never really leave us. And I will always be here.",
  "You don't need a wand to be magical. You already are.",
  "Every great story has a hero. Today, that hero is you.",
  "If I could show you one thing, it would be how brightly you shine when you don't even realize it.",
  "This diary holds many secrets... but the greatest one is how much you are adored.",
  "Happy Birthday. May your year be filled with wonder, laughter, and a little bit of magic."
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

  // Bond panels parallax
  document.querySelectorAll('[data-parallax-speed]').forEach(el => {
    const speed = parseFloat(el.dataset.parallaxSpeed);
    const rect = el.getBoundingClientRect();
    const centerOffset = (rect.top - window.innerHeight / 2) * speed;
    el.style.transform = `translateY(${centerOffset}px)`;
  });

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


// ===== SCROLL REVEAL =====

const revealElements = document.querySelectorAll('.character-card, .bond-center, .finale-content');
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
