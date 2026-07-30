/* generator.js — eu-ai-act.ro
   Real document generation, using the SAME live backend already proven
   working on eu-ai-act-ready.eu (rrvi-generator-worker-test). Shares the
   leads-capture-worker already used elsewhere on this site. */

(function () {
  "use strict";

  var RRVI_BASE = "https://rrvi-generator-worker-test.aipath512.workers.dev";
  var RRVI_API = RRVI_BASE + "/generate";
  var RRVI_SINGLE_API = RRVI_BASE + "/generate-one";
  var LEAD_API = "https://leads-capture-worker.aipath512.workers.dev/capture";
  var PARTNERSHIP_FALLBACK = "https://eu-ai-act-ready.eu/partnership-distribution.html";

  // Same 70-document list as eu-ai-act-ready.eu/generator (10 modules x 7 types).
  var DOCS = [
    {"m":"Inventarul Sistemelor AI","c":"CHK-001","t":"Checklist","p":"01-ai-system-inventory/CHK-001_AI_System_Inventory_Checklist.md"},
    {"m":"Inventarul Sistemelor AI","c":"DEC-001","t":"Declarație","p":"01-ai-system-inventory/DEC-001_AI_System_Inventory_Declaration.md"},
    {"m":"Inventarul Sistemelor AI","c":"DOD-001","t":"Politică","p":"01-ai-system-inventory/DOD-001_AI_System_Inventory_Policy.md"},
    {"m":"Inventarul Sistemelor AI","c":"EVID-001","t":"Dovadă","p":"01-ai-system-inventory/EVID-001_AI_System_Inventory_Evidence.md"},
    {"m":"Inventarul Sistemelor AI","c":"PROC-001","t":"Procedură","p":"01-ai-system-inventory/PROC-001_AI_System_Inventory_Procedure.md"},
    {"m":"Inventarul Sistemelor AI","c":"REG-001","t":"Registru","p":"01-ai-system-inventory/REG-001_AI_System_Inventory_Register.md"},
    {"m":"Inventarul Sistemelor AI","c":"WI-001","t":"Instrucțiune de lucru","p":"01-ai-system-inventory/WI-001_AI_System_Inventory_Work_Instruction.md"},
    {"m":"Clasificarea Riscului","c":"CHK-002","t":"Checklist","p":"02-risk-classification/CHK-002_Risk_Classification_Checklist.md"},
    {"m":"Clasificarea Riscului","c":"DEC-002","t":"Declarație","p":"02-risk-classification/DEC-002_Risk_Classification_Declaration.md"},
    {"m":"Clasificarea Riscului","c":"DOD-002","t":"Politică","p":"02-risk-classification/DOD-002_Risk_Classification_Policy.md"},
    {"m":"Clasificarea Riscului","c":"EVID-002","t":"Dovadă","p":"02-risk-classification/EVID-002_Risk_Classification_Evidence.md"},
    {"m":"Clasificarea Riscului","c":"PROC-002","t":"Procedură","p":"02-risk-classification/PROC-002_Risk_Classification_Procedure.md"},
    {"m":"Clasificarea Riscului","c":"REG-002","t":"Registru","p":"02-risk-classification/REG-002_Risk_Classification_Register.md"},
    {"m":"Clasificarea Riscului","c":"WI-002","t":"Instrucțiune de lucru","p":"02-risk-classification/WI-002_Risk_Classification_Work_Instruction.md"},
    {"m":"Competențe AI","c":"CHK-003","t":"Checklist","p":"03-ai-literacy/CHK-003_AI_Literacy_Checklist.md"},
    {"m":"Competențe AI","c":"DEC-003","t":"Declarație","p":"03-ai-literacy/DEC-003_AI_Literacy_Declaration.md"},
    {"m":"Competențe AI","c":"DOD-003","t":"Politică","p":"03-ai-literacy/DOD-003_AI_Literacy_Policy.md"},
    {"m":"Competențe AI","c":"EVID-003","t":"Dovadă","p":"03-ai-literacy/EVID-003_AI_Literacy_Evidence.md"},
    {"m":"Competențe AI","c":"PROC-003","t":"Procedură","p":"03-ai-literacy/PROC-003_AI_Literacy_Procedure.md"},
    {"m":"Competențe AI","c":"REG-003","t":"Registru","p":"03-ai-literacy/REG-003_AI_Literacy_Register.md"},
    {"m":"Competențe AI","c":"WI-003","t":"Instrucțiune de lucru","p":"03-ai-literacy/WI-003_AI_Literacy_Work_Instruction.md"},
    {"m":"Practici Interzise","c":"CHK-004","t":"Checklist","p":"04-prohibited-practices/CHK-004_Prohibited_Practices_Checklist.md"},
    {"m":"Practici Interzise","c":"DEC-004","t":"Declarație","p":"04-prohibited-practices/DEC-004_Prohibited_Practices_Declaration.md"},
    {"m":"Practici Interzise","c":"DOD-004","t":"Politică","p":"04-prohibited-practices/DOD-004_Prohibited_Practices_Policy.md"},
    {"m":"Practici Interzise","c":"EVID-004","t":"Dovadă","p":"04-prohibited-practices/EVID-004_Prohibited_Practices_Evidence.md"},
    {"m":"Practici Interzise","c":"PROC-004","t":"Procedură","p":"04-prohibited-practices/PROC-004_Prohibited_Practices_Procedure.md"},
    {"m":"Practici Interzise","c":"REG-004","t":"Registru","p":"04-prohibited-practices/REG-004_Prohibited_Practices_Register.md"},
    {"m":"Practici Interzise","c":"WI-004","t":"Instrucțiune de lucru","p":"04-prohibited-practices/WI-004_Prohibited_Practices_Work_Instruction.md"},
    {"m":"Evaluarea Riscului Înalt","c":"CHK-005","t":"Checklist","p":"05-high-risk-assessment/CHK-005_High_Risk_Assessment_Checklist.md"},
    {"m":"Evaluarea Riscului Înalt","c":"DEC-005","t":"Declarație","p":"05-high-risk-assessment/DEC-005_High_Risk_Assessment_Declaration.md"},
    {"m":"Evaluarea Riscului Înalt","c":"DOD-005","t":"Politică","p":"05-high-risk-assessment/DOD-005_High_Risk_Assessment_Policy.md"},
    {"m":"Evaluarea Riscului Înalt","c":"EVID-005","t":"Dovadă","p":"05-high-risk-assessment/EVID-005_High_Risk_Assessment_Evidence.md"},
    {"m":"Evaluarea Riscului Înalt","c":"PROC-005","t":"Procedură","p":"05-high-risk-assessment/PROC-005_High_Risk_Assessment_Procedure.md"},
    {"m":"Evaluarea Riscului Înalt","c":"REG-005","t":"Registru","p":"05-high-risk-assessment/REG-005_High_Risk_Assessment_Register.md"},
    {"m":"Evaluarea Riscului Înalt","c":"WI-005","t":"Instrucțiune de lucru","p":"05-high-risk-assessment/WI-005_High_Risk_Assessment_Work_Instruction.md"},
    {"m":"Documentație Tehnică","c":"CHK-006","t":"Checklist","p":"06-technical-documentation/CHK-006_Technical_Documentation_Checklist.md"},
    {"m":"Documentație Tehnică","c":"DEC-006","t":"Declarație","p":"06-technical-documentation/DEC-006_Technical_Documentation_Declaration.md"},
    {"m":"Documentație Tehnică","c":"DOD-006","t":"Politică","p":"06-technical-documentation/DOD-006_Technical_Documentation_Policy.md"},
    {"m":"Documentație Tehnică","c":"EVID-006","t":"Dovadă","p":"06-technical-documentation/EVID-006_Technical_Documentation_Evidence.md"},
    {"m":"Documentație Tehnică","c":"PROC-006","t":"Procedură","p":"06-technical-documentation/PROC-006_Technical_Documentation_Procedure.md"},
    {"m":"Documentație Tehnică","c":"REG-006","t":"Registru","p":"06-technical-documentation/REG-006_Technical_Documentation_Register.md"},
    {"m":"Documentație Tehnică","c":"WI-006","t":"Instrucțiune de lucru","p":"06-technical-documentation/WI-006_Technical_Documentation_Work_Instruction.md"},
    {"m":"Supraveghere Umană","c":"CHK-007","t":"Checklist","p":"07-human-oversight/CHK-007_Human_Oversight_Checklist.md"},
    {"m":"Supraveghere Umană","c":"DEC-007","t":"Declarație","p":"07-human-oversight/DEC-007_Human_Oversight_Declaration.md"},
    {"m":"Supraveghere Umană","c":"DOD-007","t":"Politică","p":"07-human-oversight/DOD-007_Human_Oversight_Policy.md"},
    {"m":"Supraveghere Umană","c":"EVID-007","t":"Dovadă","p":"07-human-oversight/EVID-007_Human_Oversight_Evidence.md"},
    {"m":"Supraveghere Umană","c":"PROC-007","t":"Procedură","p":"07-human-oversight/PROC-007_Human_Oversight_Procedure.md"},
    {"m":"Supraveghere Umană","c":"REG-007","t":"Registru","p":"07-human-oversight/REG-007_Human_Oversight_Register.md"},
    {"m":"Supraveghere Umană","c":"WI-007","t":"Instrucțiune de lucru","p":"07-human-oversight/WI-007_Human_Oversight_Work_Instruction.md"},
    {"m":"Guvernanța Datelor","c":"CHK-008","t":"Checklist","p":"08-data-governance/CHK-008_Data_Governance_Checklist.md"},
    {"m":"Guvernanța Datelor","c":"DEC-008","t":"Declarație","p":"08-data-governance/DEC-008_Data_Governance_Declaration.md"},
    {"m":"Guvernanța Datelor","c":"DOD-008","t":"Politică","p":"08-data-governance/DOD-008_Data_Governance_Policy.md"},
    {"m":"Guvernanța Datelor","c":"EVID-008","t":"Dovadă","p":"08-data-governance/EVID-008_Data_Governance_Evidence.md"},
    {"m":"Guvernanța Datelor","c":"PROC-008","t":"Procedură","p":"08-data-governance/PROC-008_Data_Governance_Procedure.md"},
    {"m":"Guvernanța Datelor","c":"REG-008","t":"Registru","p":"08-data-governance/REG-008_Data_Governance_Register.md"},
    {"m":"Guvernanța Datelor","c":"WI-008","t":"Instrucțiune de lucru","p":"08-data-governance/WI-008_Data_Governance_Work_Instruction.md"},
    {"m":"Înregistrare și Monitorizare","c":"CHK-009","t":"Checklist","p":"09-logging-monitoring/CHK-009_Logging_Monitoring_Checklist.md"},
    {"m":"Înregistrare și Monitorizare","c":"DEC-009","t":"Declarație","p":"09-logging-monitoring/DEC-009_Logging_Monitoring_Declaration.md"},
    {"m":"Înregistrare și Monitorizare","c":"DOD-009","t":"Politică","p":"09-logging-monitoring/DOD-009_Logging_Monitoring_Policy.md"},
    {"m":"Înregistrare și Monitorizare","c":"EVID-009","t":"Dovadă","p":"09-logging-monitoring/EVID-009_Logging_Monitoring_Evidence.md"},
    {"m":"Înregistrare și Monitorizare","c":"PROC-009","t":"Procedură","p":"09-logging-monitoring/PROC-009_Logging_Monitoring_Procedure.md"},
    {"m":"Înregistrare și Monitorizare","c":"REG-009","t":"Registru","p":"09-logging-monitoring/REG-009_Logging_Monitoring_Register.md"},
    {"m":"Înregistrare și Monitorizare","c":"WI-009","t":"Instrucțiune de lucru","p":"09-logging-monitoring/WI-009_Logging_Monitoring_Work_Instruction.md"},
    {"m":"Raportarea Incidentelor","c":"CHK-010","t":"Checklist","p":"10-incident-reporting/CHK-010_Incident_Reporting_Checklist.md"},
    {"m":"Raportarea Incidentelor","c":"DEC-010","t":"Declarație","p":"10-incident-reporting/DEC-010_Incident_Reporting_Declaration.md"},
    {"m":"Raportarea Incidentelor","c":"DOD-010","t":"Politică","p":"10-incident-reporting/DOD-010_Incident_Reporting_Policy.md"},
    {"m":"Raportarea Incidentelor","c":"EVID-010","t":"Dovadă","p":"10-incident-reporting/EVID-010_Incident_Reporting_Evidence.md"},
    {"m":"Raportarea Incidentelor","c":"PROC-010","t":"Procedură","p":"10-incident-reporting/PROC-010_Incident_Reporting_Procedure.md"},
    {"m":"Raportarea Incidentelor","c":"REG-010","t":"Registru","p":"10-incident-reporting/REG-010_Incident_Reporting_Register.md"},
    {"m":"Raportarea Incidentelor","c":"WI-010","t":"Instrucțiune de lucru","p":"10-incident-reporting/WI-010_Incident_Reporting_Work_Instruction.md"}
  ];

  function getEmail() {
    return localStorage.getItem("euaiact_email") || "";
  }

  var leadSent = false;
  function captureLead(email, firmName, responsiblePerson) {
    if (leadSent) return;
    leadSent = true;
    fetch(LEAD_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, firmName: firmName, responsiblePerson: responsiblePerson, source: "eu-ai-act.ro/generator" })
    }).catch(function () {});
  }

  function currentInputs() {
    var email = getEmail();
    var firmName = (document.getElementById("genFirmName") || {}).value || "";
    var firstName = (document.getElementById("genFirstName") || {}).value || "";
    var lastName = (document.getElementById("genLastName") || {}).value || "";
    var lang = (document.getElementById("genLang") || {}).value || "ro";
    var format = (document.getElementById("genFormat") || {}).value || "md";
    firmName = firmName.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    return {
      email: email,
      firmName: firmName,
      responsiblePerson: (firstName + " " + lastName).trim(),
      lang: lang,
      format: format
    };
  }

  function setStatus(kind, text) {
    var el = document.getElementById("genStatus");
    if (!el) return;
    el.className = "form-status " + kind;
    el.innerHTML = text;
  }

  function requireInputs() {
    var inputs = currentInputs();
    if (!inputs.email) {
      setStatus("error", "Trebuie să fii autentificat (vezi butonul de sus).");
      return null;
    }
    if (!inputs.firmName || !inputs.responsiblePerson.trim()) {
      setStatus("error", "Completează firma și numele complet al persoanei responsabile AI.");
      return null;
    }
    captureLead(inputs.email, inputs.firmName, inputs.responsiblePerson);
    return inputs;
  }

  function fetchSingleDoc(path, firmName, responsiblePerson, lang, format) {
    return fetch(RRVI_SINGLE_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: path, companyName: firmName, responsiblePerson: responsiblePerson, lang: lang, format: format })
    }).then(function (res) {
      if (!res.ok) throw new Error("Serverul a răspuns cu " + res.status);
      return res;
    });
  }

  function viewDoc(doc, btn) {
    var inputs = requireInputs();
    if (!inputs) return;
    var orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = "…";
    fetchSingleDoc(doc.p, inputs.firmName, inputs.responsiblePerson, inputs.lang, "md")
      .then(function (res) {
        var fellBack = res.headers.get("X-Content-Lang-Fallback") === "true";
        return res.text().then(function (text) {
          return { text: text, fellBack: fellBack };
        });
      })
      .then(function (data) {
        var overlay = document.getElementById("genViewerOverlay");
        var title = document.getElementById("genViewerTitle");
        var body = document.getElementById("genViewerBody");
        title.textContent = doc.c + " — " + doc.m + " · " + doc.t;
        body.textContent = (data.fellBack ? "[Traducerea nu e încă disponibilă — se afișează în engleză]\n\n" : "") + data.text;
        overlay.classList.add("show");
      })
      .catch(function (err) {
        setStatus("error", "Nu am putut încărca documentul (" + err.message + ").");
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = orig;
      });
  }

  function downloadDoc(doc, btn) {
    var inputs = requireInputs();
    if (!inputs) return;
    var orig = btn.textContent;
    btn.disabled = true;
    btn.textContent = "…";
    fetchSingleDoc(doc.p, inputs.firmName, inputs.responsiblePerson, inputs.lang, inputs.format)
      .then(function (res) {
        return res.blob();
      })
      .then(function (blob) {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        var ext = inputs.format === "docx" ? ".docx" : ".md";
        a.download = doc.p.split("/").pop().replace(/\.md$/, ext);
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(function (err) {
        setStatus("error", "Descărcare eșuată (" + err.message + ").");
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = orig;
      });
  }

  function renderDocGroups() {
    var container = document.getElementById("genDocGroups");
    if (!container || container.children.length) return; // render once
    var byModule = {};
    var order = [];
    DOCS.forEach(function (doc) {
      if (!byModule[doc.m]) {
        byModule[doc.m] = [];
        order.push(doc.m);
      }
      byModule[doc.m].push(doc);
    });

    order.forEach(function (moduleName) {
      var docs = byModule[moduleName];
      var details = document.createElement("details");
      details.className = "gen-modgroup";

      var summary = document.createElement("summary");
      summary.innerHTML = "<span>" + moduleName + "</span><span class='gen-cnt'>" + docs.length + " documente</span>";
      details.appendChild(summary);

      docs.forEach(function (doc) {
        var row = document.createElement("div");
        row.className = "gen-doc-row";

        var nameWrap = document.createElement("div");
        nameWrap.innerHTML = "<div class='gen-doc-name'>" + doc.c + "</div><div class='gen-doc-type'>" + doc.t + "</div>";

        var actions = document.createElement("div");
        actions.className = "gen-doc-actions";

        var viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.textContent = "Vizualizează";
        viewBtn.addEventListener("click", function () {
          viewDoc(doc, viewBtn);
        });

        var dlBtn = document.createElement("button");
        dlBtn.type = "button";
        dlBtn.textContent = "Descarcă";
        dlBtn.addEventListener("click", function () {
          downloadDoc(doc, dlBtn);
        });

        actions.appendChild(viewBtn);
        actions.appendChild(dlBtn);
        row.appendChild(nameWrap);
        row.appendChild(actions);
        details.appendChild(row);
      });

      container.appendChild(details);
    });
  }

  function initViewerClose() {
    var closeBtn = document.getElementById("genViewerClose");
    var overlay = document.getElementById("genViewerOverlay");
    if (!closeBtn || !overlay) return;
    closeBtn.addEventListener("click", function () {
      overlay.classList.remove("show");
    });
  }

  function initGenForm() {
    var form = document.getElementById("genForm");
    if (!form) return;
    var btn = document.getElementById("genSubmit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var inputs = requireInputs();
      if (!inputs) return;

      btn.disabled = true;
      btn.textContent = "⚡ Se generează…";
      setStatus("pending", "Construim cele 70 de documente — durează de obicei sub un minut.");

      fetch(RRVI_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputs.email,
          companyName: inputs.firmName,
          responsiblePerson: inputs.responsiblePerson,
          lang: inputs.lang,
          format: inputs.format
        })
      })
        .then(function (res) {
          if (res.status === 403) {
            return res.json().catch(function () { return {}; }).then(function (data) {
              if (data && data.limited) {
                setStatus("error", "Limita gratuită a fost atinsă — te redirecționăm spre pagina de parteneriat…");
                setTimeout(function () {
                  window.location.href = data.redirect || PARTNERSHIP_FALLBACK;
                }, 1500);
                throw new Error("limited");
              }
              throw new Error("403");
            });
          }
          if (!res.ok) throw new Error("Serverul a răspuns cu " + res.status);
          return res.blob();
        })
        .then(function (blob) {
          if (!blob) return;
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = inputs.firmName.replace(/[^a-z0-9]+/gi, "_") + "_EU_AI_Act_RRVI_Compliance_Pack_" + inputs.lang.toUpperCase() + "_" + inputs.format + ".zip";
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          setStatus("success", "Gata — pachetul tău cu 70 de documente s-a descărcat.");
        })
        .catch(function (err) {
          if (err.message !== "limited") {
            setStatus("error", "Generarea a eșuat (" + err.message + "). Încearcă din nou într-un moment.");
          }
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = "⚡ Generează toate cele 70 de documente";
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  function boot() {
    renderDocGroups();
    initViewerClose();
    initGenForm();
  }
})();
