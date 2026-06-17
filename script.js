// =============================================
// IMAROZE — COMMON SCRIPTS
// =============================================

// ─── PRELOADER ───
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => preloader.style.display = 'none', 600);
    }, 1000);
  }
});

// ========== NAVBAR SCROLL ==========
window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 70);
});

// ========== MOBILE MENU ==========
function toggleMob() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  const spans = document.querySelectorAll('.hamburger span');
  if (menu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(4px,4px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4px,-4px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}

function closeMob() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.querySelectorAll('.hamburger span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ========== CART BADGE ==========
function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('imaroze_cart') || '[]');
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = cart.length;
  });
}


function getCartItems() {
  return JSON.parse(localStorage.getItem('imaroze_cart') || '[]');
}

// ─── TOAST ───
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── GOOGLE SHEETS CONTACT ───
function sendContactForm(event) {
  event.preventDefault();
  const SHEETS_URL = "https://script.google.com/macros/s/AKfycby5kD1RTww-JOcI_qjfEcIaRWM1CzW_us9vkIrZfycJYpjpbQN0C_nmUEIljB06KQ/exec";
  
  const data = {
    firstName: document.getElementById('cfFirst')?.value || '',
    lastName: document.getElementById('cfLast')?.value || '',
    email: document.getElementById('cfEmail')?.value || '',
    phone: document.getElementById('cfPhone')?.value || '',
    subject: document.getElementById('cfSubject')?.value || '',
    message: document.getElementById('cfMessage')?.value || '',
    date: new Date().toISOString()
  };
  
  if (!data.firstName || !data.email.includes('@')) {
    showToast('Please fill in your name and email');
    return;
  }
  
  fetch(SHEETS_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).catch(() => {});
  
  const saved = JSON.parse(localStorage.getItem('imaroze_leads') || '[]');
  saved.push(data);
  localStorage.setItem('imaroze_leads', JSON.stringify(saved));
  
  showToast('Thank you! We will respond within 24 hours.');
  event.target.reset();
}

// ─── FAQ TOGGLE ───
function toggleFAQ(element) {
  const item = element.closest('.faq-item');
  if (!item) return;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    closeMob();
  });
});
