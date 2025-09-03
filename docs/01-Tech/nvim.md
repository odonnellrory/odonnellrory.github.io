# NeoVim

## Introduction
---

To edit my text files I use a program called neovim.

Neovim is an evolution of Vi, the better alternative to Nano.
You should ideally not be using Nano more than once, for example, you would use Nano to ***install neovim*** on Nix. <br>
Nano is a backup for when Vi does not work or is not installed.

Anyway, sorry if I offended you, you can do a lot of cool things with Neovim; it has plugins.



### NVChad
---

Currently I use the [NVChad](https://nvchad.com/docs/quickstart/install) setup, which you too can set up instantly with this command:

```
    git clone https://github.com/NvChad/starter ~/.config/nvim && nvim

```

On some machines I have had issues with this command, usually because it relies on you having the same font installed as that guy.  Or if you've already been messing with neovim on the machine before trying to install NVChad. <br> 
But it usually works out of the box.

But it's nothing you can't overcome with a little googling.

With this, you will not just edit text, but be moving files, moving entire directories, renaming, deleting, everything you would have to leave Nano to write a command, has a shortcut or a plugin on neovim. <br>
You seldom ever have to leave.  And if you need to use the command-line, it still has you covered with the Alt-I keyboard shortcut, which will open a temporary miniature terminal in the centre of neovim.

---

### Usage

#### NerdTree

```
    Ctrl+N

```
##### NerdTree Shortcuts

In the NerdTree window you can do multiple things:

 - x: Cut 
 - c: Copy
 - p: Paste
 - o: Open

This makes it incredibly easy to re-organise repository structure and to change your current working file.

#### Terminal

```
    Alt+I

```

#### Replace Text

```

    :%s/searches/replaces

```

---
