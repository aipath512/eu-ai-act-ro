// EU AI ACT READY™ — eu-ai-act.ro
// Flat static site JS: nav, FAQ, ask-box UI
//
// NOTE: the real submit logic for #loginForm, #askForm, #leadForm and
// #contactForm now lives in assets/js/auth.js and
// assets/js/ask-demo-lead.js — this file no longer attaches its own
// placeholder submit handlers to those forms, to avoid both firing on
// the same click and fighting over the same status text.

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

  // Login panel open/close toggle (the panel itself — actual submit
  // logic for #loginForm is wired in auth.js).
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

  // ASK box — example questions fill the input (the actual submit /
  // API call is wired in ask-demo-lead.js).
  const askInput = document.getElementById('askInput');
  document.querySelectorAll('.ask-examples button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (askInput) askInput.value = btn.textContent.trim();
      askInput && askInput.focus();
    });
  });

});
