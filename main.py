from pathlib import Path
from datetime import datetime

def define_env(env):
    @env.macro
    def latest_journal_path():
        journal_dir = Path("docs/00-archive")
        files = list(journal_dir.glob("*.md"))
        if not files:
            return "00-archive/"

        dated_files = []
        for file in files:
            try:
                date_value = datetime.strptime(file.stem, "%Y-%m-%d")
                dated_files.append((date_value, file.stem))
            except ValueError:
                continue

        if dated_files:
            latest_stem = max(dated_files, key=lambda item: item[0])[1]
            return f"00-archive/{latest_stem}/"

        latest_file = max(files, key=lambda f: f.stat().st_mtime)
        return f"00-archive/{latest_file.stem}/"
