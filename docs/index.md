# Documentation Station.

This website uses [MkDocs](https://www.mkdocs.org/) and [GitHub Pages](https://docs.github.com/en/pages).

MkDocs takes Markdown files and automatically generates HTML based on the Markdown and sets of plugins that you install within the projects .yml files.  There is one in the root and one in .github/workflows.

Originally I created this to document my homelab, but it has become a blog with some guides on things that I find interesting.

The nav bar at the top of the site is generated based on my folder structure and the .pages files.  The .pages files, found in docs/ and each directory recursively after docs/, are where you tell MkDocs where to direct the page.

Notes are in /docs/00-journal/.

---

[Latest journal entry]({{ latest_journal_path() }})

---

[Here's tic tac toe, if you want that.](tic-tac-toe/)
