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

    var landingSearch = document.querySelector('.landing-search');
    if (landingSearch) {
      landingSearch.addEventListener('submit', function (event) {
        var input = landingSearch.querySelector('.landing-search-input');
        if (!input || !input.value || !input.value.trim()) {
          event.preventDefault();
        }
      });
    }
  }
})();
