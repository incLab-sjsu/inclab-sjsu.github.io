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
  var btn = document.querySelector('.theme-toggle');
  var meta = document.querySelector('meta[name="theme-color"]');
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (meta) { meta.setAttribute('content', theme === 'dark' ? '#0F1B33' : '#0055A2'); }
    if (btn) { btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'); }
  }
  apply(root.getAttribute('data-theme') || 'light');
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
