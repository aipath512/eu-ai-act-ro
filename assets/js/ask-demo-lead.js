/* ask-demo-lead.js
   EU AI Act Ready — eu-ai-act.ro
   Wires: (1) ASK box to the live conversation worker (same one used on
   eu-ai-act-ready.eu), (2) the Demo modal, (3) lead / contact form UX.
   No page reload; progressive — anchors still work if JS fails to load. */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* 1. ASK — same worker endpoint as eu-ai-act-ready.eu                */
  /* ---------------------------------------------------------------- */

  var ASK_API =
    "https://eu-ai-act-conversation-worker-test.aipath512.workers.dev/search?q=";

  var OFFICIAL_EU_AI_ACT_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

  var WAITING_MESSAGES = [
    "Citesc EU AI Act...",
    "Verific textul oficial al regulamentului...",
    "Caut articolele relevante...",
    "Pregătesc un răspuns fundamentat...",
    "Aproape gata — poate dura până la un minut..."
  ];

  var waitingInterval = null;
  var waitingStart = null;

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function startWaiting(answerEl) {
    waitingStart = Date.now();
    var i = 0;
    function render() {
      var elapsed = Math.floor((Date.now() - waitingStart) / 1000);
      answerEl.innerHTML =
        '<div class="no-result waiting"><span class="spinner" aria-hidden="true"></span> ' +
        escapeHtml(WAITING_MESSAGES[i % WAITING_MESSAGES.length]) +
        " (" + elapsed + "s)</div>";
    }
    render();
    waitingInterval = setInterval(function () {
      i++;
      render();
    }, 4000);
  }

  function stopWaiting() {
    if (waitingInterval) {
      clearInterval(waitingInterval);
      waitingInterval = null;
    }
  }

  function renderAnswer(answerEl, data) {
    if (data && data.generated_answer) {
      var sourcesHtml = (data.sources || [])
        .map(function (s) {
          return (
            '<a href="' +
            escapeHtml(s.url || s.source_url || OFFICIAL_EU_AI_ACT_URL) +
            '" target="_blank" rel="noopener">' +
            escapeHtml(s.label || s.article || s.title || "EU AI Act — text oficial") +
            "</a>"
          );
        })
        .join("");

      var rrviHtml = (data.rrvi_results || [])
        .map(function (r) {
          return (
            '<div class="rrvi-card"><span class="rrvi-label">RRVI</span>' +
            escapeHtml(r.source || "") +
            "</div>"
          );
        })
        .join("");

      answerEl.innerHTML =
        '<article class="result-card"><p class="result-text">' +
        escapeHtml(data.generated_answer) +
        "</p>" +
        (sourcesHtml
          ? '<div class="sources"><span>Surse</span>' + sourcesHtml + "</div>"
          : "") +
        rrviHtml +
        "</article>";

      if (data.generation_error) {
        answerEl.innerHTML +=
          "<div class='no-result'>Notă: " +
          escapeHtml(data.generation_error) +
          "</div>";
      }
      return;
    }

    var results = (data && data.results) || [];
    if (!results.length) {
      answerEl.innerHTML =
        "<div class='no-result'>Niciun răspuns găsit. Încearcă să reformulezi întrebarea.</div>";
      return;
    }

    answerEl.innerHTML = results
      .map(function (x, i) {
        return (
          '<article class="result-card"><div class="result-label">Articol ' +
          (i + 1) +
          '</div><p class="result-text">' +
          escapeHtml(x.snippet || "") +
          '</p><div class="sources"><span>Surse</span><a href="' +
          escapeHtml(x.source_url || OFFICIAL_EU_AI_ACT_URL) +
          '" target="_blank" rel="noopener">EU AI Act — text oficial</a>' +
          (x.article ? "<span>" + escapeHtml(x.article) + "</span>" : "") +
          (x.title ? "<span>" + escapeHtml(x.title) + "</span>" : "") +
          "</div></article>"
        );
      })
      .join("");
  }

  function ask(question) {
    var answerEl = document.getElementById("askAnswer");
    var submitBtn = document.getElementById("askSubmit");
    if (!answerEl) {
      // eslint-disable-next-line no-alert
      alert("Eroare tehnică: zona de răspuns (#askAnswer) nu a fost găsită pe pagină. Anunță dezvoltatorul.");
      return;
    }

    question = (question || "").trim();
    if (!question) {
      answerEl.innerHTML =
        "<div class='no-result'>Scrie mai întâi o întrebare.</div>";
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    startWaiting(answerEl);

    fetch(ASK_API + encodeURIComponent(question))
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        stopWaiting();
        renderAnswer(answerEl, data);
      })
      .catch(function (err) {
        stopWaiting();
        answerEl.innerHTML =
          "<div class='no-result'>Momentan asistentul nu răspunde (" +
          escapeHtml(err.message) +
          "). Încearcă din nou sau scrie-ne pe WhatsApp.</div>";
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  }

  function initAsk() {
    var form = document.getElementById("askForm");
    var input = document.getElementById("askInput");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        ask(input ? input.value : "");
      });
    }
    var examples = document.querySelectorAll(".ask-example");
    examples.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var q = btn.textContent.trim();
        if (input) input.value = q;
        ask(q);
        var askSection = document.getElementById("ask");
        if (askSection) askSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* 2. DEMO modal                                                     */
  /* ---------------------------------------------------------------- */

  function initDemo() {
    var modal = document.getElementById("demoModal");
    if (!modal) return;
    var triggers = document.querySelectorAll(".demo-trigger");
    var closers = modal.querySelectorAll("[data-demo-close]");
    var tabs = modal.querySelectorAll(".demo-tab");
    var panels = modal.querySelectorAll(".demo-panel");
    var lastFocused = null;

    function open(e) {
      if (e) e.preventDefault();
      lastFocused = document.activeElement;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var closeBtn = modal.querySelector(".demo-modal-close");
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(function (t) {
      t.addEventListener("click", open);
    });
    closers.forEach(function (c) {
      c.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) close();
    });

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        panels.forEach(function (p) {
          p.classList.remove("active");
        });
        tab.classList.add("active");
        var name = tab.getAttribute("data-demo-tab");
        var panel = modal.querySelector('[data-demo-panel="' + name + '"]');
        if (panel) panel.classList.add("active");
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* 3. Lead form (Free Readiness Pack) — real capture                 */
  /*    Same worker already used across eu-ai-act-ready.eu             */
  /*    (generator.html / partnership-distribution.html):              */
  /*    https://leads-capture-worker.aipath512.workers.dev/capture     */
  /* ---------------------------------------------------------------- */

  var LEAD_API = "https://leads-capture-worker.aipath512.workers.dev/capture";

  function initLeadForm() {
    var form = document.getElementById("leadForm");
    if (!form) return;
    var status = document.getElementById("leadStatus");
    var submitBtn = document.getElementById("leadSubmit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("leadEmail");
      var company = document.getElementById("leadCompany");
      var role = document.getElementById("leadRole");

      if (!email.value || !company.value || !role.value) {
        status.textContent = "Completează toate câmpurile, te rog.";
        status.className = "form-status error";
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      status.textContent = "Se trimite...";
      status.className = "form-status pending";

      fetch(LEAD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          firmName: company.value,
          responsiblePerson: role.value,
          source: "eu-ai-act.ro/free-pack"
        })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Server a răspuns cu " + res.status);
          return res.json().catch(function () {
            return {};
          });
        })
        .then(function () {
          status.innerHTML =
            "Înregistrat. Îți răspundem în &lt; 4h în ziua lucrătoare.";
          status.className = "form-status success";
          form.reset();
        })
        .catch(function (err) {
          status.innerHTML =
            "Nu am putut trimite automat (" +
            escapeHtml(err.message) +
            '). Scrie-ne direct: <a href="mailto:contact@aiventure.ro">contact@aiventure.ro</a> sau ' +
            '<a href="https://api.whatsapp.com/send/?phone=40737123540" target="_blank" rel="noopener">WhatsApp</a>.';
          status.className = "form-status error";
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var status = document.getElementById("contactStatus");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent =
        "Mulțumim! Formularul nu e încă legat de un sistem automat — scrie-ne direct pe WhatsApp pentru răspuns rapid.";
      status.className = "form-status success";
    });
  }

  /* ---------------------------------------------------------------- */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  function boot() {
    initAsk();
    initDemo();
    initLeadForm();
    initContactForm();
  }
})();
