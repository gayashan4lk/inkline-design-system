#!/usr/bin/env python3
"""Check that every place that states Inkline's version agrees.

The version appears on the "Current version" line of CHANGELOG.md, in the heading of
its latest entry ("## 1.1.2 — 2026-10-19"), and on the first "**Version x.y.z**" line of
README.md and BRAND.md. An "## Unreleased" section above the latest entry is allowed.

Usage:
  python3 scripts/check_versions.py           # the version lines agree with each other
  python3 scripts/check_versions.py v1.1.3    # ...and with this tag (the leading "v" is optional)

Prints the version on success; problems go to stderr with exit status 1.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SEMVER = r'\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?'


def latest_entry(changelog):
    """Version of the first "## <digit>…" heading, or an error message."""
    for heading in re.findall(r'^## (.+?)\s*$', changelog, re.M):
        if not heading[0].isdigit():
            continue  # "How Inkline is versioned", "Unreleased"
        m = re.fullmatch(r'(' + SEMVER + r') — \d{4}-\d{2}-\d{2}', heading)
        if not m:
            return None, f'latest CHANGELOG.md heading "## {heading}" should read "## x.y.z — YYYY-MM-DD"'
        return m.group(1), None
    return None, 'CHANGELOG.md has no "## x.y.z — YYYY-MM-DD" entry'


def main(argv):
    if len(argv) > 2:
        print(__doc__, file=sys.stderr)
        return 2
    changelog = (ROOT / 'CHANGELOG.md').read_text()
    problems = []
    found = {}

    m = re.search(r'^Current version: \*\*(' + SEMVER + r')\*\*', changelog, re.M)
    found['CHANGELOG.md "Current version" line'] = m and m.group(1)
    version, error = latest_entry(changelog)
    if error:
        problems.append(error)
    found['CHANGELOG.md latest entry'] = version
    for name in ('README.md', 'BRAND.md'):
        m = re.search(r'^\*\*Version (' + SEMVER + r')\*\*', (ROOT / name).read_text(), re.M)
        found[name + ' "**Version**" line'] = m and m.group(1)

    for where, value in found.items():
        if value is None and not (where.endswith('latest entry') and error):
            problems.append(f'{where}: no version found')
    versions = {v for v in found.values() if v}
    if len(versions) > 1:
        problems.append('versions disagree: ' + '; '.join(f'{where} = {v}' for where, v in found.items() if v))
    if len(argv) == 2:
        wanted = argv[1][1:] if argv[1].startswith('v') else argv[1]
        if not re.fullmatch(SEMVER, wanted):
            problems.append(f'"{argv[1]}" is not a version like v1.2.3')
        elif versions and versions != {wanted}:
            problems.append(f'the tag says {wanted}, but the files say {", ".join(sorted(versions))}')

    if problems:
        for problem in problems:
            print('Version check failed: ' + problem, file=sys.stderr)
        return 1
    print(versions.pop())
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
