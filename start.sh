#!/usr/bin/env sh
set -eu

if [ ! -f ".venv/bin/activate" ]; then
  echo "Missing .venv. Create it first (example: python -m venv .venv && .venv/bin/pip install -r requirements.txt)." >&2
  exit 1
fi

. .venv/bin/activate
python -m mkdocs serve
