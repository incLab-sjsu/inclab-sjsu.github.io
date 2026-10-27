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
  var gilds = document.querySelectorAll('.gild');
  if (!gilds.length) { return; }
  var timer = null;
  function shimmer() {
    Array.prototype.forEach.call(gilds, function (el) {
      el.classList.remove('is-shimmer');
      void el.offsetWidth; /* restart the animation */
      el.classList.add('is-shimmer');
      setTimeout(function () { el.classList.remove('is-shimmer'); }, 1600);
    });
  }
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(shimmer, 120);
  });
})();
