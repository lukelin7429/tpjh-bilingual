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
})();
