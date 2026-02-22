(function () {
  var landingRoot = document.querySelector('.landing-root');
  var isHome =
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html' ||
    window.location.pathname === '/odonnellrory.github.io' ||
    window.location.pathname === '/odonnellrory.github.io/' ||
    window.location.pathname.endsWith('/odonnellrory.github.io/index.html');

  if (landingRoot) {
    document.body.classList.add('landing-page');

    function stripGeneratedLandingHeadings() {
      var generatedTitle = document.querySelector('.md-content__title');
      if (generatedTitle && !generatedTitle.closest('.landing-root')) {
        generatedTitle.remove();
      }

      var mdTypeset = document.querySelector('.md-typeset');
      if (!mdTypeset) {
        return;
      }

      var headings = mdTypeset.querySelectorAll('h1');
      for (var i = 0; i < headings.length; i += 1) {
        var h1 = headings[i];
        if (!h1.closest('.landing-root')) {
          h1.remove();
        }
      }
    }
    stripGeneratedLandingHeadings();

    if (window.MutationObserver) {
      var titleObserver = new MutationObserver(function () {
        stripGeneratedLandingHeadings();
      });
      titleObserver.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(function () {
        titleObserver.disconnect();
      }, 2500);
    }

    var landingTitle = document.querySelector('.landing-title');
    if (landingTitle) {
      var fitRaf = null;
      var minTitlePx = 11;

      function fitLandingTitle() {
        landingTitle.style.removeProperty('font-size');
        landingTitle.style.removeProperty('letter-spacing');

        var available = landingTitle.clientWidth;
        if (!available) {
          return;
        }

        var currentPx = parseFloat(window.getComputedStyle(landingTitle).fontSize) || 16;
        var measured = landingTitle.scrollWidth;
        if (measured <= available) {
          return;
        }

        var nextPx = Math.max(minTitlePx, Math.floor(currentPx * (available / measured) * 0.985));
        landingTitle.style.fontSize = nextPx + 'px';

        // Final guard for edge cases on very narrow/DPR-heavy devices.
        while (landingTitle.scrollWidth > available && nextPx > minTitlePx) {
          nextPx -= 1;
          landingTitle.style.fontSize = nextPx + 'px';
        }

        if (landingTitle.scrollWidth > available) {
          landingTitle.style.letterSpacing = '-0.04em';
        }
      }

      function scheduleFitTitle() {
        if (fitRaf) {
          window.cancelAnimationFrame(fitRaf);
        }
        fitRaf = window.requestAnimationFrame(fitLandingTitle);
      }

      window.addEventListener('resize', scheduleFitTitle, { passive: true });
      window.addEventListener('orientationchange', scheduleFitTitle, { passive: true });
      window.addEventListener('load', scheduleFitTitle);
      scheduleFitTitle();

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(scheduleFitTitle);
      }
    }

    var landingSearch = document.querySelector('.landing-search');
    if (landingSearch && isHome) {
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
  } else {
    document.body.classList.add('docs-page');
  }
})();
