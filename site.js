// WarHead Gaming — small helpers for every page. The site works without this file;
// it only adds the phone menu, the lineup filters and the copy buttons.
(function () {
  // Phone menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && nav.classList.contains('open')) btn.click();
    });
  }

  // Lineup filters. Each card in #lineup has data-type ("game" or "app") and
  // data-status ("out", "soon", "dev" or "later"). Filter buttons are only shown
  // for types and statuses that at least one card has, so adding a card is all
  // it takes for a new filter to appear.
  var lineup = document.getElementById('lineup');
  var filters = document.getElementById('filters');
  if (lineup && filters) {
    var cards = Array.prototype.slice.call(lineup.querySelectorAll('.card[data-type]'));
    var slot = lineup.querySelector('.card.slot');
    var empty = document.getElementById('lineup-empty');
    var pick = { type: 'all', status: 'all' };
    var groups = {
      type: { label: 'Show', order: [['all', 'Everything'], ['game', 'Games'], ['app', 'Apps']] },
      status: { label: 'Status', order: [['all', 'Any'], ['out', 'Out now'], ['review', 'Awaiting approval'], ['soon', 'Coming soon'], ['dev', 'In development'], ['later', 'Coming later']] }
    };
    var used = { type: {}, status: {} };
    cards.forEach(function (c) { used.type[c.dataset.type] = 1; used.status[c.dataset.status] = 1; });

    Object.keys(groups).forEach(function (key) {
      var choices = groups[key].order.filter(function (o) { return o[0] === 'all' || used[key][o[0]]; });
      if (choices.length < 3) return; // one real choice is not a filter
      var row = document.createElement('div');
      row.className = 'chip-row';
      row.setAttribute('role', 'group');
      row.setAttribute('aria-label', groups[key].label);
      var lab = document.createElement('span');
      lab.className = 'label';
      lab.textContent = groups[key].label;
      row.appendChild(lab);
      choices.forEach(function (o) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip';
        b.textContent = o[1];
        b.setAttribute('aria-pressed', o[0] === 'all' ? 'true' : 'false');
        b.addEventListener('click', function () {
          pick[key] = o[0];
          row.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          apply();
        });
        row.appendChild(b);
      });
      filters.appendChild(row);
    });

    var apply = function () {
      var shown = 0;
      cards.forEach(function (c) {
        var ok = (pick.type === 'all' || c.dataset.type === pick.type) && (pick.status === 'all' || c.dataset.status === pick.status);
        c.hidden = !ok;
        if (ok) shown++;
      });
      if (slot) slot.hidden = !(pick.type === 'all' && pick.status === 'all');
      if (empty) empty.hidden = shown > 0;
    };
  }

  // Copy buttons next to email addresses
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.hidden = false;
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () { var t = b.textContent; b.textContent = 'Copied'; setTimeout(function () { b.textContent = t; }, 1600); };
      var fallback = function () {
        var el = b.parentElement.querySelector('.email');
        if (!el) return;
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
        b.textContent = 'Press Ctrl+C';
      };
      try {
        navigator.clipboard.writeText(text).then(done, fallback);
      } catch (e) { fallback(); }
    });
  });
})();
