/* ============ Taibao Junior High · bilingual page interactions ============ */
/* Two tiny features, no dependencies:                                        */
/*   1) 🔊 speak buttons — read a guide script aloud (Web Speech API)         */
/*   2) self-check quiz — English-only options, Chinese hint + explanation    */

(function () {
  "use strict";

  /* ---------- 1. Speak buttons ---------- */
  var synth = window.speechSynthesis || null;

  function pickEnglishVoice() {
    if (!synth) return null;
    var voices = synth.getVoices() || [];
    // Prefer a US/UK English voice; fall back to anything en-*
    var prefer = voices.filter(function (v) {
      return /^en[-_]/i.test(v.lang);
    });
    var us = prefer.find(function (v) { return /en[-_]US/i.test(v.lang); });
    return us || prefer[0] || null;
  }

  function speak(text, btn) {
    if (!synth) {
      // Browser without speech synthesis — fail quietly, keep the text visible
      return;
    }
    // If this button is already playing, stop.
    if (btn.getAttribute("aria-pressed") === "true") {
      synth.cancel();
      return;
    }
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    var v = pickEnglishVoice();
    if (v) u.voice = v;
    u.lang = (v && v.lang) || "en-US";
    u.rate = 0.92;
    u.pitch = 1.0;
    document.querySelectorAll('.speak-btn[aria-pressed="true"]').forEach(function (b) {
      b.setAttribute("aria-pressed", "false");
    });
    btn.setAttribute("aria-pressed", "true");
    u.onend = u.onerror = function () { btn.setAttribute("aria-pressed", "false"); };
    synth.speak(u);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".speak-btn");
    if (!btn) return;
    var text = btn.getAttribute("data-speak") || "";
    if (text) speak(text, btn);
  });

  // Some browsers load voices asynchronously.
  if (synth && typeof synth.onvoiceschanged !== "undefined") {
    synth.onvoiceschanged = pickEnglishVoice;
  }

  /* ---------- 2. Quiz ---------- */
  document.addEventListener("click", function (e) {
    var opt = e.target.closest(".quiz-opt");
    if (!opt) return;
    var item = opt.closest(".quiz-item");
    if (!item || item.dataset.answered === "true") return;

    item.dataset.answered = "true";
    var correct = opt.getAttribute("data-correct") === "true";

    item.querySelectorAll(".quiz-opt").forEach(function (o) {
      o.disabled = true;
      if (o.getAttribute("data-correct") === "true") o.classList.add("correct");
    });
    if (!correct) opt.classList.add("wrong");

    var explain = item.querySelector(".quiz-explain");
    if (explain) explain.classList.add("show");
  });

  /* ---------- 3. Scroll reveal ---------- */
  // Sections and cards fade + slide up as they enter the viewport.
  // Bails out (content stays visible) if the browser lacks IntersectionObserver
  // or the user prefers reduced motion.
  (function () {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var SELECTORS = [
      ".section-head", ".about-text", ".lineage", ".pillar", ".identity__note",
      ".principal-card", ".principal-portrait", ".life-card", ".pband", ".lcard",
      ".news-card", ".station", ".commit", ".quiz-item", ".playlist-wrap",
      ".prose-inner", ".news-meta"
    ];

    function init() {
      var root = document.documentElement;
      root.classList.add("reveal-on");

      var els = [];
      document.querySelectorAll(SELECTORS.join(",")).forEach(function (el) {
        if (el.closest(".title")) return;        // never hide the hero
        if (el.classList.contains("reveal")) return;
        el.classList.add("reveal");
        els.push(el);
      });

      // Stagger items that share a parent (grid rows, card groups).
      els.forEach(function (el) {
        var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) {
          return c.classList && c.classList.contains("reveal");
        });
        var idx = sibs.indexOf(el);
        if (idx > 0) el.style.transitionDelay = (Math.min(idx, 5) * 0.07).toFixed(2) + "s";
      });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      els.forEach(function (el) { io.observe(el); });

      // Safety net: content must never be stuck invisible. If, in some
      // environment, the observer never fires, reveal everything after a
      // few seconds. In normal browsers the observer reveals on scroll long
      // before this, so it never visibly triggers.
      setTimeout(function () {
        els.forEach(function (el) { el.classList.add("in"); });
      }, 3000);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  })();
})();
