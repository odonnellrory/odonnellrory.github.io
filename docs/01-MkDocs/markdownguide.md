# How to Write Better Notes

## Markdown

**Please Note:  MkDocs uses python-markdown.**

### "#"
```

# page name

each additional bash is a heading

##  - h2

### - h3

#### - h4

##### - h5

```

The table of contents on the right of the webpage will draw its order of hierarchy from these "#" headings.

---

### Dividers

You can create a line to divide the page with 3 consecutive hyphens.

```markdown

    ---


```

---

### Code Blocks

The code-blocks with the cool little copy buttons?
It's three backticks for the beginning, and three to mark the end of the square, like so.

```markdown
    ```
    ```
```
``` like this ```
---

### Help Boxes

You can create this monstrosity:

??? note "Button"
    They can be nested using the indentation on the current line:

    ??? note "Another Button?"    
        ```markdown 
            ??? note "Need HELP?"
                ??? note "No, seriously????"    
                    And then here is the content  
        ```


```markdown 
    ??? note "Need HELP?"
        Here is some content.
        ??? note "No, seriously????"    
            Even more content.  
```

---

### Line Break

Sometimes
your
lines
of
text
appear
as
a
big
paragraph
even though
the words are on different lines
in your file
this is because there are no line breaks.
This short paragraph was written like this, for example:

```

Sometimes
your
lines
of
text
appear
as
a
big
paragraph
even though
the words are on different lines
in your file
this is because there are no line breaks.

```

In python markdown, you can separate the lines in a paragraph, without creating a new paragraph, using:

```
    <br>

```

Example:

```
    Sometimes your lines of text <br>
    Appear as a big paragraph <br>
    Even though they should not <br>

```

Sometimes your lines of text <br>
Appear as a big paragraph <br>
Even though they should not <br>


## Sources

[| GitHub Pages ](https://docs.github.com/en/pages/getting-started-with-github-pages?source=post_page--------------------------- "GitHub Pages")
[| MkDocs ](https://www.mkdocs.org/) 
[| MkDocs Deploy ](https://www.mkdocs.org/user-guide/deploying-your-docs/ "MkDocs Docs")
[| MkDocs Material |](https://squidfunk.github.io/mkdocs-material/publishing-your-site/ "McDoks Publishing")
[Markdown Tools |](https://www.markdowntools.com/)
