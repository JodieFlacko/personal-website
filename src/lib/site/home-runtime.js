/* home-runtime.js — the page controller, ported from the reference site's
   inline <script> so the scroll choreography is identical.

   Changes from the original beyond the React ones below:
     - counters honour `data-nh-count-dec` and format against <html lang>. The
       original rounded every value through toLocaleString('en-US'), which
       turns 2.55 into "3" and, in Italian, 19.185 into "19,185".
     - the wipe's clip-path radius is uniform: the plate it drives is a product
       shot now, not a book with a spine.
     - act ids are `capabilities`, `work` and `contact` so the nav can anchor
       to them.

   Two deliberate changes from the original, both required by React:
     - the IIFE became `mountHome()`, called from a client component's effect
       once the real DOM exists.
     - a module-level `mounted` guard, because React StrictMode invokes effects
       twice in development and ScrollCraft.mount() exposes no teardown. The
       original ran exactly once per page load; the guard preserves that.

   Depends on window.NHGlass (glass.js) and window.ScrollCraft (scrollcraft.js),
   both imported for their side effects before this runs.
*/

let mounted = false;

export function mountHome() {
  if (mounted) return;
  if (!window.NHGlass || !window.ScrollCraft) return;
  mounted = true;
  if (location.hash === '') scrollTo(0, 0);
  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var COARSE = matchMedia('(pointer: coarse)').matches;
  var vh = innerHeight;
  addEventListener('resize', function () { vh = innerHeight; });

  /* ---- the glass ---------------------------------------------------------
     Brand palette through the flutes: light ground, primary blue as the light.
     The shade uniform is the light-glass port of the original 0.72/0.42/0.12. */
  var glass = NHGlass.mount(document.getElementById('glass'), {
    colors: ['#EEF3F9', '#F9FBFD', '#CCE6FF', '#3BAAFF'],
    scale: 1.18, intensity: 0.22, paramA: 0.34,
    detail: 1.824, contrast: 1.0, brightness: 0.0, saturation: 1.0,
    grain: 0.032, seed: 3.0, oklab: 1.0,
    shadeBase: 0.90, shadeHighlight: 0.13, shadeShadow: 0.06,
    cursorEnabled: FINE && !REDUCED, cursorEffect: 1.0, cursorStrength: 0.45, cursorRadius: 0.5,
    /* touch: the field holds still and only the scroll moves the light, so the
       canvas repaints during scroll rather than sixty times a second forever */
    timeScale: (REDUCED || COARSE) ? 0 : 0.3,
    maxPixels: COARSE ? 380000 : 1000000, maxDpr: COARSE ? 1 : 1.25
  });

  /* Every act's progress glides toward the scroll position (rate per second):
     a wheel notch or a touch burst becomes a short ease instead of a step.
     Touch follows tighter so the page never feels behind the finger. */
  if (COARSE) document.body.setAttribute('data-sc-lerp', '0.45');
  document.body.setAttribute('data-sc-smooth', COARSE ? '13' : '8');
  var sc = ScrollCraft.mount(document.body);
  var actRec = {};
  sc.acts.forEach(function (a) { if (a.el.id) actRec[a.el.id] = a; });
  addEventListener('pageshow', function (e) { if (e.persisted && location.hash === '') scrollTo(0, 0); });

  /* ---- helpers ------------------------------------------------------------ */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function seen(el, inAt, doneAt) {
    var top = el.getBoundingClientRect().top;
    return clamp01((vh * inAt - top) / (vh * inAt - vh * doneAt));
  }
  /* read the engine's record, not a computed style: a style flush per act
     per frame is what a phone drops frames on */
  function actP(el) { var a = actRec[el.id]; return a ? a.p || 0 : 0; }

  /* ---- pill nav: docks once the hero is passed ---------------------------- */
  var pill = document.querySelector('.nh-pill');
  var heroAct = document.getElementById('hero');
  var heroStage = heroAct.querySelector('[data-sc-stage]');
  var portrait = document.getElementById('heroPortrait');

  /* ---- depth entrances, keyed to the element's own viewport position ------ */
  var depths = Array.prototype.map.call(document.querySelectorAll('[data-nh-depth]'), function (el) {
    return { el: el, travel: parseFloat(el.getAttribute('data-nh-depth-travel')) || 44, done: false };
  });
  /* the rise runs across the lower half of the viewport, and each frame reads
     every rect before it writes any style so layout is flushed once, not once
     per element */
  function depthRead() {
    for (var i = 0; i < depths.length; i++) {
      var d = depths[i]; if (d.done) continue;
      d.p = REDUCED ? 1 : ease(seen(d.el, 1.0, 0.5));
    }
  }
  function depthWrite() {
    for (var i = 0; i < depths.length; i++) {
      var d = depths[i]; if (d.done) continue;
      var p = d.p;
      if (p >= 1) { d.done = true; d.el.classList.add('nh-seen'); d.el.style.opacity = ''; d.el.style.transform = ''; continue; }
      d.el.style.opacity = (0.06 + 0.94 * p).toFixed(3);
      d.el.style.transform = 'translate3d(0,' + ((1 - p) * d.travel).toFixed(1) + 'px,0) scale(' + (0.965 + 0.035 * p).toFixed(4) + ')';
    }
  }

  /* ---- words flow in ---------------------------------------------------
     Every marked text block is split into words (inline markup kept), and the
     words rise and sharpen in sequence the first time the block is on screen.
     The hero's blocks are on screen at load, so they run as one sequence with
     the delays written in the markup. */
  function wrapWords(el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = walker.nextNode())) if (n.nodeValue.trim() && !n.parentNode.closest('svg')) nodes.push(n);
    var count = 0;
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        var w = document.createElement('span'); w.className = 'fw'; w.textContent = part;
        w.style.setProperty('--i', count++); frag.appendChild(w);
      });
      node.parentNode.replaceChild(frag, node);
    });
    return count;
  }
  var flows = Array.prototype.slice.call(document.querySelectorAll('[data-nh-flow]'));
  flows.forEach(function (el) {
    if (el.getAttribute('data-nh-flow') !== 'block') {
      var n = wrapWords(el);
      var step = Math.min(parseFloat(el.getAttribute('data-nh-flow-step')) || 42, 1100 / Math.max(n, 1));
      el.style.setProperty('--nh-flow-step', step.toFixed(1) + 'ms');
    }
    var delay = parseFloat(el.getAttribute('data-nh-flow-delay')) || 0;
    if (delay) el.style.setProperty('--nh-flow-delay', delay + 'ms');
  });
  /* The page is served in two locales and the numbers differ in both
     separators and decimals: en wants 19,185 and 2.55, it wants 19.185 and
     2,55. The document's own lang is the single source for that, so the
     server-rendered value and the animated one cannot disagree. */
  var NUM_LOCALE = document.documentElement.lang || 'en';
  function fmt(v, dec) {
    return (dec ? v : Math.round(v)).toLocaleString(NUM_LOCALE, {
      minimumFractionDigits: dec, maximumFractionDigits: dec
    });
  }
  function decOf(el) { return parseInt(el.getAttribute('data-nh-count-dec'), 10) || 0; }
  function tickTo(el, to, dur, delay) {
    var dec = decOf(el);
    var t0 = null;
    function step(now) {
      if (t0 === null) t0 = now;
      var p = clamp01((now - t0 - delay) / dur);
      el.textContent = fmt(to * ease(p), dec);
      if (p < 1) requestAnimationFrame(step);
    }
    if (REDUCED) { el.textContent = fmt(to, dec); return; }
    el.textContent = fmt(0, dec);
    requestAnimationFrame(step);
  }
  var ticks = Array.prototype.slice.call(document.querySelectorAll('[data-nh-tick]'));
  var counts = Array.prototype.slice.call(document.querySelectorAll('[data-nh-count]'));
  function startFlows() {
    if (REDUCED) {
      flows.forEach(function (el) { el.classList.add('is-flowed'); });
      counts.forEach(function (c) { c.textContent = fmt(parseFloat(c.getAttribute('data-nh-count')), decOf(c)); });
      return;
    }
    ticks.forEach(function (el) { tickTo(el, parseFloat(el.getAttribute('data-nh-tick')), 2200, parseFloat(el.getAttribute('data-nh-tick-delay')) || 0); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target; io.unobserve(el);
        if (el.hasAttribute('data-nh-count')) { tickTo(el, parseFloat(el.getAttribute('data-nh-count')), parseFloat(el.getAttribute('data-nh-count-dur')) || 3000, 120); return; }
        el.classList.add('is-flowed');
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    flows.forEach(function (el) { io.observe(el); });
    counts.forEach(function (el) { el.textContent = fmt(0, decOf(el)); io.observe(el); });
  }
  /* wait for the face so a word never reflows mid-rise */
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(startFlows);

  /* ---- the book cover wipes up as it comes into view ----------------------- */
  var wipe = document.querySelector('[data-nh-wipe]');
  var wipeDone = false;
  var wipeP = 0;
  function wipeRead() {
    if (!wipe || wipeDone) return;
    var r = wipe.getBoundingClientRect();
    var span = Math.min(r.height, vh * 0.8) * 0.9;
    wipeP = REDUCED ? 1 : clamp01((vh - r.top) / span);
  }
  function wipeTick() {
    if (!wipe || wipeDone) return;
    var p = wipeP;
    wipe.style.clipPath = 'inset(' + ((1 - ease(p)) * 100).toFixed(2) + '% 0 0 0 round 18px)';
    if (p >= 1) { wipeDone = true; wipe.style.clipPath = ''; }
  }

  /* ---- the ring: scroll turns it, the pointer leans it, the light follows --- */
  var ringAct = document.getElementById('capabilities');
  var ringStage = ringAct.querySelector('[data-sc-stage]');
  var ring = document.getElementById('ring');
  var plates = Array.prototype.slice.call(ring.querySelectorAll('.nh-plate'));
  var N = plates.length;
  plates.forEach(function (pl, i) { pl.style.setProperty('--nh-a', (i * 360 / N) + 'deg'); });
  var ringY = 0, ringTargetY = 0, leanX = -6, leanTargetX = -6, leanY = 0, leanTargetY = 0;
  var TURN = 360 * (N - 1) / N; /* one full lap minus a plate, so the last plate lands front and centre */
  if (FINE && !REDUCED) {
    ringStage.addEventListener('pointermove', function (e) {
      var r = ringStage.getBoundingClientRect();
      leanTargetX = -6 - ((e.clientY - r.top) / r.height - 0.5) * 8;
      leanTargetY = ((e.clientX - r.left) / r.width - 0.5) * 10;
    });
    ringStage.addEventListener('pointerleave', function () { leanTargetX = -6; leanTargetY = 0; });
  }
  var ringRect = { top: 0, bottom: 0 };
  function stageOnScreen() { return ringRect.top < vh && ringRect.bottom > 0; }
  function ringTick(dt) {
    var p = actP(ringAct);
    ringTargetY = -p * TURN;
    var f = REDUCED ? 1 : 1 - Math.exp(-7 * dt);
    ringY += (ringTargetY - ringY) * f;
    leanX += (leanTargetX - leanX) * f; leanY += (leanTargetY - leanY) * f;
    ring.style.setProperty('--nh-ring-y', (ringY + leanY).toFixed(2) + 'deg');
    ring.style.setProperty('--nh-ring-x', leanX.toFixed(2) + 'deg');
    /* depth cue per plate: plates at the back go soft and small */
    for (var i = 0; i < N; i++) {
      var a = ((i * 360 / N) + ringY + leanY) * Math.PI / 180;
      var facing = Math.cos(a); /* 1 = front, -1 = back */
      var o = 0.18 + 0.82 * clamp01((facing + 0.35) / 1.35);
      plates[i].style.opacity = o.toFixed(3);
      /* back-facing plates leave the tree entirely: Safari renders a
         preserve-3d child's backface even when the parent hides its own */
      plates[i].style.visibility = facing < -0.06 ? 'hidden' : '';
      /* a plate arrives by turning, not by scrolling, so the entry observer
         can miss it and leave a visible card blank; flow its words the moment
         it faces the viewer while the stage is on screen */
      if (!plates[i].nhFlowed && facing >= -0.06 && stageOnScreen()) {
        plates[i].nhFlowed = true;
        Array.prototype.forEach.call(plates[i].querySelectorAll('[data-nh-flow]'), function (el) { el.classList.add('is-flowed'); });
      }
    }
    ringStage.setAttribute('data-sc-verify-state', 'ring:' + Math.round(ringY));
    return p;
  }

  /* ---- rail settle: items arrive in sequence, the first one exempt -------- */
  var railAct = document.getElementById('work');
  var rooms = Array.prototype.slice.call(document.querySelectorAll('.nh-room'));
  function railTick() {
    var p = actP(railAct);
    for (var i = 0; i < rooms.length; i++) {
      var start = 0.02 + i * 0.13, end = start + 0.16;
      var s = i === 0 ? 1 : clamp01((p - start) / (end - start));
      rooms[i].style.setProperty('--nh-settle', ease(s).toFixed(3));
    }
  }

  /* ---- the glass bindings ---------------------------------------------------
     Position slides the light along the flutes. Velocity bends the light: fast
     scrolling raises the prism, stopping lets it settle flat. The ring's angle
     rotates the pane while the peak is on screen. */
  var lastY = scrollY, vel = 0, inten = 0.22, intenTarget = 0.22, offY = 0, offX = 0;
  function glassTick(dt, ringP) {
    if (!glass) return;
    var y = scrollY;
    var dy = y - lastY; lastY = y;
    if (COARSE) {
      /* Touch deltas arrive in bursts, so a velocity-bound prism pulses. Hold
         the prism and ease the light's travel instead. */
      vel = 0; intenTarget = 0.22;
    } else {
      var v = dt > 0 ? Math.abs(dy) / vh / dt : 0;   /* viewport-heights per second */
      vel += (v - vel) * (v > vel ? 0.35 : 1 - Math.exp(-2.2 * dt));
      intenTarget = 0.22 + Math.min(0.34, vel * 0.16);
    }
    inten += (intenTarget - inten) * (1 - Math.exp(-4 * dt));
    if (!isFinite(inten)) inten = intenTarget = 0.22;
    if (!isFinite(vel)) vel = 0;
    var f = 1 - Math.exp(-(COARSE ? 5 : 7) * dt);
    offY += ((-y / vh * 0.22) - offY) * f;
    offX += ((y / vh * 0.03) - offX) * f;
    glass.set('intensity', +inten.toFixed(4));
    glass.set('offsetY', +offY.toFixed(4));
    glass.set('offsetX', +offX.toFixed(4));
    var ringVisible = ringRect.bottom > 0 && ringRect.top < vh;
    var rot = ringVisible ? (ringP - 0.5) * 0.22 : 0;
    glass.set('rotate', +rot.toFixed(4));
    /* the peak is the brightest, most refracted moment on the page */
    var floor = ringVisible ? (COARSE ? 0.34 : 0.46) : 0.22;
    if (intenTarget < floor) intenTarget = floor;
  }

  /* ---- hero: the portrait recedes, the bar hands off to the pill ---------- */
  var heroBottom = vh, lastHeroP = -1;
  function heroTick() {
    var p = actP(heroAct);
    if (p !== lastHeroP) {
      lastHeroP = p;
      if (!REDUCED) {
        /* recede a touch; the stage's own slide carries him off, no fade */
        portrait.style.transform = 'translate3d(0,' + (p * 18).toFixed(1) + 'px,0) scale(' + (1 - p * 0.05).toFixed(4) + ')';
      }
      heroStage.setAttribute('data-sc-verify-state', 'hero:' + Math.round(p * 100));
    }
    pill.classList.toggle('is-docked', heroBottom < vh * 0.62);
  }

  /* ---- one loop ---------------------------------------------------------- */
  var last = performance.now();
  var __frames = 0, __lastDt = 0;
  window.__nh = function () { return { frames: __frames, dt: __lastDt, vel: vel, inten: inten, intenTarget: intenTarget, lastY: lastY, vh: vh, glassInt: glass && glass.get('intensity') }; };
  function loop(now) {
    var dt = Math.min((now - last) / 1000, 0.1); last = now;
    if (!(dt > 0) || !isFinite(dt)) dt = 1 / 60;
    /* live, every frame: the first read on a phone can be a stale layout
       viewport (3376px on emulated iOS), and every position-keyed reveal,
       the pill dock and the peak brightness test all divide by it */
    vh = innerHeight;
    __frames++; __lastDt = dt;
    /* read phase: every layout query, then the write phase */
    heroBottom = heroStage.getBoundingClientRect().bottom;
    ringRect = ringStage.getBoundingClientRect();
    depthRead();
    wipeRead();
    heroTick();
    depthWrite();
    wipeTick();
    var ringP = ringTick(dt);
    railTick();
    if (!REDUCED) glassTick(dt, ringP);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  /* Keyboard. The engine centres a focused control inside an act, but a pinned
     act parks at progress 0 when centred, which is where the close's cues are
     still shut, and a control deep in a flow act can land off screen. Park the
     close at the progress where its cues are open, and centre anything else
     the browser left off screen. */
  var closeAct = document.getElementById('contact');
  document.addEventListener('focusin', function (e) {
    var el = e.target; if (!(el instanceof Element)) return;
    if (closeAct.contains(el)) {
      var top = closeAct.getBoundingClientRect().top + scrollY;
      scrollTo({ top: top + Math.max(closeAct.offsetHeight - vh, 1) * 0.6, behavior: 'instant' });
      return;
    }
    if (ringAct.contains(el)) return; /* the plate handler below */
    setTimeout(function () {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) el.scrollIntoView({ block: 'center', behavior: 'instant' });
    }, 30);
  });

  /* A plate that receives focus turns the ring to face it, since a pinned act
     cannot be scrolled into a cue by the browser alone. */
  plates.forEach(function (pl, i) {
    var f = pl.querySelector('a');
    if (!f) return;
    f.addEventListener('focus', function () {
      var top = ringAct.getBoundingClientRect().top + scrollY;
      var travel = ringAct.offsetHeight - vh;
      var target = clamp01((i * 360 / N) / TURN);
      scrollTo({ top: top + travel * target, behavior: 'instant' });
    });
  });
}
