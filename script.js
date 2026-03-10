/* ===== MEDGUARDIAN - SCRIPT.JS ===== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initMobileMenu();
  setActiveNav();
  initScrollTop();
  initParallaxOrbs();
});

/* ===== NAVBAR SCROLL SHADOW ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== ACTIVE NAV LINK ===== */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ===== SCROLL ANIMATIONS =====
   Strategy:
   1. Only add .anim-ready to body AFTER confirming IntersectionObserver exists.
   2. Immediately observe all elements — those already in viewport get .visible instantly.
   3. No IntersectionObserver = content stays fully visible (no hidden elements).
*/
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  document.body.classList.add('anim-ready');

  const els = document.querySelectorAll('.fade-up, .fade-right, .fade-left, .fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.add('open');
    mobileNav.style.display = 'flex';
    requestAnimationFrame(() => mobileNav.classList.add('open'));
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { mobileNav.style.display = 'none'; }, 400);
  };

  if (mobileClose) mobileClose.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* ===== SCROLL TO TOP BUTTON ===== */
function initScrollTop() {
  if (!document.querySelector('.scroll-top')) {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>`;
    document.body.appendChild(btn);
  }
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== PARALLAX HERO ORBS ON MOUSEMOVE ===== */
function initParallaxOrbs() {
  const heroContent = document.querySelector('.hero-content');
  const heroOrb1 = document.querySelector('.hero-orb1');
  const heroOrb2 = document.querySelector('.hero-orb2');
  if (!heroContent) return;
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    if (heroOrb1) heroOrb1.style.transform = `translateY(-50%) translate(${x * 18}px, ${y * 12}px)`;
    if (heroOrb2) heroOrb2.style.transform = `translate(${x * -12}px, ${y * -8}px)`;
  });
}

/* ===== CONTACT FORM → WHATSAPP ===== */
function submitContactForm(event) {
  event.preventDefault();
  const name    = (document.getElementById('contactName')?.value || '').trim();
  const phone   = (document.getElementById('contactPhone')?.value || '').trim();
  const service = (document.getElementById('contactService')?.value || '').trim();

  if (!name || !phone || !service) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const text = 'Hello, I am interested in MedGaurdian services.\n\nName: ' + name + '\nPhone: ' + phone + '\nService: ' + service;
  window.open('https://wa.me/918885158989?text=' + encodeURIComponent(text), '_blank');
}
