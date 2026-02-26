<div class="landing-root">
  <div class="landing-shell" aria-label="Landing overview">
    <section class="landing-hero-panel">
      <a class="landing-kicker landing-kicker-link" href="about/">RORY O'DONNELL</a>
      <h1 class="landing-title">BASILICA KNOWLEDGE BASE</h1>
      <p class="landing-intro">
        Practical notes on support engineering, Linux operations, networking, and security labs.
        Browse docs, jump to walkthroughs, or search the entire site from one place.
      </p>

      <div class="landing-topbar">
        <form class="landing-search" action="#" method="get" role="search" aria-label="Search docs">
          <label class="landing-search-label" for="landing-search-input">Search the docs</label>
          <div class="landing-search-row">
            <input
              id="landing-search-input"
              class="landing-search-input"
              name="q"
              type="search"
              placeholder="Search docs, blog, and projects"
              autocomplete="off"
              required
            >
            <button class="landing-search-button" type="submit">Search</button>
          </div>
          <div class="landing-search-preview" hidden>
            <ul class="landing-search-results" aria-label="Search suggestions"></ul>
          </div>
        </form>

        <div class="landing-social-row" aria-label="Primary links">
          <a class="landing-social-link landing-social-link-primary" href="{{ latest_journal_path() }}">Latest Journal</a>
          <a class="landing-social-link" href="about/">About Me</a>
          <a class="landing-social-link" href="https://github.com/odonnellrory" target="_blank" rel="noopener">GitHub</a>
          <a class="landing-social-link" href="https://www.linkedin.com/in/rory-o-donnell-504980184/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </section>

    <aside class="landing-aside" aria-label="Current highlights">
      <h2 class="landing-aside-title">Current Focus</h2>
      <ul class="landing-aside-list">
        <li>Service desk workflows and endpoint lifecycle operations</li>
        <li>Homelab reliability, monitoring, and containerized services</li>
        <li>Security training labs and walkthrough documentation</li>
      </ul>
      <a class="landing-aside-cta" href="https://github.com/odonnellrory/odonnellrory.github.io" target="_blank" rel="noopener">Browse Repository</a>
    </aside>
  </div>

  <section class="landing-feature-rail" aria-label="Fast navigation">
    <a class="landing-feature" href="01-docs/00-installationguide/">
      <p class="landing-feature-label">Foundation</p>
      <h2>Linux and Tooling Docs</h2>
      <p>Install guides, command references, and practical runbooks.</p>
    </a>
    <a class="landing-feature" href="02-cybersecurity/01-brutus/">
      <p class="landing-feature-label">Security</p>
      <h2>Lab Walkthroughs</h2>
      <p>Hands-on notes from Hack The Box and related exercises.</p>
    </a>
    <a class="landing-feature" href="{{ latest_journal_path() }}">
      <p class="landing-feature-label">Journal</p>
      <h2>Latest Build Log</h2>
      <p>Recent updates, experiments, and infrastructure changes.</p>
    </a>
  </section>

  <section class="landing-panels" aria-label="Core sections">
    <a class="landing-panel" href="01-docs/00-installationguide/">
      <p class="landing-panel-index">01</p>
      <h2>Documentation</h2>
      <p>Linux, Docker, Git, networking, and operating system setup notes.</p>
    </a>

    <a class="landing-panel" href="02-cybersecurity/01-brutus/">
      <p class="landing-panel-index">02</p>
      <h2>Cybersecurity</h2>
      <p>Hands-on analysis and writeups from security challenge labs.</p>
    </a>

    <a class="landing-panel" href="{{ latest_journal_path() }}">
      <p class="landing-panel-index">03</p>
      <h2>Blog Journal</h2>
      <p>Daily snapshots from support work, projects, and homelab improvements.</p>
    </a>

    <a class="landing-panel" href="tic-tac-toe/">
      <p class="landing-panel-index">04</p>
      <h2>Tic Tac Toe</h2>
      <p>A browser-based JavaScript game project hosted in this site.</p>
    </a>
  </section>
</div>
