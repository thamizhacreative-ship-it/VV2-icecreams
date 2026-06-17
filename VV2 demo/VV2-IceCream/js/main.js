/* ============================================
   VV2 STONE COLD ICE CREAMS - Main JavaScript
   ============================================ */

/* ── 1. NAVBAR: scroll shrink + active link ── */
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

function updateNav() {
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNav);
updateNav();

const currentPage = location.pathname.split('/').pop() || 'index.html';
const currentHash = location.hash;

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;

  const [page, hash] = href.split('#');
  const pageMatch =
    href === currentPage ||
    page === currentPage ||
    (currentPage === '' && (href === 'index.html' || page === 'index.html'));
  const hashMatch = !hash || `#${hash}` === currentHash;

  if (pageMatch && hashMatch) {
    link.classList.add('active');
  }
});

/* ── 2. MOBILE HAMBURGER ── */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

function toggleMobileNav() {
  hamburger?.classList.toggle('open');
  mobileNav?.classList.toggle('open');
}

hamburger?.addEventListener('click', toggleMobileNav);
hamburger?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMobileNav();
  }
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
  });
});

/* ── 3. SCROLL FADE-IN ANIMATIONS ── */
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

/* ── 4. PRODUCT TABS (Main categories) ── */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

function activateTab(tabId) {
  if (!tabId) return;
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  const panel = document.getElementById(tabId);
  if (!btn || !panel) return;

  tabBtns.forEach(b => b.classList.remove('active'));
  tabPanels.forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  panel.classList.add('active');
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

if (currentHash) {
  activateTab(currentHash.slice(1));
}

/* ── 5. SUB TABS (Scoops: Fruit / Signature) ── */
const subTabBtns = document.querySelectorAll('.sub-tab-btn');
const subPanels = document.querySelectorAll('.sub-panel');

subTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.subtab;
    const parentPanel = btn.closest('.tab-panel');
    parentPanel?.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
    parentPanel?.querySelectorAll('.sub-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

/* ── 6. PHOTO GALLERY CAROUSEL ── */
function initGallery() {
  const track = document.querySelector('.gallery-track');
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('.gallery-dot');
  const prevBtn = document.querySelector('.gallery-prev');
  const nextBtn = document.querySelector('.gallery-next');

  if (!track || slides.length === 0) return;

  let current = 0;
  const visibleCount = () => (window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 2 : 3);

  function goTo(idx) {
    const max = Math.max(0, slides.length - visibleCount());
    current = Math.max(0, Math.min(idx, max));
    const slideW = slides[0].getBoundingClientRect().width + 20;
    track.style.transform = `translateX(-${current * slideW}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  let autoplay = setInterval(() => goTo(current >= slides.length - visibleCount() ? 0 : current + 1), 4000);
  const galleryWrap = track.closest('.gallery-wrap');
  galleryWrap?.addEventListener('mouseenter', () => clearInterval(autoplay));
  galleryWrap?.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current >= slides.length - visibleCount() ? 0 : current + 1), 4000);
  });

  window.addEventListener('resize', () => goTo(current));
}

initGallery();

/* ── 7. CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.querySelector('.form-success');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    formSuccess?.classList.add('show');
    contactForm.reset();
    btn.textContent = 'Send Enquiry';
    btn.disabled = false;
    setTimeout(() => formSuccess?.classList.remove('show'), 6000);
  }, 1500);
});

/* ── 8. HERO VIDEO ── */
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.playbackRate = 0.55;
  heroVideo.addEventListener('canplay', () => {
    heroVideo.play().catch(() => {});
  });
}

/* ── 9. SMOOTH ANCHOR NAVIGATION ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 10. WHATSAPP BUTTON ── */
const waBtn = document.querySelector('.whatsapp-btn');
const PHONE = '919884964132';

waBtn?.addEventListener('click', () => {
  const msg = encodeURIComponent('Hi VV2 Stone Cold! I would like to place an order / enquire about your services.');
  window.open(`https://wa.me/${PHONE}?text=${msg}`, '_blank');
});

/* ── 11. ORDER BUTTON: opens WhatsApp with product name ── */
document.querySelectorAll('.product-order-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const productName = btn.closest('.product-card')?.querySelector('.product-name')?.textContent;
    const msg = encodeURIComponent(`Hi VV2 Stone Cold! I'm interested in ordering: ${productName}`);
    window.open(`https://wa.me/${PHONE}?text=${msg}`, '_blank');
  });
});

/* ── 12. COUNTER ANIMATION (About page stats) ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ── 13. REVIEW PAGE FILTER ── */
const reviewFilterBtns = document.querySelectorAll('.filter-btn');
const reviewCards = document.querySelectorAll('.review-card');

reviewFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    reviewFilterBtns.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');

    reviewCards.forEach(card => {
      const category = card.dataset.category;
      card.style.display = filter === 'all' || category === filter ? '' : 'none';
    });
  });
});
