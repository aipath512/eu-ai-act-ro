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
  // Bannerul de protocol e injectat direct în #trust-badge-slot de worker-ul
  // os-orchestrator-5th-element — nu mai e nevoie să fie mutat din DOM.


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
    const setNav = (open) => {
      mainLinks.classList.toggle('open-mobile', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? '\u2715' : '\u2630';
    };
    setNav(false);
    burger.setAttribute('aria-controls', 'mainNav');
    mainLinks.id = mainLinks.id || 'mainNav';

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      setNav(!mainLinks.classList.contains('open-mobile'));
    });
    // click pe un link din meniu -> inchide
    mainLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') setNav(false);
    });
    // click in afara meniului -> inchide
    document.addEventListener('click', (e) => {
      if (!mainLinks.classList.contains('open-mobile')) return;
      if (!mainLinks.contains(e.target) && e.target !== burger) setNav(false);
    });
    // Escape -> inchide
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setNav(false);
    });
  }


  /* ---------------------------------------------------------------- *
   * BANDA DE STARE — data ultimei actualizari (deploy) + ceas live.
   * Se insereaza automat sub <header class="site-header">, deci nu
   * trebuie editat fiecare fisier HTML.
   * Data de deploy vine din document.lastModified (antetul Last-Modified
   * trimis de Cloudflare Pages pentru fisierul HTML). Daca serverul nu
   * il trimite, browserul returneaza momentul incarcarii — in cazul
   * asta afisam doar ceasul, nu o data gresita.
   * ---------------------------------------------------------------- */
  (function initDeployStrip() {
    var header = document.querySelector('header.site-header');
    if (!header || document.querySelector('.deploy-strip')) return;

    var TZ = 'Europe/Bucharest';
    var fmtDeploy = new Intl.DateTimeFormat('ro-RO', {
      timeZone: TZ, day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    var fmtDay = new Intl.DateTimeFormat('ro-RO', {
      timeZone: TZ, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    var fmtClock = new Intl.DateTimeFormat('ro-RO', {
      timeZone: TZ, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });

    var strip = document.createElement('div');
    strip.className = 'deploy-strip';
    var wrap = document.createElement('div');
    wrap.className = 'wrap';
    strip.appendChild(wrap);

    // ultima actualizare a paginii (deploy)
    var lm = new Date(document.lastModified);
    var fresh = (Date.now() - lm.getTime()) < 60000; // sub 1 min => probabil fara Last-Modified
    if (!isNaN(lm.getTime()) && !fresh) {
      var d = document.createElement('span');
      d.className = 'ds-item ds-deploy';
      d.innerHTML = '<span class="ds-lbl">ultima actualizare</span>' +
                    '<span class="ds-val">' + fmtDeploy.format(lm) + '</span>';
      wrap.appendChild(d);
    }

    // data si ora curenta (ceas live)
    var n = document.createElement('span');
    n.className = 'ds-item ds-now';
    n.innerHTML = '<span class="ds-dot" aria-hidden="true"></span>' +
                  '<span class="ds-lbl">acum</span>' +
                  '<span class="ds-val"><time id="dsClock"></time></span>';
    wrap.appendChild(n);

    header.insertAdjacentElement('afterend', strip);

    var clock = document.getElementById('dsClock');
    function tick() {
      var now = new Date();
      clock.setAttribute('datetime', now.toISOString());
      clock.textContent = fmtDay.format(now) + ' · ' + fmtClock.format(now) + ' (București)';
    }
    tick();
    setInterval(tick, 1000);
  })();

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
