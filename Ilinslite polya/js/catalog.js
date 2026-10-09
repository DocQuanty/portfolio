/* Оселя — каталог новобудов: data, generated illustrations, filters, sorting,
   paging, favourites and the mobile filter drawer. No dependencies. */
(function () {
  'use strict';

  // Demo data. Names and prices are invented; stations are real Kyiv metro.
  var DATA = [
    { id: 1, name: 'ЖК «Липовий сад»', district: 'Голосіївський р-н', metro: 'Теремки', walk: 8, cls: 'Комфорт', price: 52500, year: 2026, q: 4, ready: 82, rooms: '1–3 кімн.', area: 38, opts: ['yard', 'storage'], pay: true, pop: 9, scene: 'day' },
    { id: 2, name: 'ЖК «Сім вітрил»', district: 'Оболонський р-н', metro: 'Почайна', walk: 12, cls: 'Бізнес', price: 74000, year: 2027, q: 2, ready: 46, rooms: '1–4 кімн.', area: 44, opts: ['panorama', 'ceiling', 'yard'], pay: false, pop: 10, scene: 'dusk' },
    { id: 3, name: 'ЖК «Тиха гавань»', district: 'Дарницький р-н', metro: 'Осокорки', walk: 6, cls: 'Комфорт', price: 47800, year: 0, q: 0, ready: 100, rooms: '1–3 кімн.', area: 36, opts: ['storage'], pay: false, pop: 8, scene: 'day' },
    { id: 4, name: 'ЖК «Кленова алея»', district: 'Святошинський р-н', metro: 'Нивки', walk: 15, cls: 'Економ', price: 39900, year: 2026, q: 3, ready: 91, rooms: '1–2 кімн.', area: 29, opts: ['yard'], pay: true, pop: 7, scene: 'morning' },
    { id: 5, name: 'ЖК «Вежі над Дніпром»', district: 'Печерський р-н', metro: 'Дружби народів', walk: 9, cls: 'Преміум', price: 88500, year: 2027, q: 4, ready: 34, rooms: '2–5 кімн.', area: 72, opts: ['panorama', 'ceiling', 'storage', 'yard'], pay: false, pop: 6, scene: 'night' },
    { id: 6, name: 'ЖК «Яблуневий двір»', district: 'Дарницький р-н', metro: 'Харківська', walk: 22, cls: 'Економ', price: 36500, year: 2026, q: 4, ready: 74, rooms: '1–2 кімн.', area: 27, opts: ['lowrise', 'yard'], pay: true, pop: 5, scene: 'morning' },
    { id: 7, name: 'ЖК «Каштанова площа»', district: 'Шевченківський р-н', metro: 'Лук’янівська', walk: 5, cls: 'Бізнес', price: 81000, year: 0, q: 0, ready: 100, rooms: '1–3 кімн.', area: 48, opts: ['ceiling', 'storage'], pay: false, pop: 9, scene: 'dusk' },
    { id: 8, name: 'ЖК «Лісова поляна»', district: 'Деснянський р-н', metro: 'Лісова', walk: 18, cls: 'Комфорт', price: 44200, year: 2028, q: 1, ready: 18, rooms: '1–3 кімн.', area: 35, opts: ['lowrise', 'yard', 'panorama'], pay: true, pop: 6, scene: 'day' },
    { id: 9, name: 'ЖК «Сонячна брама»', district: 'Солом’янський р-н', metro: 'Берестейська', walk: 11, cls: 'Комфорт', price: 56300, year: 2027, q: 1, ready: 58, rooms: '1–3 кімн.', area: 40, opts: ['storage', 'panorama'], pay: true, pop: 8, scene: 'morning' },
    { id: 10, name: 'ЖК «Північне сяйво»', district: 'Подільський р-н', metro: 'Виноградар', walk: 27, cls: 'Економ', price: 41000, year: 2027, q: 3, ready: 39, rooms: '1–2 кімн.', area: 31, opts: ['yard'], pay: true, pop: 4, scene: 'night' },
    { id: 11, name: 'ЖК «Берег»', district: 'Дніпровський р-н', metro: 'Лівобережна', walk: 7, cls: 'Бізнес', price: 69500, year: 2026, q: 2, ready: 95, rooms: '1–4 кімн.', area: 46, opts: ['panorama', 'ceiling'], pay: false, pop: 7, scene: 'dusk' },
    { id: 12, name: 'ЖК «Зелений квартал»', district: 'Голосіївський р-н', metro: 'Виставковий центр', walk: 14, cls: 'Комфорт', price: 49900, year: 2028, q: 2, ready: 12, rooms: '1–3 кімн.', area: 37, opts: ['lowrise', 'yard', 'storage'], pay: true, pop: 5, scene: 'day' }
  ];
  var PAGE = 6;

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fmt = function (n) { return n.toLocaleString('uk-UA').replace(/ /g, ' '); };

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- Generated building illustration ---------- */
  var SCENES = {
    morning: { sky: ['#ffd9b8', '#cfe6ff'], sun: '#fff1c9', far: '#c9d6e6', glass: '#a9c8e8', lit: '#fff3cf', ground: '#9cc77c', tree: ['#5f9b4a', '#77b35c', '#4d8a3d'] },
    day: { sky: ['#8ec5ff', '#e6f3ff'], sun: '#fff6d6', far: '#b9cde3', glass: '#7fb1df', lit: '#e9f5ff', ground: '#8cc06b', tree: ['#4f9440', '#68ad53', '#3f7f34'] },
    dusk: { sky: ['#ff9a76', '#6a5acd'], sun: '#ffd27a', far: '#8b7bb5', glass: '#4f4a86', lit: '#ffcf6e', ground: '#5e7d4b', tree: ['#3e5f37', '#4e7445', '#33502e'] },
    night: { sky: ['#0f1a3a', '#2b3d7a'], sun: '#f4f1d0', far: '#26335f', glass: '#1d2a52', lit: '#ffd36b', ground: '#2c3d2a', tree: ['#1f3221', '#294129', '#18291a'] }
  };
  var FACADES = ['#f2efe9', '#e9e2d6', '#dfe6ee', '#efe7dc', '#d9d4cc', '#f5f1ea', '#e4ddd2'];

  function rng(seed) { // mulberry32
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function building(r, x, w, h, groundY, facade, s, isNight) {
    var top = groundY - h, out = [];
    var cols = Math.max(3, Math.floor(w / 13)), rows = Math.max(3, Math.floor(h / 15));
    var cw = (w - 12) / cols, ch = (h - 18) / rows;
    out.push('<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + h + '" fill="' + facade + '"/>');
    out.push('<rect x="' + x + '" y="' + top + '" width="' + (w * 0.18).toFixed(1) + '" height="' + h + '" fill="#000" opacity=".06"/>');
    out.push('<rect x="' + (x - 2) + '" y="' + (top - 4) + '" width="' + (w + 4) + '" height="5" fill="' + facade + '" opacity=".9"/>');
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        var lit = isNight ? r() < 0.45 : r() < 0.12;
        out.push('<rect x="' + (x + 6 + j * cw + 1.5).toFixed(1) + '" y="' + (top + 10 + i * ch + 2).toFixed(1) + '" width="' + (cw - 3).toFixed(1) + '" height="' + (ch - 5).toFixed(1) + '" rx="1" fill="' + (lit ? s.lit : s.glass) + '"/>');
      }
      if (r() < 0.5) out.push('<rect x="' + (x + 4) + '" y="' + (top + 10 + (i + 1) * ch - 3).toFixed(1) + '" width="' + (w - 8) + '" height="1.6" fill="#000" opacity=".08"/>');
    }
    return out.join('');
  }

  function tree(r, x, y, s) {
    var h = 16 + r() * 18, rad = 9 + r() * 9, c = s.tree[Math.floor(r() * s.tree.length)];
    return '<rect x="' + (x - 1.5) + '" y="' + (y - h) + '" width="3" height="' + h + '" fill="#5b4636" opacity=".8"/>' +
      '<circle cx="' + x + '" cy="' + (y - h) + '" r="' + rad.toFixed(1) + '" fill="' + c + '"/>' +
      '<circle cx="' + (x + rad * 0.5).toFixed(1) + '" cy="' + (y - h + 4) + '" r="' + (rad * 0.7).toFixed(1) + '" fill="' + c + '" opacity=".85"/>';
  }

  function scene(item) {
    var r = rng(item.id * 9973), s = SCENES[item.scene], night = item.scene === 'night';
    var W = 320, H = 220, G = 182, uid = 'g' + item.id, out = [];
    out.push('<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ілюстрація: ' + item.name + '">');
    out.push('<defs><linearGradient id="' + uid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + s.sky[1] + '"/><stop offset="1" stop-color="' + s.sky[0] + '"/></linearGradient></defs>');
    out.push('<rect width="' + W + '" height="' + H + '" fill="url(#' + uid + ')"/>');
    out.push('<circle cx="' + (40 + r() * 240).toFixed(0) + '" cy="' + (30 + r() * 30).toFixed(0) + '" r="' + (night ? 12 : 22) + '" fill="' + s.sun + '" opacity="' + (night ? .95 : .9) + '"/>');
    if (night) for (var k = 0; k < 26; k++) out.push('<circle cx="' + (r() * W).toFixed(0) + '" cy="' + (r() * 90).toFixed(0) + '" r="' + (r() * 1.2 + .3).toFixed(1) + '" fill="#fff" opacity="' + (.4 + r() * .6).toFixed(2) + '"/>');
    // distant skyline
    for (var x = -10; x < W; x += 18 + r() * 22) out.push('<rect x="' + x.toFixed(0) + '" y="' + (G - 40 - r() * 60).toFixed(0) + '" width="' + (16 + r() * 22).toFixed(0) + '" height="140" fill="' + s.far + '" opacity=".75"/>');
    // main blocks
    var low = item.opts.indexOf('lowrise') >= 0;
    var count = low ? 3 : 2 + Math.floor(r() * 2), facade = FACADES[item.id % FACADES.length];
    var slots = count === 3 ? [18, 118, 214] : [40, 170];
    slots.forEach(function (sx, i) {
      var w = low ? 78 + r() * 14 : 82 + r() * 34;
      var h = low ? 52 + r() * 22 : (i === 0 ? 120 : 92) + r() * 50;
      out.push(building(r, Math.round(sx + r() * 12), Math.round(w), Math.round(h), G, i % 2 ? FACADES[(item.id + 3) % FACADES.length] : facade, s, night));
    });
    // ground, path, trees
    out.push('<rect x="0" y="' + G + '" width="' + W + '" height="' + (H - G) + '" fill="' + s.ground + '"/>');
    out.push('<path d="M0 ' + (H - 8) + ' Q 160 ' + (G + 6) + ' ' + W + ' ' + (H - 14) + '" stroke="#efe9dc" stroke-width="7" fill="none" opacity=".75"/>');
    for (var t = 0; t < 7; t++) out.push(tree(r, 10 + t * 48 + r() * 18, G + 6 + r() * 10, s));
    out.push('</svg>');
    return out.join('');
  }

  /* ---------- State ---------- */
  var state = { metro: 'any', handover: 'any', classes: [], price: 90000, opts: [], installment: false, sort: 'popular', shown: PAGE };
  var favs = store.get('oselya-favs', []);

  var grid = $('[data-grid]'), tpl = $('#card-tpl'), more = $('[data-more]'), empty = $('[data-empty]');

  function matches(d) {
    if (state.metro !== 'any' && d.walk > +state.metro) return false;
    if (state.handover === 'done' && d.year !== 0) return false;
    if ((state.handover === '2026' || state.handover === '2027') && d.year !== +state.handover) return false;
    if (state.classes.length && state.classes.indexOf(d.cls) < 0) return false;
    if (d.price > state.price) return false;
    for (var i = 0; i < state.opts.length; i++) if (d.opts.indexOf(state.opts[i]) < 0) return false;
    if (state.installment && !d.pay) return false;
    return true;
  }

  var SORTS = {
    popular: function (a, b) { return b.pop - a.pop || a.id - b.id; },
    cheap: function (a, b) { return a.price - b.price; },
    expensive: function (a, b) { return b.price - a.price; },
    metro: function (a, b) { return a.walk - b.walk; },
    soon: function (a, b) { return (a.year || 1) * 10 + a.q - ((b.year || 1) * 10 + b.q); }
  };

  function term(d) { return d.year ? 'Здача: ' + d.q + ' кв. ' + d.year + ' р.' : 'Будинок здано'; }

  function card(d, i) {
    var node = tpl.content.firstElementChild.cloneNode(true);
    node.dataset.id = d.id;
    $('.card__art', node).innerHTML = scene(d);
    var badges = '<span class="tag tag--class">' + d.cls + '</span>';
    if (d.pay) badges += '<span class="tag tag--pay">Розстрочка 0%</span>';
    if (!d.year) badges += '<span class="tag tag--done">Здано</span>';
    $('.card__badges', node).innerHTML = badges;
    $('.card__price', node).innerHTML = 'від ' + fmt(d.price) + ' <small>грн/м²</small>';
    $('.card__title', node).textContent = d.name;
    $('.card__metro span', node).innerHTML = '<b>' + d.metro + '</b> · ' + d.walk + ' хв пішки';
    $('.card__term', node).innerHTML = term(d) + ' · <span class="nw">' + d.district + '</span>';
    $('.card__flats', node).textContent = d.rooms + ' · від ' + d.area + ' м²';
    $('.card__link', node).setAttribute('aria-label', d.name + ', від ' + fmt(d.price) + ' гривень за метр');
    node.style.setProperty('--ready', d.ready + '%');
    $('.card__progress', node).title = 'Готовність будівництва: ' + d.ready + '%';
    var fav = $('.card__fav', node), on = favs.indexOf(d.id) >= 0;
    fav.setAttribute('aria-pressed', on);
    fav.setAttribute('aria-label', on ? 'Прибрати з обраного' : 'Додати в обране');
    if (!reduced) { node.classList.add('is-enter'); node.style.setProperty('--d', (i % PAGE) * 70 + 'ms'); }
    return node;
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.4 }) : null;

  function render(animateOut) {
    var list = DATA.filter(matches).sort(SORTS[state.sort]);
    var draw = function () {
      grid.innerHTML = '';
      list.slice(0, state.shown).forEach(function (d, i) {
        var c = card(d, i);
        grid.appendChild(c);
        if (io) io.observe(c); else c.classList.add('is-visible');
      });
      more.hidden = list.length <= state.shown;
      empty.hidden = list.length > 0;
      count(list.length);
    };
    if (animateOut && !reduced && grid.children.length) {
      $$('.card', grid).forEach(function (c) { c.classList.add('is-leave'); });
      setTimeout(draw, 200);
    } else draw();
  }

  function append() {
    var list = DATA.filter(matches).sort(SORTS[state.sort]);
    var from = state.shown;
    state.shown += PAGE;
    list.slice(from, state.shown).forEach(function (d, i) {
      var c = card(d, i);
      grid.appendChild(c);
      if (io) io.observe(c); else c.classList.add('is-visible');
    });
    more.hidden = list.length <= state.shown;
  }

  var shownCount = DATA.length;
  function count(n) {
    var out = $('[data-found]'), from = shownCount, t0 = null;
    shownCount = n;
    $('[data-found-btn]').textContent = n;
    var active = (state.metro !== 'any') + (state.handover !== 'any') + state.classes.length + (state.price < 90000) + state.opts.length + state.installment;
    var badge = $('[data-active-count]');
    badge.hidden = !active;
    badge.textContent = active;
    if (reduced || from === n) { out.textContent = n; return; }
    requestAnimationFrame(function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min(1, (t - t0) / 400);
      out.textContent = Math.round(from + (n - from) * p);
      if (p < 1) requestAnimationFrame(step);
    });
  }

  function update() { state.shown = PAGE; render(true); }

  /* ---------- Controls ---------- */
  // Segmented control with a sliding highlight.
  var seg = $('[data-filter="metro"]'), pill = document.createElement('span');
  pill.className = 'pill';
  seg.appendChild(pill);
  function placePill() {
    var on = $('.is-on', seg);
    pill.style.left = on.offsetLeft + 'px';
    pill.style.width = on.offsetWidth + 'px';
  }
  $$('button', seg).forEach(function (b) {
    b.addEventListener('click', function () {
      $$('button', seg).forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-checked', 'false'); });
      b.classList.add('is-on'); b.setAttribute('aria-checked', 'true');
      state.metro = b.dataset.value; placePill(); update();
    });
  });

  $$('input[name="handover"]').forEach(function (r) { r.addEventListener('change', function () { state.handover = r.value; update(); }); });

  $$('[data-filter="class"] button').forEach(function (b) {
    b.addEventListener('click', function () {
      b.classList.toggle('is-on');
      b.setAttribute('aria-pressed', b.classList.contains('is-on'));
      state.classes = $$('[data-filter="class"] .is-on').map(function (x) { return x.dataset.value; });
      update();
    });
  });

  var range = $('[data-filter="price"]'), priceOut = $('[data-price-out]'), priceTimer;
  function paintRange() {
    var p = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.setProperty('--p', p + '%');
    priceOut.textContent = fmt(+range.value);
  }
  range.addEventListener('input', function () {
    paintRange(); state.price = +range.value;
    clearTimeout(priceTimer); priceTimer = setTimeout(update, 180);
  });

  $$('.check input').forEach(function (c) {
    c.addEventListener('change', function () {
      state.opts = $$('.check input:checked').map(function (x) { return x.value; });
      update();
    });
  });
  $('[data-filter="installment"]').addEventListener('change', function (e) { state.installment = e.target.checked; update(); });
  $('[data-sort]').addEventListener('change', function (e) { state.sort = e.target.value; update(); });
  more.addEventListener('click', append);

  $$('[data-reset]').forEach(function (b) {
    b.addEventListener('click', function () {
      state = { metro: 'any', handover: 'any', classes: [], price: 90000, opts: [], installment: false, sort: state.sort, shown: PAGE };
      $$('button', seg).forEach(function (x) { var on = x.dataset.value === 'any'; x.classList.toggle('is-on', on); x.setAttribute('aria-checked', on); });
      $('input[name="handover"][value="any"]').checked = true;
      $$('[data-filter="class"] button').forEach(function (x) { x.classList.remove('is-on'); x.setAttribute('aria-pressed', 'false'); });
      range.value = 90000; paintRange();
      $$('.check input').forEach(function (x) { x.checked = false; });
      $('[data-filter="installment"]').checked = false;
      placePill(); update();
    });
  });

  // Favourites, persisted per browser.
  function paintFavs() {
    var el = $('[data-fav-count]');
    el.textContent = favs.length;
  }
  grid.addEventListener('click', function (e) {
    var btn = e.target.closest('.card__fav');
    if (!btn) return;
    e.preventDefault();
    var id = +btn.closest('.card').dataset.id, i = favs.indexOf(id);
    if (i >= 0) favs.splice(i, 1); else favs.push(id);
    var on = i < 0;
    btn.setAttribute('aria-pressed', on);
    btn.setAttribute('aria-label', on ? 'Прибрати з обраного' : 'Додати в обране');
    store.set('oselya-favs', favs);
    paintFavs();
    var counter = $('.fav-counter');
    counter.classList.remove('bump'); void counter.offsetWidth; counter.classList.add('bump');
  });

  // Mobile drawer.
  var panel = $('#filters'), scrim = $('.scrim');
  function openFilters() { panel.classList.add('is-open'); scrim.classList.add('is-on'); document.body.classList.add('no-scroll'); requestAnimationFrame(placePill); }
  function closeFilters() { panel.classList.remove('is-open'); scrim.classList.remove('is-on'); document.body.classList.remove('no-scroll'); }
  $('[data-open-filters]').addEventListener('click', openFilters);
  $$('[data-close-filters]').forEach(function (b) { b.addEventListener('click', closeFilters); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeFilters(); });

  // Header border once the page scrolls.
  var header = $('.site-header');
  addEventListener('scroll', function () { header.classList.toggle('is-scrolled', scrollY > 8); }, { passive: true });

  paintRange(); paintFavs(); placePill(); render(false);
  addEventListener('resize', placePill);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placePill);
})();
