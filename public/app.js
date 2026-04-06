// ── FAQ accordion ───────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Hamburger menu ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── Active nav link on scroll ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const links    = navLinks.querySelectorAll('a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      const active = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── Contact form ─────────────────────────────────────────
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.textContent = 'Sent! ✓';
  btn.style.background = '#22C55E';
  btn.style.borderColor = '#22C55E';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    btn.style.borderColor = '';
    form.reset();
  }, 3000);
});

// ── Animate stat bar on scroll ───────────────────────────
const fill = document.querySelector('.ac-fill');
if (fill) {
  const target = fill.style.width;
  fill.style.width = '0%';
  const barObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      fill.style.width = target;
      barObserver.disconnect();
    }
  }, { threshold: 0.5 });
  barObserver.observe(fill);
}

// ── Scroll-reveal cards ──────────────────────────────────
const revealEls = document.querySelectorAll('.step, .feature-card, .price-card, .stat');

const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity .5s ease, transform .5s ease; }
  .reveal.visible { opacity: 1; transform: none; }
`;
document.head.appendChild(revealStyle);

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));
