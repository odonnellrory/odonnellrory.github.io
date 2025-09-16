# Git
---

## Introduction

I've been using git for 2 years now, although admittedly most of it was during my time at Northcoders, which was 3 months long.  I couldn't be bothered to version control my projects for a while after that, but I started using it again, especially for this website.

So I think a page that will be good is just the git commands that get you out of trouble.  I wish I had written them down at northcoders, there are enough situations with git to fill a minimum of 3 sandwiches.  By this I mean re-occurring issues that you will fix once and then not see again for weeks because you fixed it already, for that project, so you don't remember how you fixed it when it happens again or you see someone else in the same situation.

---

### Git Hooks

In this websites repo, I use a git hook to recreate the installation guide under knowledge base every time I commit.   Why?  Because it's just the README file, but for the readme file to work on GitHub, that content needs to be in the root.   So I have a git hook copy the file to ```docs/01-knowledge-base/``` and rename it to ```00-installationguide.md``` every time I commit.

---
