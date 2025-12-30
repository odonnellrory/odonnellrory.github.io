from pathlib import Path

def define_env(env):
    @env.macro
    def latest_journal_path():
        files = sorted(Path("docs/00-journal").glob("*.md"))
        return f"00-journal/{files[-1].name}" if files else "00-journal/"
