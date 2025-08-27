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

We are going to make a virtual environment using python, that's what python3-venv is for.

Inside this virtual environment, you will install the dependencies.

The dependencies is a text file in the repo's root directory.  requirements.txt

Python will install what is listed there using pip.  That's what python3-pip is for.

```zsh

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt


```

Now to run the website locally on your machine, run:

```zsh

    python -m mkdocs serve

```

Now go to [http://127.0.0.1:8000](http://127.0.0.1:8000) and there's your website.  
Here you can preview changes live.
