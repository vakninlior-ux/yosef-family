/* עץ משפחה · reads window.FAMILY. Two views of the same data: a tree diagram and a list. */
(function () {
  'use strict';
  var F = window.FAMILY, TREE = F.tree, EV = F.events;
  var q = document.getElementById('q'), sumEl = document.getElementById('tree-sum');

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function spLabel(g) { return g === 'F' ? 'בת הזוג' : g === 'M' ? 'בן הזוג' : 'בן/בת זוג'; }
  function zl(s) { return esc(s).split('ז&quot;ל').join('<span class="dec">ז״ל</span>'); }
  function norm(s) { return s.replace(/["״׳']/g, '').replace(/\s+/g, ' ').trim(); }
  var DEAD = /ז"ל/;

  var nGrand = 0, nGreat = 0;
  TREE.forEach(function (b) { nGrand += b.grands.length; b.grands.forEach(function (g) { nGreat += g.kids.length; }); });
  var total = TREE.length + ' ענפים · ' + nGrand + ' נכדים · ' + nGreat + ' נינים רשומים בגיליון';
  sumEl.textContent = total;

  /* ================= tree diagram ================= */
  var tr = document.getElementById('tr'), box = document.getElementById('treebox');
  function years(b, d) { return b ? (d ? b + '–' + d : String(b)) : ''; }
  function pbox(name, yrs, o) {
    o = o || {};
    var d = document.createElement('div');
    var gc = o.gender === 'M' ? ' male' : (o.gender === 'F' ? ' female' : '');
    d.className = 'pb' + (o.sp ? ' sp' : '') + ((DEAD.test(name) || o.dead) ? ' dead' : '') + (o.x ? ' xx' : '') + gc;
    if (o.title) d.title = o.title;
    d.innerHTML = '<div class="n">' + zl(name) + '</div>' + (yrs ? '<div class="y">' + esc(yrs) + '</div>' : '') + (o.extra ? '<div class="m">' + esc(o.extra) + '</div>' : '');
    d.setAttribute('data-t', norm(name + ' ' + (o.title || '')));
    return d;
  }
  function node(g, boxes) {
    var n = document.createElement('div'); n.className = 'nd'; n.setAttribute('data-g', g);
    boxes.forEach(function (b, i) { if (i) { var l = document.createElement('span'); l.className = 'link'; n.appendChild(l); } n.appendChild(b); });
    return n;
  }
  var lis = [];
  function setTg(li) {
    var t = li.querySelector(':scope > .nd > .tg'); if (!t) return;
    var col = li.classList.contains('collapsed');
    t.textContent = col ? '+' + li.getAttribute('data-n') : '−';
    t.setAttribute('aria-expanded', String(!col));
  }
  function item(nd, kids, count, open) {
    var li = document.createElement('li'); li.appendChild(nd);
    if (kids.length) {
      var ul = document.createElement('ul'); kids.forEach(function (k) { ul.appendChild(k); }); li.appendChild(ul);
      var tg = document.createElement('button'); tg.type = 'button'; tg.className = 'tg'; tg.setAttribute('aria-label', 'פתיחה או סגירה של הענף');
      nd.appendChild(tg); li.setAttribute('data-n', count); li.classList.add('has'); if (!open) li.classList.add('collapsed');
      tg.addEventListener('click', function () { li.classList.toggle('collapsed'); setTg(li); });
      lis.push(li); setTg(li);
    }
    return li;
  }

  /* the founding couple: the two earliest births in the "SAVE THE DATE" events */
  var births = EV.filter(function (e) { return e.t === 'birth'; }).sort(function (a, b) { return a.y - b.y; });
  function founder(e) {
    var name = e.tx.replace(/\s*נולדה?\s*$/, '');
    var d = EV.filter(function (x) { return x.t === 'death' && x.tx.split(' ')[0] === e.tx.split(' ')[0]; })[0];
    return pbox(name, years(e.y, d && d.y), { title: name });
  }
  var rootBoxes = births.slice(0, 2).map(founder);

  var branchLis = [];
  var kidsOfRoot = TREE.map(function (b, bi) {
    var cnt = b.grands.length + b.grands.reduce(function (s, g) { return s + g.kids.length; }, 0);
    var gl = b.grands.map(function (g) {
      var gb = [pbox(g.name, g.year ? String(g.year) : '', { title: g.name + (g.year ? ' (' + g.year + ')' : '') + (g.spouse ? ' · ' + spLabel(g.spouseGender) + ': ' + g.spouse : '') + (g.wedText ? ' · נישאו ' + g.wedText : ''), dead: g.dead, gender: g.gender })];
      if (g.spouse) gb.push(pbox(g.spouse, '', { sp: 1, title: spLabel(g.spouseGender) + ' של ' + g.name + (g.wedText ? ' · נישאו ' + g.wedText : ''), gender: g.spouseGender }));
      var kl = g.kids.map(function (k) {
        var nm = k.ph ? 'ילד/ה ' + k.ph : (k.unknown ? 'ללא שם' : k.name);
        var b2 = pbox(nm, k.year ? String(k.year) : '', { x: (k.ph || k.unknown), dead: k.dead, extra: k.mother ? 'האם: ' + k.mother : '', gender: k.gender });
        return item(node(3, [b2]), [], 0, true);
      });
      return item(node(2, gb), kl, g.kids.length, false);
    });
    var cFull = b.child + (b.familyName ? ' ' + b.familyName : '');
    var cb = [pbox(cFull, years(b.born, b.died), { title: cFull + (b.born ? ' (' + years(b.born, b.died) + ')' : '') + (b.spouse ? ' · ' + spLabel(b.spouseGender) + ': ' + b.spouse : '') + (b.wedText ? ' · נישאו ' + b.wedText : ''), dead: b.childDead, gender: b.childGender })];
    if (b.spouse) { var sFull = b.spouse + (b.spouseFamily ? ' ' + b.spouseFamily : ''); cb.push(pbox(sFull, '', { sp: 1, dead: b.spouseDead, title: spLabel(b.spouseGender) + ' של ' + b.child, gender: b.spouseGender })); }
    var li = item(node(1, cb), gl, cnt, false);
    branchLis.push(li);
    return li;
  });
  var rootLi = item(node(0, rootBoxes), kidsOfRoot, TREE.length, true);

  /* ── grandparent generation (tree view only, hardcoded) ── */
  var GP_FAM = [
    {
      label: 'הורי אברהם',
      sibsLabel: 'אברהם, אחים ואחיות',
      couple: ['סלם בן יוסף', 'מרים בת כליף כהן'],
      coupleGender: ['M', 'F'],
      sibs: [
        { name: 'זוהרה יוסף', gender: 'F' },
        { name: 'חממה סלם', gender: 'F' },
        { name: 'יחיא יוסף', gender: 'M' },
        { name: 'מנחם יוסף', gender: 'M' },
        { name: 'יוסף יוסף', gender: 'M' },
        { name: 'סעידה ניסים', gender: 'F' }
      ]
    },
    {
      label: 'הורי סלמה',
      sibsLabel: 'סלמה, אחים ואחיות',
      couple: ['יוסף חסן', 'מרים (רחל) כהן'],
      coupleGender: ['M', 'F'],
      sibs: [
        { name: 'שמעה', gender: 'F' },
        { name: 'לאה שרעבי', gender: 'F' },
        { name: 'שם לא ידוע', gender: 'F', x: true, extra: 'נס ציונה' },
        { name: 'שם לא ידוע', gender: 'F', x: true, extra: 'גדרה' },
        { name: 'רחל (ימן) בת סעיד כהן', gender: 'F' },
        { name: 'חסן', gender: 'M' }
      ]
    }
  ];

  function makeGpFam(fam) {
    var col = document.createElement('div');
    col.className = 'gp-fam';

    /* parents label + couple */
    var lbl = document.createElement('div');
    lbl.className = 'gp-label'; lbl.textContent = fam.label;
    col.appendChild(lbl);
    var coupleNd = node(-1, [
      pbox(fam.couple[0], '', { gender: fam.coupleGender[0] }),
      pbox(fam.couple[1], '', { gender: fam.coupleGender[1] })
    ]);
    col.appendChild(coupleNd);

    /* siblings — separate header with its own toggle */
    var sibUl = document.createElement('ul');
    sibUl.className = 'tr gp-sibs gp-closed';
    fam.sibs.forEach(function (sib) {
      var sibLi = document.createElement('li');
      sibLi.appendChild(node(-1, [pbox(sib.name, '', { gender: sib.gender, x: sib.x, extra: sib.extra || '' })]));
      sibUl.appendChild(sibLi);
    });
    var open = false;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'tg'; btn.setAttribute('aria-label', 'אחים ואחיות');
    function refresh() {
      sibUl.classList.toggle('gp-closed', !open);
      btn.textContent = open ? '−' : '+' + fam.sibs.length;
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', function () { open = !open; refresh(); requestAnimationFrame(posGpConn); });
    refresh();
    var sibsHd = document.createElement('div');
    sibsHd.className = 'gp-sibs-hd';
    var sibsLbl = document.createElement('div');
    sibsLbl.className = 'gp-label'; sibsLbl.textContent = fam.sibsLabel;
    sibsHd.appendChild(sibsLbl);
    sibsHd.appendChild(btn);
    col.appendChild(sibsHd);
    col.appendChild(sibUl);
    return col;
  }

  var gpSec = document.createElement('div');
  gpSec.id = 'gp-sec';
  GP_FAM.forEach(function (fam) { gpSec.appendChild(makeGpFam(fam)); });
  var gpConn = document.createElement('div');
  gpConn.className = 'gp-conn';
  gpSec.appendChild(gpConn);
  box.insertBefore(gpSec, tr);

  rootLi.classList.add('gp-connected');
  tr.appendChild(rootLi);

  /* stretch gp-sec to full tree width; center connector under founding couple */
  function posGpConn() {
    var w = tr.offsetWidth;
    if (!w) return;
    gpSec.style.minWidth = w + 'px';
    gpConn.style.left = (w / 2) + 'px';
  }
  requestAnimationFrame(function () { requestAnimationFrame(posGpConn); });
  window.addEventListener('resize', posGpConn);
  if (window.ResizeObserver) {
    new ResizeObserver(function () { requestAnimationFrame(posGpConn); }).observe(tr);
  }
  /* ── end grandparent generation ── */

  function setAll(open) { lis.forEach(function (li) { if (li === rootLi) return; li.classList.toggle('collapsed', !open); setTg(li); }); }
  function center(el) { if (el && el.scrollIntoView && box.offsetParent !== null) el.scrollIntoView({ inline: 'center', block: 'nearest' }); }
  var zoom = 1;
  function applyZoom() { box.style.zoom = zoom; requestAnimationFrame(posGpConn); }
  document.getElementById('z-out').addEventListener('click', function () { zoom = Math.max(0.3, +(zoom - 0.1).toFixed(1)); applyZoom(); });
  document.getElementById('z-in').addEventListener('click', function () { zoom = Math.min(2.5, +(zoom + 0.1).toFixed(1)); applyZoom(); });

  /* Ctrl+wheel zoom */
  box.addEventListener('wheel', function (e) {
    if (!e.ctrlKey) return;
    e.preventDefault();
    zoom = Math.min(2.5, Math.max(0.3, +(zoom + (e.deltaY < 0 ? 0.1 : -0.1)).toFixed(1)));
    applyZoom();
  }, { passive: false });

  /* fullscreen toggle */
  var fsBtn = document.getElementById('z-fs');
  if (fsBtn) {
    fsBtn.addEventListener('click', function () {
      var isFs = box.classList.toggle('treebox-fs');
      fsBtn.textContent = isFs ? '✕' : '⛶';
      fsBtn.setAttribute('aria-label', isFs ? 'יציאה ממסך מלא' : 'מסך מלא');
      document.body.style.overflow = isFs ? 'hidden' : '';
    });
  }
  document.getElementById('open-all').addEventListener('click', function () { setAll(true); });
  document.getElementById('close-all').addEventListener('click', function () { setAll(false); center(rootLi.firstChild); });
  var jump = document.getElementById('jump');
  TREE.forEach(function (b, i) { var o = document.createElement('option'); o.value = i; o.textContent = b.child.replace(' ז"ל', ' ז״ל') + (b.spouse ? ' ו' + b.spouse.replace(' ז"ל', ' ז״ל') : ''); jump.appendChild(o); });
  jump.addEventListener('change', function () {
    if (jump.value === '') return;
    var li = branchLis[+jump.value]; li.classList.remove('collapsed'); setTg(li); center(li.firstChild); jump.value = '';
  });
  window.TREEUI = { center: function () { center(rootLi.firstChild); } };

  /* ================= list view ================= */
  var treeEl = document.getElementById('branches');
  function personLine(g) {
    var gc = g.gender === 'M' ? ' male' : (g.gender === 'F' ? ' female' : '');
    var sc = g.spouseGender === 'M' ? 'male' : (g.spouseGender === 'F' ? 'female' : '');
    var s = '<span class="gname' + (g.dead ? ' dead' : '') + gc + '">' + zl(g.name) + '</span>';
    if (g.year) s += ' <small>(' + g.year + ')</small>';
    if (g.spouse) s += ' <small>· ' + spLabel(g.spouseGender) + ': ' + (sc ? '<span class="' + sc + '">' : '') + zl(g.spouse) + (sc ? '</span>' : '') + (g.wedText ? ' · נישאו ' + esc(g.wedText) : '') + '</small>';
    else if (g.wedText) s += ' <small>· נישאו ' + esc(g.wedText) + '</small>';
    return s;
  }
  var branches = TREE.map(function (b) {
    var d = document.createElement('details');
    d.className = 'br'; d.open = true;
    var kids = b.grands.reduce(function (s, g) { return s + g.kids.length; }, 0);
    var cg = b.childGender === 'M' ? 'male' : (b.childGender === 'F' ? 'female' : '');
    var sg = b.spouseGender === 'M' ? 'male' : (b.spouseGender === 'F' ? 'female' : '');
    var cCls = (cg + (b.childDead ? ' dead' : '')).trim();
    var sCls = (sg + (b.spouseDead ? ' dead' : '')).trim();
    var head = '<span class="ch">' + (cCls ? '<span class="' + cCls + '">' : '') + zl(b.child) + (cCls ? '</span>' : '') + (b.familyName ? ' <small>(' + esc(b.familyName) + ')</small>' : '') + (b.born ? ' <small>(' + b.born + (b.died ? '–' + b.died : '') + ')</small>' : '') + (b.spouse ? ' ו' + (sCls ? '<span class="' + sCls + '">' : '') + zl(b.spouse) + (sCls ? '</span>' : '') + (b.spouseFamily ? ' ' + esc(b.spouseFamily) : '') : '') + (b.wedText ? ' <small>· נישאו ' + esc(b.wedText) + '</small>' : '') + '</span>';
    var cnt = b.grands.length ? '<span class="cnt">' + b.grands.length + ' נכדים · ' + kids + ' נינים</span>' : '';
    var body;
    if (!b.grands.length) body = '';
    else {
      body = '<ul>' + b.grands.map(function (g) {
        var k = g.kids.length ? '<ul class="kids">' + g.kids.map(function (c) {
          var label;
          if (c.ph) label = '<span class="x">ילד/ה ' + c.ph + ' טרם נרשם</span>';
          else if (c.unknown) label = '<span class="x">ילד/ה ללא שם בגיליון</span>';
          else { var kc = (c.dead ? 'dead' : '') + (c.gender === 'M' ? ' male' : (c.gender === 'F' ? ' female' : '')); label = '<span class="' + kc.trim() + '">' + zl(c.name) + '</span>'; }
          return '<li>' + label + (c.year ? ' <span class="y">' + c.year + '</span>' : '') + (c.mother ? ' <span class="m">· האם ' + esc(c.mother) + '</span>' : '') + '</li>';
        }).join('') + '</ul>' : '';
        return '<li class="gc">' + personLine(g) + k + '</li>';
      }).join('') + '</ul>';
    }
    d.innerHTML = '<summary>' + head + ' ' + cnt + '</summary>' + body;
    treeEl.appendChild(d);
    return { el: d, head: ((b.child + (b.familyName ? ' ' + b.familyName : '')) + ' ' + (b.spouse ? b.spouse + (b.spouseFamily ? ' ' + b.spouseFamily : '') : '')).replace(/\s+/g, ' '), gcs: d.querySelectorAll('li.gc') };
  });

  /* ================= views and search ================= */
  var vTree = document.getElementById('v-tree'), vList = document.getElementById('v-list');
  var treeView = document.getElementById('treeview'), listView = document.getElementById('listview'), tools = document.getElementById('tree-tools');
  function view(which) {
    var t = which === 'tree';
    treeView.hidden = !t; listView.hidden = t; tools.hidden = !t;
    vTree.setAttribute('aria-pressed', String(t)); vList.setAttribute('aria-pressed', String(!t));
    if (t) setTimeout(function () { center(rootLi.firstChild); }, 30);
  }
  vTree.addEventListener('click', function () { view('tree'); });
  vList.addEventListener('click', function () { view('list'); });

  function searchTree(t) {
    var all = tr.querySelectorAll('.pb'), first = null, n = 0, i;
    for (i = 0; i < all.length; i++) all[i].classList.remove('hit');
    if (!t) return 0;
    for (i = 0; i < all.length; i++) {
      if (all[i].getAttribute('data-t').indexOf(t) !== -1) {
        all[i].classList.add('hit'); n++; if (!first) first = all[i];
        var li = all[i].closest('li');
        while (li) { if (li.classList.contains('collapsed')) { li.classList.remove('collapsed'); setTg(li); } li = li.parentElement && li.parentElement.closest('li'); }
      }
    }
    if (first) setTimeout(function () { center(first); }, 30);
    return n;
  }
  function searchList(t) {
    var shown = 0;
    branches.forEach(function (b) {
      if (!t) { b.el.hidden = false; for (var i = 0; i < b.gcs.length; i++) b.gcs[i].hidden = false; return; }
      var headHit = norm(b.head).indexOf(t) !== -1, any = false;
      for (var i = 0; i < b.gcs.length; i++) {
        var hit = headHit || norm(b.gcs[i].textContent).indexOf(t) !== -1;
        b.gcs[i].hidden = !hit; if (hit) { any = true; shown++; }
      }
      b.el.hidden = !(headHit || any);
      if (!b.el.hidden) b.el.open = true;
      if (headHit && !b.gcs.length) shown++;
    });
    return shown;
  }
  q.addEventListener('input', function () {
    var t = norm(q.value), n = searchTree(t), s = searchList(t);
    sumEl.textContent = t ? (n ? 'נמצאו ' + n + ' תיבות מתאימות' : 'לא נמצא ‘' + q.value + '’') : total;
  });
  window.addEventListener('beforeprint', function () { branches.forEach(function (b) { b.el.open = true; }); });
  setTimeout(function () { center(rootLi.firstChild); }, 60);
})();
