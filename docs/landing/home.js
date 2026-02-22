(function () {
  const landingRoot = document.querySelector('.landing-root');
  if (!landingRoot) {
    document.body.classList.add('docs-page');
    return;
  }

  document.body.classList.add('landing-page');
  stripGeneratedLandingHeadings();
  observeGeneratedHeadingsBriefly();
  setupLandingTitleFit();

  if (isHomePagePath(window.location.pathname)) {
    setupLandingSearch();
  }
})();

function isHomePagePath(pathname) {
  return (
    pathname === '/' ||
    pathname === '/index.html' ||
    pathname === '/odonnellrory.github.io' ||
    pathname === '/odonnellrory.github.io/' ||
    pathname.endsWith('/odonnellrory.github.io/index.html')
  );
}

function stripGeneratedLandingHeadings() {
  const generatedTitle = document.querySelector('.md-content__title');
  if (generatedTitle && !generatedTitle.closest('.landing-root')) {
    generatedTitle.remove();
  }

  const mdTypeset = document.querySelector('.md-typeset');
  if (!mdTypeset) {
    return;
  }

  const headings = mdTypeset.querySelectorAll('h1');
  headings.forEach((h1) => {
    if (!h1.closest('.landing-root')) {
      h1.remove();
    }
  });
}

function observeGeneratedHeadingsBriefly() {
  if (!window.MutationObserver) {
    return;
  }

  const titleObserver = new MutationObserver(stripGeneratedLandingHeadings);
  titleObserver.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => titleObserver.disconnect(), 2500);
}

function setupLandingTitleFit() {
  const landingTitle = document.querySelector('.landing-title');
  if (!landingTitle) {
    return;
  }

  let fitRaf = null;
  const minTitlePx = 11;

  const fitLandingTitle = () => {
    landingTitle.style.removeProperty('font-size');
    landingTitle.style.removeProperty('letter-spacing');

    const available = landingTitle.clientWidth;
    if (!available) {
      return;
    }

    const currentPx = parseFloat(window.getComputedStyle(landingTitle).fontSize) || 16;
    const measured = landingTitle.scrollWidth;
    if (measured <= available) {
      return;
    }

    let nextPx = Math.max(minTitlePx, Math.floor(currentPx * (available / measured) * 0.985));
    landingTitle.style.fontSize = `${nextPx}px`;

    while (landingTitle.scrollWidth > available && nextPx > minTitlePx) {
      nextPx -= 1;
      landingTitle.style.fontSize = `${nextPx}px`;
    }

    if (landingTitle.scrollWidth > available) {
      landingTitle.style.letterSpacing = '-0.04em';
    }
  };

  const scheduleFit = () => {
    if (fitRaf) {
      window.cancelAnimationFrame(fitRaf);
    }
    fitRaf = window.requestAnimationFrame(fitLandingTitle);
  };

  window.addEventListener('resize', scheduleFit, { passive: true });
  window.addEventListener('orientationchange', scheduleFit, { passive: true });
  window.addEventListener('load', scheduleFit);
  scheduleFit();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleFit);
  }
}

function setupLandingSearch() {
  const landingSearch = document.querySelector('.landing-search');
  if (!landingSearch) {
    return;
  }

  const input = landingSearch.querySelector('.landing-search-input');
  const preview = landingSearch.querySelector('.landing-search-preview');
  const resultsList = landingSearch.querySelector('.landing-search-results');
  if (!input || !preview || !resultsList) {
    return;
  }

  const MAX_RESULTS = 6;
  const MAX_RETRY = 10;
  const RETRY_DELAY_MS = 50;
  const state = {
    lastResults: [],
    nativeToggle: null,
    nativeInput: null,
    nativeResult: null,
    renderTimer: null,
    resultObserver: null,
  };

  const refreshNativeHandles = () => {
    state.nativeToggle = document.querySelector('#__search');
    state.nativeInput = document.querySelector('[data-md-component="search-query"]');
    state.nativeResult = document.querySelector('[data-md-component="search-result"]');
  };

  const hidePreview = () => {
    preview.hidden = true;
  };

  const clearResults = () => {
    resultsList.innerHTML = '';
    state.lastResults = [];
  };

  const setEmptyResults = () => {
    const emptyItem = document.createElement('li');
    const emptyText = document.createElement('span');
    emptyText.className = 'landing-search-result-empty';
    emptyText.textContent = 'No matching pages';
    emptyItem.appendChild(emptyText);
    resultsList.appendChild(emptyItem);
    preview.hidden = false;
  };

  const getNativeLinks = () => {
    if (!state.nativeResult) {
      return [];
    }
    const selectors = [
      '.md-search-result__link',
      '.md-search-result a[href]',
      'a[href]',
    ];
    for (const selector of selectors) {
      const links = state.nativeResult.querySelectorAll(selector);
      if (links.length) {
        return links;
      }
    }
    return [];
  };

  const renderFromNative = () => {
    refreshNativeHandles();
    if (!state.nativeResult) {
      return;
    }

    clearResults();
    const nativeLinks = getNativeLinks();
    if (!nativeLinks.length) {
      setEmptyResults();
      return;
    }

    const seen = new Set();
    for (const nativeLink of nativeLinks) {
      if (state.lastResults.length >= MAX_RESULTS) {
        break;
      }

      const href = nativeLink.getAttribute('href') || '#';
      if (!href || href === '#' || href.startsWith('javascript:') || seen.has(href)) {
        continue;
      }

      seen.add(href);
      state.lastResults.push({ location: href });

      const itemNode = nativeLink.closest('article, li, .md-search-result__item');
      const teaserNode = itemNode ? itemNode.querySelector('.md-search-result__teaser') : null;
      const teaserText = teaserNode ? teaserNode.textContent.trim().replace(/\s+/g, ' ') : '';

      const item = document.createElement('li');
      const link = document.createElement('a');
      const title = document.createElement('span');
      const meta = document.createElement('span');

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
  };

  const queryNativeSearch = (query) => {
    refreshNativeHandles();
    if (!state.nativeInput || !state.nativeResult) {
      return false;
    }

    if (state.nativeToggle) {
      state.nativeToggle.checked = true;
    }

    state.nativeInput.value = query;
    state.nativeInput.dispatchEvent(new Event('input', { bubbles: true }));
    state.nativeInput.dispatchEvent(new Event('change', { bubbles: true }));
    state.nativeInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'a' }));
    return true;
  };

  const scheduleNativeRender = (attempt) => {
    if (state.renderTimer) {
      window.clearTimeout(state.renderTimer);
    }

    state.renderTimer = window.setTimeout(() => {
      renderFromNative();
      if (!state.lastResults.length && attempt < MAX_RETRY && input.value.trim()) {
        scheduleNativeRender(attempt + 1);
      }
    }, RETRY_DELAY_MS);
  };

  const renderResults = (query) => {
    const trimmed = (query || '').trim();
    if (!trimmed) {
      clearResults();
      hidePreview();
      return;
    }

    if (queryNativeSearch(trimmed)) {
      scheduleNativeRender(0);
    }
  };

  input.addEventListener('focus', () => renderResults(input.value));
  input.addEventListener('input', () => renderResults(input.value));

  landingSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) {
      return;
    }

    renderResults(value);
    if (state.lastResults.length) {
      window.location.href = state.lastResults[0].location;
    }
  });

  document.addEventListener('click', (event) => {
    if (!landingSearch.contains(event.target)) {
      hidePreview();
    }
  });

  if (!window.MutationObserver) {
    return;
  }

  const rootObserver = new MutationObserver(() => {
    refreshNativeHandles();
    if (state.nativeResult && !state.resultObserver) {
      state.resultObserver = new MutationObserver(() => {
        if (input.value.trim()) {
          renderFromNative();
        }
      });
      state.resultObserver.observe(state.nativeResult, { childList: true, subtree: true });
    }
  });
  rootObserver.observe(document.documentElement, { childList: true, subtree: true });
}
