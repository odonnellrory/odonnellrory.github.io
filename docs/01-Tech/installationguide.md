# Installation Guide

This webpage uses [MkDocs](https://www.mkdocs.org/) and [GitHub Pages](https://docs.github.com/en/pages).

MkDocs takes Markdown files and automatically generates HTML based on the Markdown and sets of plugins that you install within the projects .yml files.  There is one in the root and one in .github/workflows.

Originally I created this to document my homelab, but it has become a blog with some guides on things that I find interesting.

The nav bar at the top of the site is generated based on my folder structure and the .pages files.  The .pages files, found in docs/ and each directory recursively after docs/, are where you tell MkDocs where to direct the page.

Notes are in /docs/00-journal/.

---

## Installation
I am going to assume you want your own version that does not have my stuff in it, I will write this installation guide so that you can do that and have your own MkDocs site up and running very quickly.


```zsh

    git clone https://github.com/odonnellrory/odonnellrory.github.io.git
    cd odonnellrory.github.io

```

This gives you a local copy of the entire repository.  

You can skip to the end now if you want to run my website with my stuff in it.


```zsh
   rm -rf .git 

```

This will disconnect your copy of the website from my GitHub pages remote host.

I'm not going to get into git or GitHub in this installation guide but I would recommend making your own repo or forking mine to push these changes to it.

Delete everything in docs/ except for index.md and .pages files.

index.md is the landing page.
.pages is for a plugin that is installed, which can order and sort pages.


## Hosting
---

###  Python

You are going to make a virtual environment using python, that's what python3-venv is for.

Inside this virtual environment, you will install the dependencies.

The dependencies are listed in a text file in the repo's root directory.  requirements.txt

Python will install what is listed there using pip.  That's what python3-pip is for.

#### Installing Python, Venv, and Pip

---

##### Arch (Endeavour, Manjaro, etc)

```zsh

    sudo pacman -Syu python python-pip 

```

##### Debian (Ubuntu, Mint, etc)

```zsh

    sudo apt update
    sudo apt install python3 python3-venv python3-pip

```

##### RHEL (Fedora, Rocky, etc)

```
    sudo dnf install python3 python3-pip

```

---


#### Setting up the Virtual Environment

This command will enter you into the virtual environment and then use pip to install MkDocs and others.

```source .venv/bin/activate``` is the exact command that enters you into the python virtual environment, if you try to run the server without having done this first, it will not work.

```zsh

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt

```

---

###   Localhost

Now to run the webpage locally on your machine:

```zsh

    source .venv/bin/activate
    python -m mkdocs serve

```

Now go to [http://127.0.0.1:8000](http://127.0.0.1:8000) and there's your website.  
Here you can preview changes live.

To make that into a function you can use to start the server, put the following into your rc file.

If you have not changed your shell, then that is most likely going to be ``` ~/.bashrc```.

```
    
startdocs() {

    cd ~/odonnellrory.github.io
    source .venv/bin/activate
    python -m mkdocs serve

}

```
Save that inside the file and then source your rc file.
(```source ~/.bashrc``` if using bash)


###   Private Network

To host the webpage across your network:

```
    cd ~/odonnellrory.github.io
    source .venv/bin/activate
    python -m mkdocs serve --dev-adr=your.ip.address.here:8000

```

Ensure that your firewall is allowing traffic on that port.

```
    sudo ufw status verbose

```

This will tell you your current firewall settings.
If it says ufw is not found or is not turned on, then install it and run:

```
    sudo systemctl enable ufw
    sudo systemctl start ufw

```

Now your firewall will run on startup.

The port for the webpage is 8000
The port for SSH is 22

ufw's syntax is very simple.  Here's my attempt at a cheat sheet on how to use it:

```
    sudo ufw deny/allow   port-number/protocol 
             status       verbose
             default      deny/allow  port-number/protocol
             
```

---
