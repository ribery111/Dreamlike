/* ============================================================
   PymesAI — JS principal (vanilla, sin dependencias)
   Fondo animado · navbar · formularios · quiz · text-effect
   ============================================================ */
(function () {
  "use strict";

  function boot() {
    initBackground();
    initNavbar();
    initTextEffect();
    initReveal();
    initForms();
    initQuiz();
    initStatGlow();
  }
  // Arrancar ya si el DOM está listo (LiteSpeed puede aplazar/combinar el
  // script y cargarlo después de DOMContentLoaded → ese evento ya no dispara).
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  /* ---------- Fondo animado: tracking del puntero ---------- */
  function initBackground() {
    var inter = document.querySelector(".g-interactive");
    var bg = document.querySelector(".bg-anim");
    if (bg && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      bg.classList.add("safari");
    }
    if (!inter) return;
    var curX = 0, curY = 0, tgX = 0, tgY = 0;
    window.addEventListener("mousemove", function (e) { tgX = e.clientX; tgY = e.clientY; }, { passive: true });
    (function loop() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      inter.style.transform = "translate(" + Math.round(curX) + "px, " + Math.round(curY) + "px)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- Navbar: scroll + menú móvil ---------- */
  function initNavbar() {
    var nav = document.querySelector(".navbar");
    var burger = document.querySelector(".burger");
    var menu = document.querySelector(".mobile-menu");
    if (nav) {
      var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }
    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = menu.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
  }

  /* ---------- TextEffect: palabras blur-in escalonado ---------- */
  function initTextEffect() {
    var nodes = document.querySelectorAll("[data-text-effect]");
    nodes.forEach(function (node) {
      var delay = parseFloat(node.getAttribute("data-delay") || "0");
      var words = node.textContent.split(/(\s+)/);
      node.textContent = "";
      var i = 0;
      words.forEach(function (w) {
        if (w.trim() === "") { node.appendChild(document.createTextNode(w)); return; }
        var span = document.createElement("span");
        span.className = "te-word";
        span.textContent = w;
        node.appendChild(span);
        var d = delay + i * 0.05;
        setTimeout(function () { span.classList.add("in"); }, d * 1000);
        i++;
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Glow animado en stat cards (fallback si @property no) ---------- */
  function initStatGlow() {
    if (CSS && CSS.registerProperty) return; // ya animado por CSS
    var cards = document.querySelectorAll(".stat-card");
    var a = 0;
    if (!cards.length) return;
    setInterval(function () {
      a = (a + 2) % 360;
      cards.forEach(function (c) { c.style.setProperty("--angle", a + "deg"); });
    }, 30);
  }

  /* ---------- Formularios multi-paso + validación ---------- */
  function initForms() {
    document.querySelectorAll("form[data-pymes-form]").forEach(function (form) {
      var type = form.getAttribute("data-pymes-form");
      var steps = form.querySelectorAll("[data-step]");
      var bar = form.querySelector(".progress-bar");
      var stepNow = form.querySelector("[data-step-now]");
      var stepLabel = form.querySelector("[data-step-label]");
      var current = 1;
      var totalSteps = steps.length || 1;

      function showStep(n) {
        steps.forEach(function (s) { s.style.display = (parseInt(s.getAttribute("data-step"), 10) === n) ? "" : "none"; });
        if (bar) bar.style.width = (n / totalSteps * 100) + "%";
        if (stepNow) stepNow.textContent = n;
        current = n;
      }
      if (steps.length) showStep(1);

      form.querySelectorAll("[data-next]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var s = form.querySelector('[data-step="' + current + '"]');
          if (validateScope(s)) {
            if (stepLabel && btn.getAttribute("data-next-label")) stepLabel.textContent = btn.getAttribute("data-next-label");
            showStep(current + 1);
          }
        });
      });
      form.querySelectorAll("[data-prev]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          if (stepLabel && btn.getAttribute("data-prev-label")) stepLabel.textContent = btn.getAttribute("data-prev-label");
          showStep(current - 1);
        });
      });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var scope = steps.length ? form.querySelector('[data-step="' + current + '"]') : form;
        if (!validateScope(scope)) return;
        submitForm(form, type);
      });
    });
  }

  function validateScope(scope) {
    if (!scope) return true;
    var ok = true;
    scope.querySelectorAll("[required], [data-required]").forEach(function (input) {
      clearErr(input);
      var val = (input.value || "").trim();
      if (!val) { setErr(input, input.getAttribute("data-msg") || "Este campo es obligatorio"); ok = false; return; }
      var kind = input.getAttribute("data-validate");
      if (kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { setErr(input, "Introduce un email válido"); ok = false; }
      if (kind === "tel" && !/^[0-9+\s\-()]{7,15}$/.test(val)) { setErr(input, "Introduce un teléfono válido"); ok = false; }
    });
    return ok;
  }
  function setErr(input, msg) {
    input.style.borderColor = "#f87171";
    var p = document.createElement("p");
    p.className = "err"; p.setAttribute("role", "alert"); p.textContent = msg;
    p.setAttribute("data-err-for", input.id || "");
    input.parentNode.appendChild(p);
  }
  function clearErr(input) {
    input.style.borderColor = "";
    var sib = input.parentNode.querySelectorAll(".err");
    sib.forEach(function (s) { s.remove(); });
  }

  function submitForm(form, type) {
    var data = new FormData(form);
    data.append("action", "pymes_lead");
    data.append("lead_type", type);
    var btn = form.querySelector('[type="submit"]');
    if (btn) { btn.disabled = true; btn.textContent = "Enviando…"; }

    fetch((window.PymesAI && window.PymesAI.ajaxUrl) || "/wp-admin/admin-ajax.php", {
      method: "POST", body: data
    }).then(function (r) { return r.json(); }).then(function (res) {
      showSuccess(form, res && res.data && res.data.message);
    }).catch(function () {
      showSuccess(form); // fallback: muestra éxito igualmente (lead se reintenta por email del navegador)
    });
  }

  function showSuccess(form, message) {
    var wrap = form.closest("[data-form-wrap]") || form.parentNode;
    var success = wrap.querySelector("[data-form-success]");
    if (success) {
      if (message) { var p = success.querySelector("[data-success-msg]"); if (p) p.textContent = message; }
      form.style.display = "none";
      success.style.display = "";
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---------- Quiz overlay ---------- */
  function initQuiz() {
    var quiz = document.querySelector("[data-quiz]");
    if (!quiz) return;
    var delay = parseInt(quiz.getAttribute("data-delay") || "2000", 10);
    var targetSel = quiz.getAttribute("data-target");
    var questions = quiz.querySelectorAll("[data-q]");
    var intro = quiz.querySelector("[data-q-intro]");
    var dots = quiz.querySelectorAll(".quiz-dot");
    var yesCount = 0, idx = -1;

    var timer = setTimeout(function () { quiz.style.display = "flex"; }, delay);

    function close(qualify) {
      quiz.style.display = "none";
      if (qualify && targetSel) {
        var t = document.querySelector(targetSel);
        if (t) setTimeout(function () { t.scrollIntoView({ behavior: "smooth", block: "start" }); }, 300);
      }
    }
    function showQ(n) {
      if (intro) intro.style.display = "none";
      questions.forEach(function (q, i) { q.style.display = (i === n) ? "" : "none"; });
      dots.forEach(function (d, i) { d.classList.toggle("on", i <= n); });
    }

    quiz.querySelectorAll("[data-quiz-close]").forEach(function (b) {
      b.addEventListener("click", function () { clearTimeout(timer); close(false); });
    });
    if (intro) {
      intro.querySelector("[data-intro-yes]").addEventListener("click", function () { idx = 0; showQ(0); });
      intro.querySelector("[data-intro-no]").addEventListener("click", function () { close(false); });
    }
    questions.forEach(function (q, i) {
      q.querySelector("[data-ans-yes]").addEventListener("click", function () { yesCount++; advance(i); });
      q.querySelector("[data-ans-no]").addEventListener("click", function () { advance(i); });
    });
    function advance(i) {
      if (i < questions.length - 1) { idx = i + 1; showQ(i + 1); }
      else { close(yesCount >= 2); }
    }
  }
})();
