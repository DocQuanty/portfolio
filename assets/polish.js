/* Shared motion layer for the archived layouts. Configuration comes from the
   script tag: data-hero / data-reveal / data-lift / data-press / data-zoom are
   CSS selector lists; data-accent sets the progress bar colour. */
(function () {
  var script = document.currentScript;
  var cfg = function (name) { return (script && script.getAttribute('data-' + name)) || ''; };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var all = function (sel) { if (!sel) return []; try { return Array.prototype.slice.call(document.querySelectorAll(sel)); } catch (e) { return []; } };

  function addChrome() {
    var accent = cfg('accent');
    if (accent) document.documentElement.style.setProperty('--pz-accent', accent);

    var bar = document.createElement('div');
    bar.className = 'pz-progress';
    document.body.appendChild(bar);
    var tick = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, scrollY / max) : 0) + ')';
      tick = false;
    };
    addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    update();

    var back = document.createElement('a');
    back.className = 'pz-back';
    back.href = '../';
    back.setAttribute('aria-label', 'Назад до архіву версток');
    back.innerHTML = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3 5 8l5 5"/></svg><span>Архів</span>';
    document.body.appendChild(back);
  }

  function addHover() {
    all(cfg('lift')).filter(function (el) { return getComputedStyle(el).transform === 'none'; }).forEach(function (el) { el.classList.add('pz-lift'); });
    all(cfg('press')).forEach(function (el) { el.classList.add('pz-press'); });
    all(cfg('zoom')).forEach(function (el) { el.classList.add('pz-zoom'); });
  }

  // Elements that already move on their own (drawers, sliders, fixed panels)
  // must not get our transform, or their own one is overridden.
  function animatable(el) {
    var cs = getComputedStyle(el);
    return cs.transform === 'none' && cs.position !== 'fixed' && cs.position !== 'sticky' && cs.animationName === 'none';
  }

  function addReveal() {
    if (reduced || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('pz-ready');

    all(cfg('hero')).filter(animatable).forEach(function (el, i) {
      el.style.setProperty('--pz-d', (i * 90) + 'ms');
      el.classList.add('pz-hero');
    });

    // Only elements below the fold start hidden, so nothing visible flickers.
    var targets = all(cfg('reveal')).filter(function (el) {
      return !el.classList.contains('pz-hero') && animatable(el) && el.getBoundingClientRect().top > innerHeight * 0.92;
    });
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      batch.forEach(function (e, i) {
        e.target.style.setProperty('--pz-d', Math.min(i, 6) * 80 + 'ms');
        e.target.classList.add('pz-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (el) { el.classList.add('pz-hide'); io.observe(el); });

    // Blocks in the last strip of the page may never cross the threshold:
    // once the reader reaches the bottom, show whatever is still hidden.
    var atBottom = function () {
      if (scrollY + innerHeight < document.documentElement.scrollHeight - 4) return;
      targets.forEach(function (el, i) {
        if (el.classList.contains('pz-in')) return;
        el.style.setProperty('--pz-d', Math.min(i, 6) * 60 + 'ms');
        el.classList.add('pz-in');
        io.unobserve(el);
      });
      removeEventListener('scroll', atBottom);
    };
    addEventListener('scroll', atBottom, { passive: true });
    atBottom();
  }

  function init() { addChrome(); addHover(); addReveal(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
