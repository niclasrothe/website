(function () {
  var button = document.getElementById('menu-button');
  var list = document.getElementById('menu-list');
  if (!button || !list) return;

  // Beschriftung für Screenreader in der Sprache der Seite (<html lang="…">)
  var en = document.documentElement.lang.slice(0, 2) === 'en';
  var labelOpen = en ? 'Open menu' : 'Menü öffnen';
  var labelClose = en ? 'Close menu' : 'Menü schließen';

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? labelClose : labelOpen);
    list.hidden = !open;
  }

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); button.focus(); }
  });
})();

// Unterseiten: Schatten am fest stehenden Menüsymbol erst, wenn Inhalt bis an den unteren Strich scrollt.
(function () {
  var button = document.querySelector('body > .menu .menu-button');
  var first = document.querySelector('main h1, main p, main figure');
  if (!button || !first) return;
  var lastBar = button.lastElementChild;

  function update() {
    var b = button.getBoundingClientRect();
    var c = first.getBoundingClientRect();
    var barBottom = b.top + lastBar.offsetTop + lastBar.offsetHeight;
    // nur wenn der Inhalt auch seitlich unter dem Symbol liegt (auf breiten Bildschirmen steht er weiter rechts)
    button.classList.toggle('is-over-content', c.top < barBottom && c.left < b.right);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Beim lokalen Testen (file://) gibt es keinen Server, der Ordner automatisch auf index.html auflöst.
if (location.protocol === 'file:') {
  document.querySelectorAll('.menu-list a, .menu-button, .site-footer a').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h && h.slice(-1) === '/') a.href = a.href + 'index.html';
  });
}
