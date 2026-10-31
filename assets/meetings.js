(function () {
  var box = document.getElementById('meets'), F = window.FAMILY;
  if (!box || !F) return;
  F.events.filter(function (e) { return e.t === 'conference'; }).forEach(function (e) {
    var d = document.createElement('div'); d.className = 'doc'; d.style.borderInlineStartColor = 'var(--c-conference)';
    var h = document.createElement('h3'); h.textContent = e.tx + ' · ' + e.y;
    if (e.tag) { var s = document.createElement('span'); s.textContent = e.tag; s.style.cssText = 'font-family:var(--sans);font-size:13px;border:1px solid var(--c-conference);color:var(--c-conference);border-radius:999px;padding:0 9px;margin-inline-start:8px'; h.appendChild(document.createTextNode(' ')); h.appendChild(s); }
    d.appendChild(h);
    if (e.note) { var p = document.createElement('p'); p.textContent = e.note; d.appendChild(p); }
    box.appendChild(d);
  });
})();
