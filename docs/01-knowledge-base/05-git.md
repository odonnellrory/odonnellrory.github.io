# Git

---

## Introduction

I was first introduced to Git while preparing for the Northcoders bootcamp in **February 2024**.  
During the bootcamp itself, Git was used daily for collaboration, branching, pull requests, and resolving conflicts.

After Northcoders, I stepped away from Git for a while, but returned to it properly when building and maintaining this documentation site. Managing a long-lived repository with automation, documentation, and history has pushed me beyond just basic `add`, `commit`, and `push` usage.

This page exists for one reason: **Git problems repeat, but not often enough to remember the fix**.  
You solve an issue once, don’t see it again for weeks or months, and then hit it again with no memory of how you got out last time.

This is my personal “Git survival kit”.

---

## Git Hooks

In this website’s repository, I use a **Git hook** to automate documentation.

Every time I commit:
- `README.md` is copied into the documentation tree
- It is renamed and placed under the knowledge base so MkDocs can render it

### Why do this?

- GitHub expects `README.md` to live in the repository root
- MkDocs expects documentation to live under `docs/`
- I don’t want to maintain the same content twice

A Git hook solves this cleanly.

### Example: pre-commit hook

```bash
cp README.md docs/01-knowledge-base/00-installationguide.md
git add docs/01-knowledge-base/00-installationguide.md
````

This runs automatically before every commit.

---

## Getting Out of Trouble

This is the section I wish I had written during the bootcamp.

---

### Local changes blocking a pull

**Error:**

```text
Your local changes to the following files would be overwritten by merge
```

This happens when:

* You edited a file locally
* The same file changed on the remote
* Git refuses to guess which version you want

#### Safe solution

```bash
git stash
git pull origin main
git stash pop
```

1. Temporarily saves your local changes
2. Pulls the remote changes
3. Re-applies your local edits on top

---

### Discard all local changes to a file

**Be careful — this is destructive.**

```bash
git restore path/to/file
```

Use this when:

* You don’t care about local edits
* You want the file exactly as it exists in the last commit

---

### Check what you have changed

```bash
git status
git diff
```

---

### “I committed the wrong thing”

If you haven’t pushed yet:

```bash
git reset --soft HEAD~1
```

* Removes the last commit
* Keeps the changes staged

---

### “I pushed something bad”

* **Do not force push**
* Create a new commit that fixes the mistake

