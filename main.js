// ── CURSOR ──
const cross = document.getElementById('cursorCross');

if (cross) {
  document.addEventListener('mousemove', e => {
    cross.style.left = e.clientX + 'px';
    cross.style.top = e.clientY + 'px';
  });

  // Cursor colour — light on dark sections
  function updateCursorColour() {
    const darkEls = document.querySelectorAll('#hero, #video-section, #work-cta, #about-cta, #facts');
    let onDark = false;
    darkEls.forEach(el => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2) onDark = true;
    });
    // Hero is fixed
    const heroEl = document.getElementById('hero');
    if (heroEl && window.scrollY < window.innerHeight * 0.9) onDark = true;
    cross.classList.toggle('on-light', onDark);
  }

  window.addEventListener('scroll', updateCursorColour);
  document.addEventListener('mousemove', updateCursorColour);
  updateCursorColour();

  // Magnetic effect — exclude submit buttons to prevent jerk
  document.querySelectorAll('a, button:not(.btn-submit)').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cross.classList.add('magnetic');
      cross.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      cross.classList.remove('magnetic');
      cross.classList.remove('is-hovering');
    });

  });
}

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('mobileOverlay');

if (hamburger && overlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── PAGE TRANSITIONS ──
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('mailto') && !href.startsWith('tel') && !link.hasAttribute('target')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  }
});

// ── NAV SCROLL ──
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > window.innerHeight * 0.8);
  });
}

// ── HERO PARALLAX — desktop only ──
const heroImg = document.getElementById('heroImg');
if (heroImg && window.innerWidth > 900) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  });
}

// ── WORK PAGE FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-item').forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
      });
    });
  });
}

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      success.classList.add('visible');
      contactForm.querySelectorAll('input, textarea, select').forEach(el => el.disabled = true);
      btn.style.display = 'none';
    }, 1200);
  });
}

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-up, .fade-in, .stagger').forEach(el => revealObserver.observe(el));
