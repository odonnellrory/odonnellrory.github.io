(function () {
  var path = window.location.pathname;
  var isHome =
    path === '/' ||
    path === '/index.html' ||
    path === '/odonnellrory.github.io' ||
    path === '/odonnellrory.github.io/' ||
    path.endsWith('/odonnellrory.github.io/index.html');

  if (isHome) {
    document.body.classList.add('landing-page');
  }
})();
