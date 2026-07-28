// EU AI ACT READY™ — eu-ai-act.ro
// Flat static site JS: nav, FAQ, ask-box UI

document.addEventListener('DOMContentLoaded', () => {

  // Relocate the edge-injected "AI-FIRST PROTOCOL" signature banner
  // (added by Cloudflare-level infrastructure, not present in this file)
  // out of the hero and down into the footer, where it belongs as a
  // trust/verification badge rather than a hero-blocking element.
  const slot = document.getElementById('trust-badge-slot');
  if (slot) {
    const candidates = document.querySelectorAll('div');
    for (const el of candidates) {
      if (el.id === 'trust-badge-slot') continue;
      if (slot.contains(el)) continue;
      const text = el.textContent || '';
      // Only match the actual small banner element, not any large ancestor
      // container whose aggregated textContent happens to include this
      // string because the banner sits somewhere inside it.
      if (text.includes('AI-FIRST PROTOCOL') && text.trim().length < 200) {
        el.removeAttribute('style');
        el.classList.add('trust-badge');
        slot.appendChild(el);
        break;
      }
    }
  }

  // Login panel toggle
  const loginToggle = document.getElementById('loginToggle');
  const loginPanel = document.getElementById('loginPanel');
  if (loginToggle && loginPanel) {
    loginToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      loginPanel.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!loginPanel.contains(e.target) && e.target !== loginToggle) {
        loginPanel.classList.remove('open');
      }
    });
  }
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = loginForm.querySelector('button[type="submit"]');
      btn.textContent = 'Autentificare — conectăm contul…';
    });
  }

  // Language selector — RO is the only complete language right now;
  // EN shows an honest "in progress" notice instead of a fake translation.
  const langBtns = document.querySelectorAll('.lang-btn');
  const langNotice = document.getElementById('langNotice');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      if (btn.dataset.lang === 'ro') {
        btn.classList.add('active');
        langNotice && langNotice.classList.remove('open');
      } else {
        langNotice && langNotice.classList.add('open');
        setTimeout(() => langNotice && langNotice.classList.remove('open'), 4000);
        document.querySelectorAll('.lang-btn[data-lang="ro"]').forEach(b => b.classList.add('active'));
      }
    });
  });

  // Mobile nav toggle
  const burger = document.querySelector('.burger');
  const mainLinks = document.querySelector('.main-links');
  if (burger && mainLinks) {
    burger.addEventListener('click', () => {
      mainLinks.classList.toggle('open-mobile');
      mainLinks.style.display = mainLinks.classList.contains('open-mobile') ? 'flex' : '';
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ASK box — example questions fill the input
  const askInput = document.getElementById('askInput');
  const askAnswer = document.getElementById('askAnswer');
  document.querySelectorAll('.ask-examples button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (askInput) askInput.value = btn.textContent.trim();
      askInput && askInput.focus();
    });
  });

  const askForm = document.getElementById('askForm');
  if (askForm) {
    askForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = askInput.value.trim();
      if (!q) return;
      askAnswer.style.display = 'block';
      askAnswer.textContent = 'Se caută răspunsul în cele 113 articole indexate…';

      // NOTE: wire this fetch() call to the live conversation Worker endpoint
      // (same Vectorize/D1 backend used on eu-ai-act-ready.eu) once confirmed live for this domain.
      // Example:
      // fetch(`https://eu-ai-act-conversation-worker-test.<account>.workers.dev/search?q=${encodeURIComponent(q)}&lang=ro`)
      //   .then(r => r.json())
      //   .then(data => { askAnswer.textContent = data.generated_answer; });

      setTimeout(() => {
        askAnswer.textContent = 'Asistentul conversațional nu este încă conectat pe această pagină. Contactați-ne direct sau reveniți în curând.';
      }, 900);
    });
  }

  // Lead form (FREE Readiness Pack) — placeholder submit
  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = leadForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Se trimite…';
      setTimeout(() => {
        btn.textContent = 'Primit — verificați emailul';
      }, 700);
    });
  }

  // Contact form — placeholder submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Trimis — răspundem în < 4h';
    });
  }

});
