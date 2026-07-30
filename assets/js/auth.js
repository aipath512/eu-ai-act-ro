/* auth.js — eu-ai-act.ro
   Passwordless login (magic-link via email). Gates the "Firma Ta"
   free-pack form: Demo and ASK stay fully open, no account needed. */

(function () {
  "use strict";

  // TODO: after you deploy magic-link-worker (see magic-link-worker/README.md),
  // replace this with your real workers.dev URL (or custom route).
  var AUTH_API = "https://magic-link-worker.aipath512.workers.dev";

  var SESSION_KEY = "euaiact_session";
  var EMAIL_KEY = "euaiact_email";

  function getSession() {
    return localStorage.getItem(SESSION_KEY);
  }
  function getEmail() {
    return localStorage.getItem(EMAIL_KEY);
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }

  function requestLink(email) {
    return fetch(AUTH_API + "/request-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email })
    }).then(function (res) {
      return res.json();
    });
  }

  function checkSession() {
    var token = getSession();
    if (!token) return Promise.resolve(false);
    return fetch(AUTH_API + "/session?token=" + encodeURIComponent(token))
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        if (data.ok) {
          localStorage.setItem(EMAIL_KEY, data.email);
          return true;
        }
        clearSession();
        return false;
      })
      .catch(function () {
        return false;
      });
  }

  function logout() {
    var token = getSession();
    clearSession();
    if (token) {
      fetch(AUTH_API + "/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionToken: token })
      }).catch(function () {});
    }
    updateUI(false);
  }

  /* ---- UI wiring: top "Login" button + panel ---- */

  function initLoginPanel() {
    var toggle = document.getElementById("loginToggle");
    var panel = document.getElementById("loginPanel");
    var form = document.getElementById("loginForm");
    if (!toggle || !panel || !form) return;

    toggle.addEventListener(
      "click",
      function (e) {
        if (toggle.dataset.loggedIn === "1") {
          e.preventDefault();
          e.stopImmediatePropagation();
          logout();
        }
        // When logged out, do nothing extra here — the site's existing
        // script.js already handles opening/closing #loginPanel on click.
      },
      true
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = form.querySelector('input[type="email"]');
      var status = form.querySelector(".login-status") || createLoginStatus(form);
      var email = emailInput ? emailInput.value.trim() : "";

      if (!email) {
        status.textContent = "Scrie un email valid.";
        status.className = "form-status error login-status";
        return;
      }

      status.textContent = "Se trimite linkul...";
      status.className = "form-status pending login-status";

      requestLink(email)
        .then(function (data) {
          if (data.ok) {
            status.textContent =
              "Verifică-ți emailul (" + email + ") — ți-am trimis un link de acces.";
            status.className = "form-status success login-status";
            form.reset();
          } else {
            status.textContent = data.error || "Nu am putut trimite linkul.";
            status.className = "form-status error login-status";
          }
        })
        .catch(function () {
          status.textContent =
            "Sistemul de login nu e încă activ (worker-ul nu e instalat). Scrie-ne pe WhatsApp.";
          status.className = "form-status error login-status";
        });
    });
  }

  function createLoginStatus(form) {
    var status = document.createElement("div");
    status.className = "form-status login-status";
    form.appendChild(status);
    return status;
  }

  /* ---- UI wiring: "Firma Ta" gate ---- */

  function initFreePackGate() {
    var gate = document.getElementById("freePackGate");
    var loggedInBlock = document.getElementById("freePackLoggedIn");
    var gateForm = document.getElementById("gateForm");
    var gateStatus = document.getElementById("gateStatus");
    if (!gate || !loggedInBlock) return;

    if (gateForm) {
      gateForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var emailInput = document.getElementById("gateEmail");
        var email = emailInput ? emailInput.value.trim() : "";
        if (!email) {
          gateStatus.textContent = "Scrie un email valid.";
          gateStatus.className = "form-status error";
          return;
        }
        gateStatus.textContent = "Se trimite linkul...";
        gateStatus.className = "form-status pending";

        requestLink(email)
          .then(function (data) {
            if (data.ok) {
              gateStatus.textContent =
                "Verifică-ți emailul (" + email + ") și dă click pe linkul primit — te aduce direct înapoi aici, logat.";
              gateStatus.className = "form-status success";
              gateForm.reset();
            } else {
              gateStatus.textContent = data.error || "Nu am putut trimite linkul.";
              gateStatus.className = "form-status error";
            }
          })
          .catch(function () {
            gateStatus.textContent =
              "Sistemul de login nu e încă activ (worker-ul nu e instalat).";
            gateStatus.className = "form-status error";
          });
      });
    }
  }

  /* ---- reflect logged-in / logged-out state across the page ---- */

  function updateUI(loggedIn) {
    var toggle = document.getElementById("loginToggle");
    var gate = document.getElementById("freePackGate");
    var loggedInBlock = document.getElementById("freePackLoggedIn");
    var email = getEmail();

    if (toggle) {
      if (loggedIn && email) {
        toggle.textContent = email + " · Deconectare";
        toggle.dataset.loggedIn = "1";
      } else {
        toggle.textContent = "Acces cu email";
        toggle.dataset.loggedIn = "0";
      }
    }

    if (gate && loggedInBlock) {
      gate.style.display = loggedIn ? "none" : "block";
      loggedInBlock.style.display = loggedIn ? "block" : "none";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  function boot() {
    initLoginPanel();
    initFreePackGate();
    checkSession().then(updateUI);
  }
})();
