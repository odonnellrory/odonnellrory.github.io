<div class="landing-root">
  <h1 class="landing-title">DOCUMENTATION STATION</h1>
  <section class="landing-hero">
    <a class="landing-kicker landing-kicker-link" href="about/">RORY O'DONNELL</a>
    <div class="landing-topbar">
      <form class="landing-search" action="#" method="get" role="search" aria-label="Search docs">
        <label class="landing-search-label" for="landing-search-input">Search the docs</label>
        <div class="landing-search-row">
          <input
            id="landing-search-input"
            class="landing-search-input"
            name="q"
            type="search"
            placeholder="Search Blog..."
            autocomplete="off"
            required
          >
          <button class="landing-search-button" type="submit">Search</button>
        </div>
        <div class="landing-search-preview" hidden>
          <ul class="landing-search-results" aria-label="Search suggestions"></ul>
        </div>
      </form>
      <div class="landing-social-row" aria-label="Social links">
        <a class="landing-social-link landing-social-link-primary" href="{{ latest_journal_path() }}">Latest Journal</a>
        <a class="landing-social-link" href="about/">About Me</a>
        <a class="landing-social-link" href="https://github.com/odonnellrory" target="_blank" rel="noopener">GitHub</a>
        <a class="landing-social-link" href="https://www.linkedin.com/in/rory-o-donnell-504980184/" target="_blank" rel="noopener">LinkedIn</a>
        <a class="landing-social-link" href="https://github.com/odonnellrory/odonnellrory.github.io" target="_blank" rel="noopener">Repository</a>
      </div>
    </div>
  </section>

  <section class="landing-panels" aria-label="Core sections">
    <a class="landing-panel" href="01-docs/00-installationguide/">
      <h2>Docs</h2>
      <p>Linux, Git, Docker, networking...</p>
    </a>

    <a class="landing-panel" href="02-cybersecurity/01-brutus/">
      <h2>Security</h2>
      <p>Hack The Box walkthroughs.</p>
    </a>

    <a class="landing-panel" href="{{ latest_journal_path() }}">
      <h2>Blog</h2>
      <p>Homelab notes, AI responses, blog journal.</p>
    </a>

    <a class="landing-panel" href="tic-tac-toe/">
      <h2>Tic Tac Toe</h2>
      <p>A browser game I made in JavaScript.</p>
    </a>
  </section>
</div>
