/* Archive index: language switch, entrance/reveal, 3D tilt with spotlight,
   scroll-through previews. Everything degrades to a static page without JS. */
(function () {
  var root = document.documentElement;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = matchMedia('(hover: none)').matches;
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  root.classList.add('js');

  // Language toggle — same storage key as the main site.
  var langBtn = document.querySelector('.lang');
  if (langBtn) langBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-lang') === 'uk' ? 'en' : 'uk';
    root.setAttribute('data-lang', next);
    root.lang = next;
    try { localStorage.setItem('lang', next); } catch (e) {}
    measure();
  });

  // Header gets a glass background once the page scrolls.
  var top = document.querySelector('.top');
  var onScroll = function () { top.classList.toggle('scrolled', scrollY > 24); };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Headline words animate in one after another; per-language index.
  $$('.title > [data-lang]').forEach(function (group) {
    $$('.w', group).forEach(function (w, i) { w.style.setProperty('--i', i); });
  });
  $$('.hero .reveal-up').forEach(function (el, i) { el.style.setProperty('--d', (650 + i * 110) + 'ms'); });
  var start = function () { requestAnimationFrame(function () { root.classList.add('loaded'); }); };
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 900); })]).then(start);
  } else start();

  // Cards and outro reveal on scroll, staggered by column.
  var revealTargets = $$('.card').concat($$('.outro > *'));
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var col = el.classList.contains('card') && innerWidth > 900 ? revealTargets.indexOf(el) % 2 : 0;
        el.style.setProperty('--d', (col * 140) + 'ms');
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in'); });
  }

  // Preview scroll distance: how far the long screenshot travels on hover.
  function measure() {
    $$('.card').forEach(function (card) {
      var screen = card.querySelector('.screen');
      var img = screen && screen.querySelector('img');
      if (!img || !img.naturalWidth) return;
      var h = img.getBoundingClientRect().height;
      var travel = Math.max(0, h - screen.clientHeight);
      img.style.setProperty('--scroll-to', -travel + 'px');
      img.style.setProperty('--scroll-dur', Math.min(7, Math.max(1.2, travel / 260)) + 's');
    });
  }
  $$('.screen img').forEach(function (img) {
    if (img.complete) measure(); else img.addEventListener('load', measure);
  });
  addEventListener('resize', measure);

  // Touch screens have no hover: play the preview while a card is in view.
  if (touch && 'IntersectionObserver' in window && !reduced) {
    var peek = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('peek', e.intersectionRatio > 0.6); });
    }, { threshold: [0, 0.6, 1] });
    $$('.card').forEach(function (c) { peek.observe(c); });
  }

  // Tilt + spotlight following the pointer (desktop only).
  if (!touch && !reduced) {
    $$('[data-tilt]').forEach(function (card) {
      var frame = card.querySelector('.frame');
      var raf = 0;
      card.addEventListener('pointermove', function (ev) {
        if (raf) return;
        raf = requestAnimationFrame(function () {
          raf = 0;
          var r = frame.getBoundingClientRect();
          var x = (ev.clientX - r.left) / r.width;
          var y = (ev.clientY - r.top) / r.height;
          frame.style.setProperty('--ry', ((x - 0.5) * 7).toFixed(2) + 'deg');
          frame.style.setProperty('--rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
          frame.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
          frame.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        });
      });
      card.addEventListener('pointerleave', function () {
        frame.style.setProperty('--rx', '0deg');
        frame.style.setProperty('--ry', '0deg');
      });
    });
  }

  // Count-up for numeric stats.
  if (!reduced) {
    $$('[data-count]').forEach(function (el) {
      var target = +el.getAttribute('data-count');
      if (!target) return;
      var t0 = null;
      el.textContent = '0';
      var step = function (t) {
        if (t0 === null) t0 = t + 900;
        var p = Math.min(1, Math.max(0, (t - t0) / 1200));
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }
})();
