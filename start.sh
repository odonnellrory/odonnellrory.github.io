#!/usr/bin/env sh
set -eu

. .venv/bin/activate
python -m mkdocs serve
