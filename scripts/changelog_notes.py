#!/usr/bin/env python3
"""Print one version's CHANGELOG.md entry, to use as its GitHub release notes.

The entry is everything under "## <version> — <date>" up to the next "## " heading,
without the heading itself (the release title carries the version).

Usage: python3 scripts/changelog_notes.py v1.1.2 > notes.md   (the leading "v" is optional)
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main(argv):
    if len(argv) != 2:
        print(__doc__, file=sys.stderr)
        return 2
    version = argv[1][1:] if argv[1].startswith('v') else argv[1]
    changelog = (ROOT / 'CHANGELOG.md').read_text()
    m = re.search(r'^## ' + re.escape(version) + r' — .*?\n(.*?)(?=^## |\Z)', changelog, re.M | re.S)
    if not m:
        print(f'CHANGELOG.md has no "## {version} — YYYY-MM-DD" entry.', file=sys.stderr)
        return 1
    notes = m.group(1).strip()
    if not notes:
        print(f'The CHANGELOG.md entry for {version} is empty.', file=sys.stderr)
        return 1
    print(notes)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
