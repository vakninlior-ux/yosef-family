/* נזכור · yahrzeit table with auto-updating Hebrew calendar dates */
(function () {
  'use strict';

  /* Fixed Hebrew dates (month/day never change) */
  var YAHRZEITS = [
    { name: 'אמא סלמה יוסף ז"ל', month: 1, day: 10 },  /* י' ניסן  */
    { name: 'חן דוד ז"ל',         month: 3, day: 12 },  /* י"ב סיוון */
    { name: 'משה יוסף ז"ל',       month: 5, day: 11 },  /* י"א אב   */
    { name: 'מורדכי יוסף ז"ל',    month: 5, day: 12 },  /* י"ב אב   */
    { name: 'חנניה זכאי ז"ל',     month: 6, day:  7 },  /* ז' אלול  */
    { name: 'אבא אברהם יוסף ז"ל', month: 6, day: 23 }   /* כ"ג אלול */
  ];

  var MONTHS_HE  = ['','ניסן','אייר','סיוון','תמוז','אב','אלול','תשרי','חשוון','כסלו','טבת','שבט',"אדר א'",'אדר ב\''];
  var DAYS_HE    = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת']; /* 0=Sun…6=Sat */
  var MONTHS_PRE = ['ב','ב','ב','ב','ב','ב','ב','ב','ב','ב','ב','ב','ב','ב'];

  /* Convert integer 1–30 to Hebrew letter notation */
  function numToHeb(n) {
    if (n === 15) return 'ט"ו';
    if (n === 16) return 'ט"ז';
    var t = ['','י','כ','ל'], o = ['','א','ב','ג','ד','ה','ו','ז','ח','ט'];
    var s = (t[Math.floor(n/10)] || '') + (o[n%10] || '');
    if (!s) return n.toString();
    return s.length === 1 ? s + "'" : s.slice(0,-1) + '"' + s.slice(-1);
  }

  /* Convert Hebrew year number to Hebrew letter year (short form, no ה') */
  function yearToHeb(y) {
    var rem = y % 1000;
    var H = ['','ק','ר','ש','ת','תק','תר','תש','תת','תתק'];
    var T = ['','י','כ','ל','מ','נ','ס','ע','פ','צ'];
    var O = ['','א','ב','ג','ד','ה','ו','ז','ח','ט'];
    var h = Math.floor(rem/100), t = Math.floor((rem%100)/10), o = rem%10;
    var s;
    if (t===1 && o===5) { s = H[h] + 'ט"ו'; }
    else if (t===1 && o===6) { s = H[h] + 'ט"ז'; }
    else {
      s = H[h] + T[t] + O[o];
      if (s.length >= 2) s = s.slice(0,-1) + '"' + s.slice(-1);
      else if (s.length === 1) s += "'";
    }
    return s;
  }

  function pad2(n) { return n < 10 ? '0'+n : ''+n; }
  function gregStr(d) { return pad2(d.getDate())+'/'+pad2(d.getMonth()+1)+'/'+String(d.getFullYear()).slice(2); }

  /* Build parasha map {dateString → Hebrew parasha label} */
  function buildParaMap(H, hebrewYear) {
    var map = {};
    try {
      var events = H.HebrewCalendar.calendar({
        year: hebrewYear, isHebrewYear: true,
        sedrot: true, noHolidays: true, il: true
      });
      events.forEach(function(ev) {
        var isParasha = false;
        if (ev.getCategories) {
          var cats = ev.getCategories();
          isParasha = cats[0] === 'parashat';
        } else if (ev.constructor && ev.constructor.name === 'ParshaEvent') {
          isParasha = true;
        }
        if (!isParasha) return;
        var d = ev.getDate().greg();
        var label = '';
        if (ev.renderBrief) label = ev.renderBrief('he');
        else if (ev.render) label = ev.render('he');
        else if (ev.desc) label = ev.desc;
        if (label && !label.startsWith('פרשת')) label = 'פרשת ' + label;
        map[d.toDateString()] = label;
      });
    } catch(e) { console.warn('parasha build:', e); }
    return map;
  }

  /* Find parasha on the Shabbat of the given date's week (or next Shabbat) */
  function findParasha(paraMap, gregDate) {
    var d = new Date(gregDate.getTime());
    var dow = d.getDay(); /* 0=Sun,6=Sat */
    if (dow !== 6) d.setDate(d.getDate() + (6 - dow));
    for (var i = 0; i < 4; i++) {
      var p = paraMap[d.toDateString()];
      if (p) return p;
      d.setDate(d.getDate() + 7);
    }
    return '';
  }

  /* Main render function, called once Hebcal is loaded */
  function renderTable(H) {
    var today    = new H.HDate();
    var hyear    = today.getFullYear();

    /* Update heading */
    var yearEl = document.getElementById('memorial-year');
    if (yearEl) yearEl.textContent = yearToHeb(hyear);

    var paraMap = buildParaMap(H, hyear);
    var tbody   = document.getElementById('memorial-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    YAHRZEITS.forEach(function(z) {
      var hdate  = new H.HDate(z.day, z.month, hyear);
      var greg   = hdate.greg();
      var dow    = greg.getDay();
      var hDateStr = numToHeb(z.day) + ' ב' + MONTHS_HE[z.month];
      var parasha  = findParasha(paraMap, greg);

      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td class="mem-name">' + z.name + '</td>' +
        '<td class="mem-day">'  + DAYS_HE[dow] + '</td>' +
        '<td class="mem-hdate">'+ hDateStr + '</td>' +
        '<td class="mem-greg">' + gregStr(greg) + '</td>' +
        '<td class="mem-para">' + (parasha || '') + '</td>';
      tbody.appendChild(tr);
    });

    var loading = document.getElementById('memorial-loading');
    if (loading) loading.style.display = 'none';
    var table = document.getElementById('memorial-table');
    if (table) table.style.display = '';
  }

  function onError() {
    var loading = document.getElementById('memorial-loading');
    if (loading) loading.textContent = 'לא ניתן לטעון נתונים. אנא נסה שוב מאוחר יותר.';
  }

  function loadHebcal(cb) {
    if (window.hebcal) { cb(window.hebcal); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@hebcal/core@5.7.0/dist/bundle.min.js';
    s.onload  = function() { if (window.hebcal) cb(window.hebcal); else onError(); };
    s.onerror = onError;
    document.head.appendChild(s);
  }

  loadHebcal(function(H) {
    try { renderTable(H); }
    catch(e) { console.error('memorial:', e); onError(); }
  });
})();
