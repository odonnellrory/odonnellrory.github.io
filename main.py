from datetime import datetime
from pathlib import Path

BLOG_DIR = Path("docs/00-blog")
DATE_FORMAT = "%Y-%m-%d"
BLOG_ROUTE_PREFIX = "00-blog"


def _stem_to_date(stem: str):
    try:
        return datetime.strptime(stem, DATE_FORMAT)
    except ValueError:
        return None


def _latest_blog_stem(files):
    dated_stems = [(parsed, file.stem) for file in files if (parsed := _stem_to_date(file.stem))]
    if dated_stems:
        return max(dated_stems, key=lambda item: item[0])[1]
    return max(files, key=lambda file: file.stat().st_mtime).stem


def define_env(env):
    @env.macro
    def latest_journal_path():
        files = tuple(BLOG_DIR.glob("*.md"))
        if not files:
            return f"{BLOG_ROUTE_PREFIX}/"
        return f"{BLOG_ROUTE_PREFIX}/{_latest_blog_stem(files)}/"
