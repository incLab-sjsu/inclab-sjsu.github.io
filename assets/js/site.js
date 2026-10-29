(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) { return; }
  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
  }
  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) { setOpen(false); }
  });
})();

(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { return; }
  var gilds = document.querySelectorAll('.gild, .gild-sheen');
  if (!gilds.length) { return; }
  var timer = null;
  function shimmer() {
    Array.prototype.forEach.call(gilds, function (el) {
      el.classList.remove('is-shimmer');
      void el.offsetWidth; /* restart the animation */
      el.classList.add('is-shimmer');
      setTimeout(function () { el.classList.remove('is-shimmer'); }, 3700);
    });
  }
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(shimmer, 120);
  });
})();

(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-switch');
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) { meta.setAttribute('content', theme === 'dark' ? '#0F1B33' : '#0055A2'); }
    if (btn) { btn.setAttribute('aria-checked', theme === 'dark' ? 'true' : 'false'); }
  }
  apply(root.getAttribute('data-theme') || 'light');
  /* fetch the other theme's star tiles ahead of the first switch, so the sky never blinks empty */
  var warmed = false;
  function warm() {
    if (warmed) { return; }
    warmed = true;
    var other = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    ['dust', 't1', 't2', 't3', 't4', 't5', 't6'].forEach(function (n) { new Image().src = '/assets/img/sky-' + n + '-' + other + '.svg'; });
    new Image().src = '/assets/img/sky-galaxy-' + other + '.webp';
  }
  if (btn) {
    ['pointerenter', 'focus', 'touchstart'].forEach(function (ev) { btn.addEventListener(ev, warm, { once: true, passive: true }); });
  }
  window.addEventListener('load', function () {
    if (window.requestIdleCallback) { window.requestIdleCallback(warm, { timeout: 4000 }); } else { setTimeout(warm, 3000); }
  });
  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('incl-theme', next); } catch (e) {}
    });
  }
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem('incl-theme'); } catch (err) {}
      if (saved !== 'light' && saved !== 'dark') { apply(e.matches ? 'dark' : 'light'); }
    });
  }
  var before = null;
  window.addEventListener('beforeprint', function () { before = root.getAttribute('data-theme'); apply('light'); });
  window.addEventListener('afterprint', function () { if (before) { apply(before); } });
})();

(function () {
  var toast = null;
  function announce(message) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'copy-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toast.hideTimer);
    toast.hideTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2400);
  }
  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text; area.setAttribute('readonly', '');
    area.style.position = 'fixed'; area.style.top = '-1000px'; area.style.opacity = '0';
    document.body.appendChild(area); area.select(); area.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(area);
    return ok;
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacyCopy(text); });
    }
    return Promise.resolve(legacyCopy(text));
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('a[href^="mailto:"]') : null;
    if (!link) { return; }
    event.preventDefault();
    var address = decodeURIComponent(link.getAttribute('href').slice(7).split('?')[0]);
    copyText(address).then(function (ok) {
      if (!ok) { window.location.href = link.href; return; }
      announce('Email copied: ' + address);
      var label = link.querySelector('.copy-btn__text');
      link.classList.add('is-copied');
      if (label) { label.textContent = 'Email copied'; }
      clearTimeout(link.copyTimer);
      link.copyTimer = setTimeout(function () {
        link.classList.remove('is-copied');
        if (label) { label.textContent = address; }
      }, 2400);
    });
  });
})();
