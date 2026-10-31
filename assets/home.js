/* דף הבית · numbers come from window.FAMILY (assets/data.js) */
(function () {
  'use strict';
  var F = window.FAMILY, T = F.tree;
  var grands = 0, great = 0;
  T.forEach(function (b) { grands += b.grands.length; b.grands.forEach(function (g) { great += g.kids.length; }); });
  var rows = [
    { g: 1, label: 'אברהם וסלמה', n: 2 },
    { g: 2, label: 'ילדים', n: T.length },
    { g: 3, label: 'נכדים', n: grands },
    { g: 4, label: 'נינים', n: great }
  ];
  var box = document.getElementById('gens');
  rows.forEach(function (r) {
    var d = document.createElement('div'); d.className = 'gen';
    var dots = ''; for (var i = 0; i < r.n; i++) dots += '<i class="g' + r.g + '" style="--n:' + i + ';--g:' + (r.g - 1) + '"></i>';
    d.innerHTML = '<span class="lb">' + r.label + '</span><span class="dots" aria-hidden="true">' + dots + '</span>';
    box.appendChild(d);
  });
  box.setAttribute('role', 'img');
  box.setAttribute('aria-label', 'ארבעה דורות: ' + rows.map(function (r) { return r.n + ' ' + r.label; }).join(', '));

  var ev = F.events, years = ev.map(function (e) { return e.y; });
  var conf = ev.filter(function (e) { return e.t === 'conference' && !e.postponed; });
  var setText = function (id, s) { var n = document.getElementById(id); if (n) n.textContent = s; };
  setText('st-timeline', ev.length + ' אירועים מ־' + Math.min.apply(null, years) + ' עד ' + Math.max.apply(null, years) + ', ועוד לידות של נכדים ונינים');
  setText('st-tree', T.length + ' ענפים · ' + grands + ' נכדים · ' + great + ' נינים');
  setText('st-meet', conf.map(function (e) { return e.tx + ' (' + e.y + ')'; }).join(' · '));
  setText('built', 'הנתונים עודכנו ב־' + F.built);
})();
