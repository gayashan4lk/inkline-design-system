#!/usr/bin/env python3
"""Check that tokens.css still matches tokens.json, and that the CSS only uses defined tokens.

tokens.css is generated from tokens.json, so the two must agree on every color (both
themes, including the prefers-color-scheme fallback), shadow, spacing, radius, stroke,
font family and type style. Every var(--name) in tokens.css and components/bundle.css
must also be declared somewhere, so a renamed token can't silently break a component.

Usage: python3 scripts/check_tokens.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSS_FILES = ['tokens.css', 'components/bundle.css']


def read_css(path):
    return re.sub(r'/\*.*?\*/', '', (ROOT / path).read_text(), flags=re.S)


def declarations(css, selector):
    """Custom properties in the first rule whose selector is exactly `selector`, or None."""
    for sel, body in re.findall(r'([^{}]+)\{([^{}]*)\}', css):
        if sel.strip() == selector:
            return {k: v.strip() for k, v in re.findall(r'--([\w-]+)\s*:\s*([^;]+);', body)}
    return None


def compare(label, expected, actual, problems):
    for name in sorted(expected.keys() - actual.keys()):
        problems.append(f'{label}: --{name} is in tokens.json but missing from tokens.css')
    for name in sorted(actual.keys() - expected.keys()):
        problems.append(f'{label}: --{name} is in tokens.css but not in tokens.json')
    for name in sorted(expected.keys() & actual.keys()):
        if expected[name] != actual[name]:
            problems.append(f'{label}: --{name} is {actual[name]!r} in tokens.css, {expected[name]!r} in tokens.json')


def css_value(value):
    # "{ink}" in tokens.json is an alias, written var(--ink) in CSS.
    return re.sub(r'^\{([\w-]+)\}$', r'var(--\1)', value)


def main():
    tokens = json.loads((ROOT / 'tokens.json').read_text())
    css = read_css('tokens.css')
    problems = []

    # Colors and the shadow: one value per theme.
    themed = tokens['color']['tokens'] + tokens['shadow']['tokens']
    expected = {'light': {}, 'dark': {}}
    for token in themed:
        for theme in expected:
            if theme not in token['value']:
                problems.append(f"tokens.json: {token['name']} has no {theme} value")
            else:
                expected[theme][token['name']] = css_value(token['value'][theme])
    blocks = [
        ('light theme', ':root, [data-theme="light"]', 'light'),
        ('dark theme', '[data-theme="dark"]', 'dark'),
        ('dark theme (prefers-color-scheme)', ':root:not([data-theme="light"])', 'dark'),
    ]
    for label, selector, theme in blocks:
        actual = declarations(css, selector)
        if actual is None:
            problems.append(f'tokens.css: no rule for `{selector}` ({label})')
        else:
            compare(label, expected[theme], actual, problems)

    # Spacing, radii, strokes and font families: one value each, in the plain :root rule.
    scales = {t['name']: t['value'] for group in ('spacing', 'radius', 'stroke') for t in tokens[group]['tokens']}
    scales.update({'font-' + name: stack for name, stack in tokens['type']['families'].items()})
    actual = declarations(css, ':root')
    if actual is None:
        problems.append('tokens.css: no plain `:root` rule for the scales')
    else:
        compare('scales', scales, actual, problems)

    # Type styles: one class per style.
    styles = 0
    for group in tokens['type']['groups']:
        for style in group['styles']:
            styles += 1
            m = re.search(r'(?:^|\s)\.' + re.escape(style['name']) + r'\s*\{([^}]*)\}', css)
            if not m:
                problems.append(f".{style['name']}: type style missing from tokens.css")
                continue
            props = {k: v.strip() for k, v in re.findall(r'([\w-]+)\s*:\s*([^;]+);', m.group(1))}
            want = {
                'font-family': f"var(--font-{group['family']})",
                'font-size': style['fontSize'],
                'line-height': style['lineHeight'],
                'font-weight': str(style['fontWeight']),
            }
            if 'letterSpacing' in style:
                want['letter-spacing'] = style['letterSpacing']
            if props != want:
                problems.append(f".{style['name']}: tokens.css has {props}, tokens.json says {want}")

    drift = len(problems)

    # Every var(--name) used must be declared somewhere.
    sheets = {path: read_css(path) for path in CSS_FILES}
    defined = set()
    for text in sheets.values():
        defined |= set(re.findall(r'(--[\w-]+)\s*:', text))
    for path, text in sheets.items():
        for name in sorted(set(re.findall(r'var\(\s*(--[\w-]+)', text)) - defined):
            problems.append(f'{path}: uses var({name}), which no stylesheet declares')

    if problems:
        print(f'Token check failed ({len(problems)} problem{"s" if len(problems) > 1 else ""}):', file=sys.stderr)
        for problem in problems:
            print('  - ' + problem, file=sys.stderr)
        if drift:
            print('Regenerate tokens.css from tokens.json rather than editing it by hand.', file=sys.stderr)
        return 1
    print(f'OK: {len(themed)} themed tokens x 2 themes, {len(scales)} scale tokens, {styles} type styles; '
          f'every var() in {", ".join(CSS_FILES)} is defined.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
