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
      var input = landingSearch.querySelector('.landing-search-input');
      var preview = landingSearch.querySelector('.landing-search-preview');
      var resultsList = landingSearch.querySelector('.landing-search-results');
      var lastResults = [];
      var nativeToggle = null;
      var nativeInput = null;
      var nativeResult = null;
      var observer = null;
      var renderTimer = null;

      function refreshNativeHandles() {
        nativeToggle = document.querySelector('#__search');
        nativeInput = document.querySelector('[data-md-component="search-query"]');
        nativeResult = document.querySelector('[data-md-component="search-result"]');
      }

      function hidePreview() {
        if (preview) {
          preview.hidden = true;
        }
      }

      function renderFromNative() {
        refreshNativeHandles();
        if (!resultsList || !preview) {
          return;
        }
        if (!nativeResult) {
          return;
        }

        var nativeLinks = nativeResult.querySelectorAll('.md-search-result__link');
        if (!nativeLinks.length) {
          nativeLinks = nativeResult.querySelectorAll('.md-search-result a[href]');
        }
        if (!nativeLinks.length) {
          nativeLinks = nativeResult.querySelectorAll('a[href]');
        }
        lastResults = [];
        resultsList.innerHTML = '';

        if (!nativeLinks.length) {
          var emptyItem = document.createElement('li');
          var emptyText = document.createElement('span');
          emptyText.className = 'landing-search-result-empty';
          emptyText.textContent = 'No matching pages';
          emptyItem.appendChild(emptyText);
          resultsList.appendChild(emptyItem);
          preview.hidden = false;
          return;
        }

        var seen = {};
        for (var i = 0; i < nativeLinks.length && lastResults.length < 6; i += 1) {
          var nativeLink = nativeLinks[i];
          var href = nativeLink.getAttribute('href') || '#';
          if (!href || href === '#' || href.indexOf('javascript:') === 0 || seen[href]) {
            continue;
          }
          seen[href] = true;
          var itemNode = nativeLink.closest('article, li, .md-search-result__item');
          var teaserNode = itemNode ? itemNode.querySelector('.md-search-result__teaser') : null;
          var teaserText = teaserNode ? teaserNode.textContent.trim().replace(/\s+/g, ' ') : '';

          lastResults.push({ location: href });

          var item = document.createElement('li');
          var link = document.createElement('a');
          var title = document.createElement('span');
          var meta = document.createElement('span');

          link.className = 'landing-search-result';
          link.href = href;

          title.className = 'landing-search-result-title';
          title.textContent = nativeLink.textContent.trim() || href;

          meta.className = 'landing-search-result-meta';
          meta.textContent = teaserText;

          link.appendChild(title);
          link.appendChild(meta);
          item.appendChild(link);
          resultsList.appendChild(item);
        }

        preview.hidden = false;
      }

      function queryNativeSearch(query) {
        refreshNativeHandles();
        if (!nativeInput || !nativeResult) {
          return false;
        }

        if (nativeToggle) {
          nativeToggle.checked = true;
        }
        nativeInput.value = query;
        nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
        nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
        nativeInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'a' }));
        return true;
      }

      function scheduleNativeRender(attempt) {
        if (renderTimer) {
          window.clearTimeout(renderTimer);
        }
        renderTimer = window.setTimeout(function () {
          renderFromNative();
          if (!lastResults.length && attempt < 10 && input && input.value && input.value.trim()) {
            scheduleNativeRender(attempt + 1);
          }
        }, 50);
      }

      function renderResults(query) {
        refreshNativeHandles();
        var trimmed = (query || '').trim();
        if (!trimmed) {
          resultsList.innerHTML = '';
          lastResults = [];
          hidePreview();
          return;
        }

        if (queryNativeSearch(trimmed)) {
          scheduleNativeRender(0);
          return;
        }
      }

      if (input) {
        input.addEventListener('focus', function () {
          refreshNativeHandles();
          renderResults(input.value || '');
        });
        input.addEventListener('input', function () {
          renderResults(input.value || '');
        });
      }

      document.addEventListener('click', function (event) {
        if (!landingSearch.contains(event.target)) {
          hidePreview();
        }
      });

      landingSearch.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!input || !input.value || !input.value.trim()) {
          return;
        }
        renderResults(input.value.trim());
        if (lastResults.length) {
          window.location.href = lastResults[0].location;
        }
      });

      if (window.MutationObserver) {
        var rootObserver = new MutationObserver(function () {
          refreshNativeHandles();
          if (nativeResult && !observer) {
            observer = new MutationObserver(function () {
              if (input && input.value && input.value.trim()) {
                renderFromNative();
              }
            });
            observer.observe(nativeResult, { childList: true, subtree: true });
          }
        });
        rootObserver.observe(document.documentElement, { childList: true, subtree: true });
      }
    }
  }
})();
