/* לוח בקרה · כנס יוסף השני 2026 */
(function () {
  'use strict';
  var F = window.FAMILY;
  var db = window.db;
  var statusEl  = document.getElementById('admin-status');
  var totalEl   = document.getElementById('admin-total');
  var container = document.getElementById('admin-branches');

  if (!db) {
    if (statusEl) statusEl.textContent = 'Firebase לא מוגדר — יש למלא את firebase-config.js';
    return;
  }

  /* ── helpers ── */
  function branchPeopleList(br) {
    var bpfx = br.child + '::';
    var list = [];
    if (!br.childDead) list.push({ name: br.child, key: bpfx + 'ch' });
    if (br.spouse && !br.spouseDead) list.push({ name: br.spouse, key: bpfx + 'sp' });
    br.grands.forEach(function (g) {
      var gpfx = bpfx + g.name + '::';
      if (!g.dead) list.push({ name: g.name, key: gpfx + 'g' });
      if (g.spouse) list.push({ name: g.spouse, key: gpfx + 'gsp' });
      g.kids.forEach(function (k) {
        if (!k.dead) {
          var kn = (k.unknown || k.ph) ? 'ילד/ה' : k.name;
          list.push({ name: kn, key: gpfx + 'k::' + kn + (k.year || '') });
        }
      });
    });
    return list;
  }

  function skipBranch(br) { return br.childDead && !br.spouse && br.grands.length === 0; }
  function branchTitle(br) {
    if (br.spouseDead && !br.childDead && br.spouse) return 'משפחת ' + br.spouse + ' ו' + br.child;
    return 'משפחת ' + br.child + (br.spouse ? ' ו' + br.spouse : '');
  }

  /* ── build skeleton ── */
  var bEls = {}; /* idx → { total, yes, no, yEl, nEl, pEl, fill, personEls } */

  if (F && container) {
    F.tree.forEach(function (br, idx) {
      if (skipBranch(br)) return;
      var people = branchPeopleList(br);
      var total  = people.length;

      var row = document.createElement('div');
      row.className = 'ab-row'; row.id = 'abr-' + idx;

      /* branch name */
      var nm = document.createElement('div'); nm.className = 'ab-name'; nm.textContent = branchTitle(br);

      /* progress bar */
      var bw = document.createElement('div'); bw.className = 'ab-bar-w';
      var bf = document.createElement('div'); bf.className = 'ab-bar'; bf.style.width = '0%';
      bw.appendChild(bf);

      /* collapsible summary + people list */
      var det = document.createElement('details');
      var sum = document.createElement('summary'); sum.className = 'ab-summary';
      var yEl = document.createElement('span'); yEl.className = 'ab-y'; yEl.textContent = '✓ 0';
      var nEl = document.createElement('span'); nEl.className = 'ab-n'; nEl.textContent = '✗ 0';
      var pEl = document.createElement('span'); pEl.className = 'ab-p'; pEl.textContent = total + ' ממתינים';
      sum.appendChild(yEl);
      sum.appendChild(document.createTextNode(' · '));
      sum.appendChild(nEl);
      sum.appendChild(document.createTextNode(' · '));
      sum.appendChild(pEl);

      var plist = document.createElement('div'); plist.className = 'ab-people';
      var personEls = {};
      people.forEach(function (p) {
        var pr = document.createElement('div'); pr.className = 'ab-person';
        var ps = document.createElement('span'); ps.className = 'ab-ps pend'; ps.textContent = '—';
        var pn = document.createElement('span'); pn.className = 'ab-pn'; pn.textContent = p.name;
        pr.appendChild(ps); pr.appendChild(pn);
        plist.appendChild(pr);
        personEls[p.key] = ps;
      });

      det.appendChild(sum); det.appendChild(plist);
      row.appendChild(nm); row.appendChild(bw); row.appendChild(det);
      container.appendChild(row);

      bEls[idx] = { total: total, yes: 0, no: 0, yEl: yEl, nEl: nEl, pEl: pEl, fill: bf, personEls: personEls };
    });
  }

  function refreshTotals() {
    var yes = 0, no = 0, pend = 0, tot = 0;
    Object.keys(bEls).forEach(function (k) {
      var b = bEls[k];
      yes += b.yes; no += b.no;
      pend += b.total - b.yes - b.no;
      tot  += b.total;
    });
    if (totalEl) totalEl.textContent = yes + ' מגיעים · ' + no + ' לא מגיעים · ' + pend + ' ממתינים  (מתוך ' + tot + ')';
  }

  /* ── Firestore listener ── */
  if (statusEl) statusEl.textContent = 'מתחבר ל-Firebase...';

  db.collection('rsvp').onSnapshot(function (snap) {
    if (statusEl) statusEl.textContent = 'עדכון אחרון: ' + new Date().toLocaleTimeString('he-IL');
    snap.forEach(function (doc) {
      var m = doc.id.match(/^br_(\d+)$/); if (!m) return;
      var idx = parseInt(m[1], 10);
      var b = bEls[idx]; if (!b) return;
      var data = doc.data();
      var yes = 0, no = 0;
      Object.keys(data).forEach(function (k) {
        if (k.charAt(0) === '_') return;
        var v = data[k];
        if (v === 'yes') yes++; else if (v === 'no') no++;
        if (b.personEls[k]) {
          var el = b.personEls[k];
          if      (v === 'yes') { el.textContent = '✓'; el.className = 'ab-ps yes'; }
          else if (v === 'no')  { el.textContent = '✗'; el.className = 'ab-ps no'; }
          else                  { el.textContent = '—'; el.className = 'ab-ps pend'; }
        }
      });
      b.yes = yes; b.no = no;
      var pend = b.total - yes - no;
      b.yEl.textContent = '✓ ' + yes;
      b.nEl.textContent = '✗ ' + no;
      b.pEl.textContent = pend + ' ממתינים';
      b.fill.style.width = (b.total > 0 ? Math.round(yes / b.total * 100) : 0) + '%';
      var row = document.getElementById('abr-' + idx);
      if (row) { row.classList.add('ab-flash'); setTimeout(function () { row.classList.remove('ab-flash'); }, 500); }
    });
    refreshTotals();
  }, function (err) {
    if (statusEl) statusEl.textContent = 'שגיאת חיבור: ' + err.message;
  });
})();
