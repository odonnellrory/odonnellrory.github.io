# Introduction

It uses MkDocs with Github pages to create a website.

Once this is set up, I edit the website by simply writing to a markdown file on my machine.

The files are saved locally, push them to GitHub, GitHub Actions will host the repo as a website.  [MkDocs](https://www.mkdocs.org/) will organise the Markdown files automatically into navigatable HTML.  

I plan to use this to document a lot of the projects that I have made over the last year, and any projects that I work on in the future.

Notes are in /docs/00-journal/.

---

# Installation

```zsh

    git clone https://github.com/odonnellrory/odonnellrory.github.io.git
    cd odonnellrory.github.io

```

## Host locally

### Debian (Ubuntu, Mint, etc)

You'll need python to run it locally.

```zsh

    sudo apt get update
    sudo apt install python3 python3-venv python3-pip

```

### Instructions

You are going to make a virtual environment using python, that's what python3-venv is for.

Inside this virtual environment, you will install the dependencies.

The dependencies are listed in a text file in the repo's root directory.  requirements.txt

Python will install what is listed there using pip.  That's what python3-pip is for.

```zsh

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt


```

## Run Locally

Now to run the website locally on your machine, run:

```zsh

    python -m mkdocs serve

```

Now go to [http://127.0.0.1:8000](http://127.0.0.1:8000) and there's your website.  
Here you can preview changes live.

---

# Sources

[MkDocs](https://www.mkdocs.org/) 
[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages?source=post_page--------------------------- "GitHub Pages")
[MkDocs How to Deploy](https://www.mkdocs.org/user-guide/deploying-your-docs/ "MkDocs Docs")
[MkDocs Material](https://squidfunk.github.io/mkdocs-material/publishing-your-site/ "McDoks Publishing")


