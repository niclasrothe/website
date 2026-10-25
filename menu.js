(function () {
  var button = document.getElementById('menu-button');
  var list = document.getElementById('menu-list');
  if (!button || !list) return;

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
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

// Beim lokalen Testen (file://) gibt es keinen Server, der Ordner automatisch auf index.html auflöst.
if (location.protocol === 'file:') {
  document.querySelectorAll('.menu-list a, .menu-button, .site-footer a').forEach(function (a) {
    var h = a.getAttribute('href');
    if (h && h.slice(-1) === '/') a.href = a.href + 'index.html';
  });
}
