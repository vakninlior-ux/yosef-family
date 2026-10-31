/* מקורות גיאוגרפיים · loads Leaflet dynamically */
(function () {
  'use strict';

  var mapDiv = document.getElementById('geo-map');
  if (!mapDiv) return;

  /* Village coordinates near Ta'izz, Jabal Habashi district, Yemen */
  var MUQARAH   = [13.740, 43.648];   /* מוקרה */
  var AYN_SHUM  = [13.548, 43.597];   /* עין שומר */
  var TAIZZ     = [13.579, 44.021];   /* תעז – nearest major city */
  var HASHED    = [12.870, 45.010];   /* מחנה גאולה – חאשד, ~20 ק"מ מעדן */
  var ISRAEL    = [31.80,  34.85];    /* ישראל */

  function initMap() {
    /* start zoomed on the Yemen village area */
    var map = L.map('geo-map', { attributionControl: true }).setView([13.65, 43.80], 8);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a>',
      maxZoom: 17
    }).addTo(map);

    /* ---- village markers (red circle + Hebrew label) ---- */
    function villageIcon(he, en) {
      return L.divIcon({
        className: '',
        html: '<div class="geo-pin"><div class="geo-pin-dot"></div><div class="geo-pin-lbl"><span class="geo-pin-he">' + he + '</span><span class="geo-pin-en">' + en + '</span></div></div>',
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
    }

    L.marker(MUQARAH,  { icon: villageIcon('מוקרה',    'Muqarah'),    title: 'מוקרה – Muqarah' })
      .addTo(map)
      .bindPopup('<strong>מוקרה (Muqarah)</strong><br>כפר מוצא המשפחה, אזור ג\'בל חבשי, תימן');

    L.marker(AYN_SHUM, { icon: villageIcon('עין שומר', 'Ayn Shumar'), title: 'עין שומר – Ayn Shumar' })
      .addTo(map)
      .bindPopup('<strong>עין שומר (Ayn Shumar)</strong><br>כפר מוצא המשפחה, אזור ג\'בל חבשי, תימן');

    /* מחנה גאולה – camp marker (tent icon style, offset label so it doesn't cover Aden) */
    function campIcon(he, en) {
      return L.divIcon({
        className: '',
        html: '<div class="geo-pin geo-pin-camp"><div class="geo-pin-dot geo-pin-dot-camp"></div><div class="geo-pin-lbl geo-pin-lbl-camp"><span class="geo-pin-he">' + he + '</span><span class="geo-pin-en">' + en + '</span></div></div>',
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });
    }
    L.marker(HASHED, { icon: campIcon('מחנה גאולה (חאשד)', 'Camp Geula / Hashed'), title: 'מחנה גאולה – Camp Hashed' })
      .addTo(map)
      .bindPopup('<strong>מחנה גאולה – חאשד</strong><br>מחנה מעבר ליהודי תימן לפני העלייה לישראל, ~20 ק"מ מעדן');

    /* Ta'izz reference star */
    var starIcon = L.divIcon({
      className: '',
      html: '<div class="geo-star-wrap"><span class="geo-star">★</span><span class="geo-star-lbl">תעז<br><small>Ta\'izz</small></span></div>',
      iconSize: [0, 0], iconAnchor: [0, 0]
    });
    L.marker(TAIZZ, { icon: starIcon, title: "Ta'izz" }).addTo(map);

    /* Israel marker */
    var ilIcon = L.divIcon({ className: 'geo-marker', html: '🇮🇱', iconSize: [26, 26], iconAnchor: [13, 13] });
    L.marker(ISRAEL, { icon: ilIcon, title: 'ישראל' })
      .addTo(map)
      .bindPopup('<strong>ישראל</strong><br>יעד העלייה');

    /* ---- migration routes ---- */
    var midRed = [15.5, 42.5];   /* מפרץ עדן / ים סוף */
    var midSea = [20.5, 38.5];   /* ים סוף אמצע */

    /* עין שומר → מחנה גאולה (צעידה / נסיעה ביבשה דרומה) */
    var walkMid = [13.10, 44.00];   /* נקודת ביניים – דרך תעז ודרומה לעדן */
    L.polyline([AYN_SHUM, walkMid, HASHED], { color: '#5B7FA6', weight: 2.5, dashArray: '6 5', opacity: 0.85 })
      .addTo(map)
      .bindPopup('מסלול הצעידה: עין שומר → מחנה גאולה (חאשד)');

    /* מחנה גאולה → ישראל (מבצע עלי בכנפי נשרים) */
    L.polyline([HASHED, midRed, midSea, ISRAEL], { color: '#C0682A', weight: 2.5, dashArray: '4 4', opacity: 0.85 })
      .addTo(map)
      .bindPopup('עלייה לישראל – מבצע עלי בכנפי נשרים');

    /* zoom-to-route button */
    var routeBtn = L.control({ position: 'topright' });
    routeBtn.onAdd = function () {
      var div = L.DomUtil.create('div', 'geo-route-btn');
      div.innerHTML = '<button type="button">הצג מסלול מלא ←</button>';
      L.DomEvent.on(div.querySelector('button'), 'click', function () {
        map.fitBounds([MUQARAH, AYN_SHUM, HASHED, ISRAEL], { padding: [40, 40] });
      });
      return div;
    };
    routeBtn.addTo(map);
  }

  function loadLeaflet(cb) {
    if (window.L) { cb(); return; }
    if (!document.querySelector('link[href*="leaflet"]')) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
      document.head.appendChild(css);
    }
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  loadLeaflet(initMap);
})();
