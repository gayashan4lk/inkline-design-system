/* @ds-bundle: {"format":4,"namespace":"Inkline","components":[{"name":"Button"},{"name":"Card"},{"name":"StatTile"},{"name":"Input"},{"name":"Tag"},{"name":"Avatar"},{"name":"CommentThread"},{"name":"MediaControls"},{"name":"Icon"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }
  function omit(p, keys) {
    var o = {};
    for (var k in p) if (Object.prototype.hasOwnProperty.call(p, k) && keys.indexOf(k) < 0) o[k] = p[k];
    return o;
  }
  function clamp(n) { return Math.max(0, Math.min(1, n)); }

  var PATHS = {
    play: ['M7.5 4.8v14.4L19 12z'],
    pause: ['M8.5 5v14', 'M15.5 5v14'],
    restart: ['M4.6 12a7.4 7.4 0 1 0 2.2-5.3', 'M4.6 4.4v4.4H9'],
    comment: ['M4 5h16v11h-8.5L6.5 20v-4H4z', 'M12 7.8v5.4', 'M9.3 10.5h5.4'],
    volume: ['M4 9.5h3.5L12 6v12l-4.5-3.5H4z', 'M15.5 9.5a3.5 3.5 0 0 1 0 5', 'M18 7a7 7 0 0 1 0 10'],
    download: ['M12 4v11', 'M7.5 10.5 12 15l4.5-4.5', 'M5 20h14'],
    expand: ['M14 4h6v6', 'M20 4l-6.5 6.5', 'M10 20H4v-6', 'M4 20l6.5-6.5'],
    sidebar: ['M4 5h16v14H4z', 'M14.5 5v14'],
    check: ['M6.5 12.5l3.5 3.5 7.5-8'],
    plus: ['M12 5v14', 'M5 12h14'],
    close: ['M6 6l12 12', 'M18 6 6 18'],
    search: ['M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z', 'M15.5 15.5 20 20'],
    more: ['M5.5 12h.01', 'M12 12h.01', 'M18.5 12h.01']
  };

  function Icon(props) {
    var size = props.size || 20;
    var d = PATHS[props.name] || [];
    var rest = omit(props, ['name', 'size', 'strokeWidth', 'title', 'className']);
    var a11y = props.title ? { role: 'img', 'aria-label': props.title } : { 'aria-hidden': 'true' };
    return h('svg', Object.assign({
      className: cx('ik-icon', props.className), width: size, height: size, viewBox: '0 0 24 24',
      fill: 'none', stroke: 'currentColor', strokeWidth: props.strokeWidth || 2,
      strokeLinecap: 'round', strokeLinejoin: 'round', focusable: 'false'
    }, a11y, rest), d.map(function (p, i) { return h('path', { key: i, d: p }); }));
  }
  Icon.names = Object.keys(PATHS);

  function Button(props) {
    var variant = props.variant || 'primary';
    var size = props.size || 'md';
    var hasLabel = props.children != null && props.children !== false;
    var iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
    var rest = omit(props, ['variant', 'size', 'icon', 'iconAfter', 'className', 'children']);
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: cx('ik-btn', 'ik-btn--' + variant, 'ik-btn--' + size, !hasLabel && props.icon && 'ik-btn--icon', props.className)
    }),
      props.icon ? h(Icon, { name: props.icon, size: iconSize }) : null,
      hasLabel ? h('span', { className: 'ik-btn__label' }, props.children) : null,
      props.iconAfter ? h(Icon, { name: props.iconAfter, size: iconSize }) : null);
  }

  function Card(props) {
    var rest = omit(props, ['tone', 'padding', 'caption', 'interactive', 'className', 'children', 'as', 'onClick', 'tabIndex', 'role']);
    var tag = props.as === 'button' || props.as === 'a' ? 'div' : (props.as || 'div');
    var card = h(tag, Object.assign({}, rest, {
      className: cx('ik-card', 'ik-tone--' + (props.tone || 'paper'), 'ik-card--pad-' + (props.padding || 'md'), props.className)
    }), props.children);
    if (props.caption == null) return card;
    return h('figure', { className: 'ik-card-frame' },
      h('figcaption', { className: 'ik-card__caption' }, props.caption), card);
  }

  function StatTile(props) {
    var rest = omit(props, ['label', 'value', 'tone', 'className']);
    return h(Card, Object.assign({}, rest, { tone: props.tone || 'lilac', className: cx('ik-stat', props.className) }),
      h('div', { className: 'ik-stat__label' }, props.label),
      h('div', { className: 'ik-stat__value' }, props.value));
  }

  function Input(props) {
    var autoId = React.useId ? React.useId() : 'ik-input';
    var id = props.id || autoId;
    var msg = props.error || props.hint;
    var msgId = id + '-msg';
    var rest = omit(props, ['label', 'hint', 'error', 'className', 'id']);
    return h('div', { className: cx('ik-field', props.error && 'ik-field--error', props.className) },
      props.label ? h('label', { className: 'ik-field__label', htmlFor: id }, props.label) : null,
      h('input', Object.assign({
        className: 'ik-input', id: id,
        'aria-invalid': props.error ? 'true' : undefined,
        'aria-describedby': msg ? msgId : undefined
      }, rest)),
      msg ? h('p', { className: 'ik-field__msg', id: msgId }, msg) : null);
  }

  function Tag(props) {
    var rest = omit(props, ['tone', 'className', 'children']);
    return h('span', Object.assign({}, rest, {
      className: cx('ik-tag', 'ik-tag--' + (props.tone || 'stone'), props.className)
    }), props.children);
  }

  function Avatar(props) {
    var name = props.name || '';
    var initial = props.initial || name.trim().charAt(0).toUpperCase();
    var rest = omit(props, ['name', 'initial', 'tone', 'size', 'ring', 'className']);
    return h('span', Object.assign({ role: 'img', 'aria-label': name || initial }, rest, {
      className: cx('ik-avatar', 'ik-avatar--' + (props.size || 'md'), 'ik-tone--' + (props.tone || 'periwinkle'), props.className)
    }), h('span', { 'aria-hidden': 'true' }, initial));
  }

  function CommentThread(props) {
    var comments = props.comments || [];
    var resolved = !!props.resolved;
    var title = props.title || 'Comment';
    return h('section', { className: cx('ik-thread', resolved && 'ik-thread--resolved', props.className), 'aria-label': title },
      h('header', { className: 'ik-thread__head' },
        h('span', { className: 'ik-thread__title' }, title),
        props.resolvable === false ? null : h('button', {
          type: 'button', className: 'ik-thread__resolve', 'aria-pressed': resolved ? 'true' : 'false',
          'aria-label': resolved ? 'Reopen thread' : 'Resolve thread', onClick: props.onResolve
        }, h(Icon, { name: 'check', size: 16, strokeWidth: 2.25 }))),
      h('ol', { className: 'ik-thread__list' }, comments.map(function (c, i) {
        return h('li', { key: c.id || i, className: 'ik-comment' },
          h('div', { className: 'ik-comment__meta' },
            h(Avatar, { name: c.author, initial: c.initial, tone: c.tone || 'periwinkle', size: 'sm', 'aria-hidden': 'true' }),
            h('span', { className: 'ik-comment__author' }, c.author),
            c.time ? h('span', { className: 'ik-comment__time' }, c.time) : null),
          h('div', { className: 'ik-comment__body' }, c.body));
      })),
      props.children ? h('div', { className: 'ik-thread__foot' }, props.children) : null);
  }

  var ACTION_LABELS = { comment: 'Add comment', volume: 'Volume', download: 'Download', expand: 'Full screen', sidebar: 'Toggle side panel' };

  function MediaControls(props) {
    var segs = props.segments && props.segments.length ? props.segments : [1];
    var total = segs.reduce(function (a, b) { return a + b; }, 0);
    var p = clamp(props.progress || 0);
    var actions = props.actions || ['comment', 'volume', 'download', 'expand'];
    var start = 0;
    function act(name) { return props.onAction ? function () { props.onAction(name); } : undefined; }
    function seek(e) {
      if (!props.onSeek) return;
      var r = e.currentTarget.getBoundingClientRect();
      props.onSeek(clamp((e.clientX - r.left) / r.width));
    }
    function key(e) {
      if (!props.onSeek) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); props.onSeek(clamp(p + 0.05)); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); props.onSeek(clamp(p - 0.05)); }
    }
    return h('div', { className: cx('ik-media', props.className), role: 'group', 'aria-label': props.label || 'Media controls' },
      h(Button, { variant: 'ghost', icon: props.playing ? 'pause' : 'play', 'aria-label': props.playing ? 'Pause' : 'Play', onClick: props.onPlayToggle }),
      h(Button, { variant: 'ghost', icon: 'restart', 'aria-label': 'Restart', onClick: props.onRestart }),
      h('div', {
        className: 'ik-track', role: 'slider', tabIndex: 0, 'aria-label': 'Seek',
        'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(p * 100),
        'aria-valuetext': props.valueText, onClick: seek, onKeyDown: key
      },
        segs.map(function (w, i) {
          var f = clamp((p * total - start) / w);
          start += w;
          return h('span', { key: i, className: 'ik-seg', style: { flexGrow: w } },
            h('span', { className: 'ik-seg__fill', style: { width: (f * 100) + '%' } }));
        }),
        h('span', { className: 'ik-track__thumb', style: { left: (p * 100) + '%' } })),
      actions.map(function (a) {
        return h(Button, { key: a, variant: 'ghost', icon: a, 'aria-label': ACTION_LABELS[a] || a, onClick: act(a) });
      }),
      props.panelToggle === false ? null : h('span', { className: 'ik-media__divider', 'aria-hidden': 'true' }),
      props.panelToggle === false ? null : h(Button, { variant: 'ghost', icon: 'sidebar', 'aria-label': ACTION_LABELS.sidebar, onClick: act('sidebar') }));
  }

  // Theme: follow the OS unless <html data-theme> is set; setTheme('light' | 'dark' | 'system') switches.
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var followingSystem = false;
  var appliedBySystem = null;
  function systemTheme() { return mq && mq.matches ? 'dark' : 'light'; }
  function applySystem() {
    appliedBySystem = systemTheme();
    root.setAttribute('data-theme', appliedBySystem);
  }
  function onSystemChange() {
    if (followingSystem && root.getAttribute('data-theme') === appliedBySystem) applySystem();
  }
  function setTheme(theme) {
    if (theme === 'light' || theme === 'dark') { followingSystem = false; root.setAttribute('data-theme', theme); }
    else { followingSystem = true; applySystem(); }
  }
  if (mq) {
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }
  if (!root.hasAttribute('data-theme')) setTheme('system');

  var api = { Button: Button, Card: Card, StatTile: StatTile, Input: Input, Tag: Tag, Avatar: Avatar, CommentThread: CommentThread, MediaControls: MediaControls, Icon: Icon, setTheme: setTheme };
  window.Inkline = Object.assign(window.Inkline || {}, api);
})();
