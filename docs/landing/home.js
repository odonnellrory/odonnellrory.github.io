(function () {
  const landingRoot = document.querySelector('.landing-root');
  document.body.classList.add(landingRoot ? 'landing-page' : 'docs-page');

  const landingSearch = document.querySelector('.landing-search');
  if (landingSearch) {
    setupLandingSearch(landingSearch);
  }
})();

function setupLandingSearch(form) {
  const input = form.querySelector('.landing-search-input');
  const preview = form.querySelector('.landing-search-preview');
  const list = form.querySelector('.landing-search-results');
  if (!input || !preview || !list) return;

  const indexUrl = new URL('search/search_index.json', document.baseURI);
  const MAX_RESULTS = 6;
  let docsPromise;
  let lastResults = [];
  let timer;

  const textOnly = (value = '') => {
    const node = document.createElement('div');
    node.innerHTML = value;
    return (node.textContent || '').replace(/\s+/g, ' ').trim();
  };

  const loadDocs = () => {
    docsPromise ??= fetch(indexUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`Search index: ${response.status}`);
        return response.json();
      })
      .then((data) => data.docs || []);
    return docsPromise;
  };

  const hide = () => {
    preview.hidden = true;
  };

  const showMessage = (message) => {
    list.replaceChildren();
    const item = document.createElement('li');
    const text = document.createElement('span');
    text.className = 'landing-search-result-empty';
    text.textContent = message;
    item.appendChild(text);
    list.appendChild(item);
    preview.hidden = false;
  };

  const searchDocs = (docs, query) => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const ranked = [];

    for (const doc of docs) {
      if (!doc.location) continue;

      const title = textOnly(doc.title);
      const text = textOnly(doc.text);
      const titleLower = title.toLowerCase();
      const haystack = `${titleLower} ${text.toLowerCase()}`;
      if (!terms.every((term) => haystack.includes(term))) continue;

      const score = terms.reduce(
        (total, term) => total + (titleLower.includes(term) ? 10 : 1),
        0,
      );
      ranked.push({ location: doc.location, title, text, score });
    }

    ranked.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

    const seen = new Set();
    return ranked.filter((result) => {
      const page = result.location.split('#')[0];
      if (seen.has(page)) return false;
      seen.add(page);
      return true;
    }).slice(0, MAX_RESULTS);
  };

  const render = (results) => {
    lastResults = results;
    list.replaceChildren();

    if (!results.length) {
      showMessage('No matching pages');
      return;
    }

    for (const result of results) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const title = document.createElement('span');
      const meta = document.createElement('span');

      link.className = 'landing-search-result';
      link.href = result.location;
      title.className = 'landing-search-result-title';
      title.textContent = result.title || result.location;
      meta.className = 'landing-search-result-meta';
      meta.textContent = result.text.slice(0, 140);

      link.append(title, meta);
      item.appendChild(link);
      list.appendChild(item);
    }

    preview.hidden = false;
  };

  const run = async () => {
    const query = input.value.trim();
    if (!query) {
      lastResults = [];
      list.replaceChildren();
      hide();
      return;
    }

    try {
      render(searchDocs(await loadDocs(), query));
    } catch (error) {
      console.error(error);
      lastResults = [];
      showMessage('Search unavailable');
    }
  };

  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 100);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hide();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (lastResults[0]) {
      window.location.assign(lastResults[0].location);
    } else {
      run();
    }
  });

  document.addEventListener('click', (event) => {
    if (!form.contains(event.target)) hide();
  });
}
