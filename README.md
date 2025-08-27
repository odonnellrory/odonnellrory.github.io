# Introduction

It uses MkDocs with Github pages to create a website.

Once this is set up, I edit the website by simply writing to a markdown file on my machine.

The files are saved locally, push them to GitHub, GitHub Actions will host the repo as a website.  [MkDocs](https://www.mkdocs.org/) will organise the Markdown files automatically into navigatable HTML.  

I plan to use this to document a lot of the projects that I have made over the last year, and any projects that I work on in the future.

Notes are in /docs/00-journal/.

---

# Installation

## Debian (Ubuntu, Mint, etc)

```zsh

    git clone https://github.com/odonnellrory/odonnellrory.github.io.git
    cd odonnellrory.github.io

```

You'll need python to run it locally.

```zsh

    sudo apt get update
    sudo apt install python3 python3-venv python3-pip

```


