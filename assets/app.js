/* =========================================================================
   Musterwerkstatt – Seitenlogik, Navigation und Use-Case-Demos
   ========================================================================= */
(function () {
  'use strict';

  var S = window.SITE;
  if (!S) { console.error('config.js fehlt.'); return; }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---------- Icons ---------- */
  var ICONS = {
    gear:     '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.14.34.4.62.73.79H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    wrench:   '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    shield:   '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    tyre:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.2"/><path d="M12 3v5.8M12 15.2V21M3 12h5.8M15.2 12H21"/>',
    disc:     '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
    snow:     '<path d="M12 2v20M4.9 6.5 19.1 17.5M19.1 6.5 4.9 17.5"/><path d="M12 7 9.4 4.9M12 7l2.6-2.1M12 17l-2.6 2.1M12 17l2.6 2.1"/>',
    chip:     '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    chat:     '<path d="M20 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>',
    send:     '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>',
    close:    '<path d="M18 6 6 18M6 6l12 12"/>',
    phone:    '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    check:    '<path d="M20 6 9 17l-5-5"/>',
    arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
    bolt:     '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    database: '<ellipse cx="12" cy="5.5" rx="8" ry="3.2"/><path d="M4 5.5v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6"/><path d="M4 11.5v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6"/>',
    sparkle:  '<path d="M12 2.8 13.9 9l6.2 1.9-6.2 1.9L12 19l-1.9-6.2L3.9 10.9 10.1 9z"/><path d="M19 3v3.4M17.3 4.7h3.4"/>',
    whatsapp: '<path d="M3 21l1.65-4.8A8.6 8.6 0 1 1 8 20.1z"/><path d="M8.6 9.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.4l.7 1.7c0 .2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a6 6 0 0 0 2.7 2.3c.3.1.4 0 .6-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4s0 .9-.3 1.2c-.3.3-.9.7-1.5.7-1.6 0-3.7-1.2-5-2.5a9 9 0 0 1-2-3.3c-.2-.9 0-1.6.3-2z"/>',
    mic:      '<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10.5a7 7 0 0 0 14 0M12 17.5V21"/>',
    heart:    '<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 1 0-7.1 7.1l8.8 8.8 8.8-8.8a5 5 0 0 0 0-7.1z"/>',
    bookmark: '<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    refresh:  '<path d="M3 12a9 9 0 0 1 15.2-6.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.2 6.5L3 16"/><path d="M3 21v-5h5"/>',
    trend:    '<path d="M22 7 13.5 15.5l-4-4L2 19"/><path d="M16 7h6v6"/>',
    star:     '<path d="m12 2.5 2.95 5.98 6.6.96-4.78 4.65 1.13 6.57L12 17.56l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96z"/>',
    eye:      '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'
  };

  function icon(n) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || ICONS.gear) + '</svg>';
  }
  window.icon = icon;

  function bild(key, w) {
    return 'https://images.unsplash.com/' + S.bilder[key] + '?auto=format&fit=crop&w=' + w + '&q=72';
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var kiflag = function (txt, rechts) {
    return '<span class="kiflag' + (rechts ? ' rechts' : '') + '">' + icon('bolt') + (txt || 'ASK Connect') + '</span>';
  };
  window.kiflag = kiflag;

  /* =======================================================================
     Bereiche rendern
     ======================================================================= */
  function renderLeistungen() {
    var el = document.getElementById('leistungs-grid');
    if (!el) return;
    el.innerHTML = S.leistungen.map(function (l) {
      // svctop wird auf dem Handy zur Zeile (Miniaturbild links),
      // svcask bleibt darunter über die volle Kartenbreite.
      return '<article class="svc rv">' +
        '<div class="svctop">' +
          '<div class="svcimg">' +
            '<img src="' + bild(l.bild, 640) + '" alt="' + esc(l.titel) + '" loading="lazy" decoding="async">' +
            '<span class="svcico">' + icon(l.icon) + '</span>' +
            '<span class="svcpreis">' + esc(l.preis) + '</span>' +
          '</div>' +
          '<div class="svctxt">' +
            '<span class="svcpreis-m">' + esc(l.preis) + '</span>' +
            '<h3>' + esc(l.titel) + '</h3>' +
            '<p>' + esc(l.kurz) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="svcask">' +
          '<span class="asklabel">' + icon('bolt') + 'Direkt fragen</span>' +
          '<button class="ask" type="button" data-frage="' + esc(l.frage) + '">' +
            '<span class="q">„' + esc(l.frage) + '"</span>' +
            '<span class="go">' + icon('arrow') + '</span>' +
          '</button>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  function renderZeiten() {
    var el = document.getElementById('zeiten');
    if (!el) return;
    el.innerHTML = S.zeiten.map(function (z) {
      return '<li><b>' + esc(z.tag) + '</b><span' + (z.zu ? ' class="zu"' : '') + '>' + esc(z.zeit) + '</span></li>';
    }).join('');
  }

  function renderPakete() {
    var el = document.getElementById('pakete');
    if (!el) return;
    el.innerHTML = S.pakete.map(function (p) {
      return '<div class="pak rv' + (p.top ? ' empfohlen' : '') + '">' +
        (p.top ? '<span class="paktag">Unsere Empfehlung</span>' : '') +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="pakfuer">' + esc(p.fuer) + '</p>' +
        '<div class="pakp">' + esc(p.spanne) + '</div>' +
        '<div class="pakmeta">einmalig, je nach Umfang<br>' +
          '<b>danach ' + esc(p.monat) + ' im Monat</b></div>' +
        '<ul class="tick">' + p.punkte.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<a class="btn ' + (p.top ? 'b-pri' : 'b-gho') + '" href="#gespraech">Unverbindlich anfragen</a>' +
      '</div>';
    }).join('');
  }

  function renderFunktionen() {
    var el = document.getElementById('funktionen');
    if (!el) return;
    el.innerHTML = S.funktionen.map(function (f) {
      return '<div class="fnk rv">' +
        '<span class="fnk-ic">' + icon(f.icon) + '</span>' +
        '<b>' + esc(f.titel) + '</b>' +
        '<span>' + esc(f.text) + '</span>' +
      '</div>';
    }).join('');
  }

  function renderAblauf() {
    var el = document.getElementById('ablauf');
    if (!el) return;
    el.innerHTML = S.ablauf.map(function (a, i) {
      return '<div class="schritt rv' + (a.hervor ? ' hervor' : '') + '">' +
        '<span class="schritt-nr">' + (i + 1) + '</span>' +
        '<div class="schritt-txt">' +
          '<b>' + esc(a.titel) + '</b>' +
          '<p>' + esc(a.text) + '</p>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function fuellePlatzhalter() {
    var k = S.kontakt;
    var map = {
      'txt-tel': k.telefon, 'txt-mail': k.mail,
      'txt-adresse': k.strasse + ', ' + k.plz + ' ' + k.stadt,
      'txt-weitere': S.weitere, 'txt-anbieter': S.anbieter.name
    };
    Object.keys(map).forEach(function (id) {
      var e = document.getElementById(id); if (e) e.textContent = map[id];
    });
    document.querySelectorAll('[data-tel]').forEach(function (a) { a.href = 'tel:' + k.telefonHref; });
    document.querySelectorAll('[data-mailto]').forEach(function (a) {
      a.href = 'mailto:' + S.anbieter.mail +
        '?subject=' + encodeURIComponent('KI-Assistent für meine Werkstatt') +
        '&body=' + encodeURIComponent('Guten Tag,\n\nich habe die Demo gesehen und möchte wissen, wie das für meinen Betrieb aussehen würde.\n\nBetrieb:\nOrt:\nRückruf am liebsten:\n\nViele Grüße\n');
    });
  }

  /* =======================================================================
     Navigation
     ======================================================================= */
  function navigation() {
    var top = document.querySelector('.top');
    if (top) {
      var onScroll = function () { top.classList.toggle('scr', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Jede Leiste (Kopfzeile und mobile Pills) getrennt behandeln –
    // sonst vermischen sich die Indizes beider Listen.
    var leisten = [].slice.call(document.querySelectorAll('[data-nav]')).map(function (box) {
      var links = [].slice.call(box.querySelectorAll('a'));
      return {
        box: box,
        links: links,
        ziele: links.map(function (a) { return document.querySelector(a.getAttribute('href')); })
      };
    });

    function markiere() {
      var y = window.scrollY + window.innerHeight * .32;
      leisten.forEach(function (l) {
        var akt = -1;
        l.ziele.forEach(function (z, i) {
          if (z && z.getBoundingClientRect().top + window.scrollY <= y) akt = i;
        });
        if (akt < 0) akt = 0;
        l.links.forEach(function (a, i) { a.classList.toggle('on', i === akt); });

        if (l.box.classList.contains('pills')) {
          var pill = l.links[akt];
          if (pill) {
            var soll = pill.offsetLeft - l.box.clientWidth / 2 + pill.clientWidth / 2;
            l.box.scrollTo({ left: Math.max(0, soll), behavior: 'smooth' });
          }
        }
      });
    }
    markiere();
    window.addEventListener('scroll', markiere, { passive: true });
  }

  /* =======================================================================
     Markierungs-Schalter
     ======================================================================= */
  function schalter() {
    var an = true;
    try { an = localStorage.getItem('mw_marks') !== 'aus'; } catch (e) {}
    document.body.classList.toggle('plain', !an);

    document.querySelectorAll('[data-marks]').forEach(function (box) {
      var cb = box.querySelector('input');
      cb.checked = an;
      cb.addEventListener('change', function () {
        document.body.classList.toggle('plain', !cb.checked);
        document.querySelectorAll('[data-marks] input').forEach(function (o) { o.checked = cb.checked; });
        try { localStorage.setItem('mw_marks', cb.checked ? 'an' : 'aus'); } catch (e) {}
      });
    });
  }

  /* =======================================================================
     Reveal + Puls auf markierten Bereichen
     ======================================================================= */
  function beobachte() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.rv').forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        setTimeout(function () { el.classList.add('in'); }, Math.min(i * 60, 240));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: .08 });
    document.querySelectorAll('.rv').forEach(function (e) { io.observe(e); });

    if (reduce) return;
    var ip = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('puls');
        ip.unobserve(e.target);
      });
    }, { threshold: .35 });
    document.querySelectorAll('.kizone').forEach(function (e) { ip.observe(e); });
  }

  /* =======================================================================
     ABSCHNITT „IN AKTION" – Chat und Kalender, zwei Szenarien

     WICHTIG: Die Zeiten, die der Assistent im Chat vorschlaegt, muessen
     echte Luecken in KAL_BASIS sein. Sonst behauptet die Demo etwas,
     das die Darstellung daneben widerlegt.
     ======================================================================= */

  /* Belegter Wochenplan. tag 0 = Mo … 4 = Fr, start als Dezimalstunde. */
  var KAL_BASIS = [
    { tag:0, start:9,    dauer:2,   titel:'Inspektion',    unter:'Passat B8' },
    { tag:0, start:14,   dauer:1,   titel:'HU / AU',       unter:'Corsa E' },

    { tag:1, start:8.5,  dauer:1,   titel:'Ölwechsel',     unter:'Polo VI' },
    { tag:1, start:10.5, dauer:1.5, titel:'Bremsen vorne', unter:'Focus III' },
    { tag:1, start:14,   dauer:2,   titel:'Inspektion',    unter:'Octavia' },

    { tag:2, start:9,    dauer:1,   titel:'Klimaservice',  unter:'A4 B9' },
    { tag:2, start:10.5, dauer:1,   titel:'Achsvermessung',unter:'Leon III' },
    { tag:2, start:13,   dauer:3,   titel:'Getriebe',      unter:'T6' },

    { tag:3, start:8,    dauer:2,   titel:'Diagnose',      unter:'Golf 8' },
    { tag:3, start:11,   dauer:1,   titel:'HU / AU',       unter:'Yaris' },
    { tag:3, start:14,   dauer:2.5, titel:'Unfallschaden', unter:'Kuga II' },

    { tag:4, start:8,    dauer:3,   titel:'Inspektion',    unter:'Transporter' },
    { tag:4, start:13,   dauer:1,   titel:'Reifenwechsel', unter:'Polo VI' }
  ];

  /* Freie Luecken, die daraus entstehen und im Chat genannt werden:
       Di 09:30 – 10:30  (zwischen Ölwechsel und Bremsen)   ← wird gebucht
       Do 10:00 – 11:00  (zwischen Diagnose und HU)
       Fr 11:00 – 12:00  (nach der Inspektion)
       Mo 11:00 – 12:00  (nach der Inspektion)
       Mi 10:00 – 10:30  (zwischen Klima und Achsvermessung) ← Rueckruf
       Do 10:30 – 11:00  (Rest der Diagnose-Luecke)                       */

  var SZENARIEN = [
    {
      tab: 'Werkstatttermin buchen',
      hinweis: 'Der Assistent liest den Kalender, nennt nur tatsächlich freie Zeiten und trägt den Termin passgenau in die Lücke ein – mit Fahrzeug, Kennzeichen und Anliegen.',
      chat: [
        { s:'me',  t:'Hallo, ich bräuchte einen Termin zum Reifenwechsel.' },
        { s:'bot', t:'Sehr gern. Für welches Fahrzeug – und liegen Ihre Winterräder bei uns im Lager?', d:1300 },
        { s:'me',  t:'Golf 7, MU-AB 123. Räder habt ihr eingelagert.' },
        { s:'bot', t:'Perfekt, Ihr Radsatz steht auf Platz B-14.\nFür den Wechsel plane ich eine Stunde ein.\n\nFrei wäre diese Woche:\n• Di, 09:30\n• Do, 10:00\n• Fr, 11:00', d:1800 },
        { s:'me',  t:'Dienstag 9:30 passt.' },
        { s:'bot', t:'Eingetragen ✅\n\nDi, 14.10. · 09:30 – 10:30 Uhr\nReifenwechsel inkl. Auswuchten\n39 € · Radsatz wird bereitgestellt', d:2000 }
      ],
      termin: { tag:1, start:9.5, dauer:1, art:'service',
                titel:'Reifenwechsel', unter:'MU-AB 123 · Golf 7' }
    },
    {
      tab: 'Rückruf vereinbaren',
      hinweis: 'Nicht jedes Anliegen gehört in den Werkstattkalender. Der Assistent vergibt stattdessen ein kurzes Zeitfenster aus Ihrem eigenen Kalender – Sie rufen zurück, alles Weitere klären Sie am Telefon.',
      chat: [
        { s:'me',  t:'Mein Auto macht beim Lenken komische Geräusche. Können Sie mal draufschauen?' },
        { s:'bot', t:'Das sollte sich ein Meister direkt anhören, bevor wir etwas einplanen. Herr Meier ruft Sie gern zurück.\n\nEr hat Zeit:\n• Mo, 11:00\n• Mi, 10:00\n• Do, 10:30', d:1700 },
        { s:'me',  t:'Mittwoch um 10 wäre gut.' },
        { s:'bot', t:'Notiert ✅\n\nHerr Meier ruft Sie Mi, 15.10. um 10:00 Uhr an.\nUnter welcher Nummer erreicht er Sie?', d:1600 },
        { s:'me',  t:'0170 1234567' },
        { s:'bot', t:'Danke, ist hinterlegt. Bis Mittwoch!', d:1300 }
      ],
      termin: { tag:2, start:10, dauer:0.5, art:'call',
                titel:'Rückruf · Frau Keller', unter:'0170 1234567' }
    }
  ];

  var KAL_START = 8, KAL_ENDE = 18;
  var KAL_TAGE = [['Mo', 13], ['Di', 14], ['Mi', 15], ['Do', 16], ['Fr', 17]];

  function kalPos(t) {
    var spanne = KAL_ENDE - KAL_START;
    return {
      oben:  ((t.start - KAL_START) / spanne) * 100,
      hoehe: (t.dauer / spanne) * 100,
      links: t.tag * 20
    };
  }

  function terminHtml(t, neu) {
    var p = kalPos(t);
    return '<div class="kal-ev ' + (t.art || 'alt') + (neu ? ' neu' : '') +
      (t.dauer <= 0.5 ? ' kurz' : '') + '" ' +
      'style="left:' + p.links + '%;top:' + p.oben + '%;height:' + p.hoehe + '%">' +
      '<b>' + esc(t.titel) + '</b><span>' + esc(t.unter) + '</span></div>';
  }

  /* Gestrichelter Platzhalter, der die Luecke vor dem Eintrag markiert */
  function lueckeHtml(t) {
    var p = kalPos(t);
    return '<div class="kal-luecke" style="left:' + p.links + '%;top:' + p.oben +
      '%;height:' + p.hoehe + '%"><span>frei</span></div>';
  }

  function kalenderHtml() {
    var kopf = '<span class="kal-ecke"></span>' + KAL_TAGE.map(function (d) {
      return '<span class="kal-tag">' + d[0] + '<i>' + d[1] + '</i></span>';
    }).join('');

    var zeilen = '';
    for (var h = KAL_START; h < KAL_ENDE; h++) {
      zeilen += '<span class="kal-zeit">' + (h < 10 ? '0' : '') + h + '</span>';
      for (var d = 0; d < 5; d++) zeilen += '<span class="kal-zelle"></span>';
    }

    return '<div class="kal-top">' +
        '<span class="kal-ampel"><i></i><i></i><i></i></span>' +
        '<b>Werkstattkalender</b>' +
        '<span class="kal-monat">Oktober 2026 · KW 42</span>' +
      '</div>' +
      '<div class="kal-body">' +
        '<div class="kal-grid">' + kopf + zeilen + '</div>' +
        '<div class="kal-layer">' +
          KAL_BASIS.map(function (t) { return terminHtml(t, false); }).join('') +
        '</div>' +
      '</div>';
  }

  function demoBuehne(root) {
    // Tabs und Hinweiszeile liegen ausserhalb der Buehne, im selben Abschnitt
    var abschnitt = root.closest('section') || document;
    var chatEl = root.querySelector('.bchat-log');
    var kalEl  = root.querySelector('.bkal');
    var tabsEl = abschnitt.querySelector('.sz-tabs');
    var noteEl = abschnitt.querySelector('.sz-note');
    if (!chatEl || !kalEl || !tabsEl || !noteEl) return;
    var aktiv = 0;

    /* --- Ablaufsteuerung mit Pause -------------------------------------
       Die Animation haengt an verketteten Timern. Damit sie anhalten kann,
       merkt sich "plane" den naechsten Schritt und dessen Restzeit. --- */
    var pausiert = false, naechster = null, timerId = null, rest = 0, seit = 0;

    function plane(fn, ms) {
      naechster = fn;
      rest = ms;
      if (pausiert) return;
      seit = Date.now();
      timerId = setTimeout(function () { naechster = null; fn(); }, ms);
    }

    function stop() {
      clearTimeout(timerId);
      naechster = null; rest = 0; timerId = null;
    }

    function anhalten() {
      if (pausiert) return;
      if (naechster && timerId) {
        clearTimeout(timerId);
        rest = Math.max(120, rest - (Date.now() - seit));
      }
      pausiert = true;
      root.classList.add('pausiert');
    }

    function fortsetzen() {
      if (!pausiert) return;
      pausiert = false;
      root.classList.remove('pausiert');
      if (naechster) plane(naechster, rest);
    }

    /* Lesezeit richtet sich nach der Laenge der Nachricht */
    function lesezeit(m) {
      var n = m.t.length;
      return m.s === 'bot'
        ? Math.min(900 + n * 22, 2900)
        : Math.min(550 + n * 14, 1250);
    }


    function nachricht(m) {
      var d = document.createElement('div');
      d.className = 'bmsg ' + m.s;
      d.textContent = m.t;
      chatEl.appendChild(d);
      chatEl.scrollTop = chatEl.scrollHeight;
    }

    function tippt(an) {
      var t = chatEl.querySelector('.btyp');
      if (an && !t) {
        t = document.createElement('div');
        t.className = 'bmsg bot btyp';
        t.innerHTML = '<i></i><i></i><i></i>';
        chatEl.appendChild(t);
        chatEl.scrollTop = chatEl.scrollHeight;
      } else if (!an && t) { t.remove(); }
    }

    function eintragen(t) {
      var layer = kalEl.querySelector('.kal-layer');
      if (!layer) return;
      // Schritt 1: die Luecke sichtbar machen
      layer.insertAdjacentHTML('beforeend', lueckeHtml(t));
      kalEl.classList.add('fokus');
      // Schritt 2: Termin faellt hinein
      plane(function () {
        var l = layer.querySelector('.kal-luecke');
        if (l) l.remove();
        layer.insertAdjacentHTML('beforeend', terminHtml(t, true));
        plane(function () { kalEl.classList.remove('fokus'); }, 2600);
      }, 950);
    }

    function spiele(i) {
      var sz = SZENARIEN[aktiv];
      if (i >= sz.chat.length) {
        plane(function () {
          eintragen(sz.termin);
          plane(function () { starte(aktiv); }, 9000);
        }, 700);
        return;
      }
      var m = sz.chat[i];
      function rein() {
        nachricht(m);
        plane(function () { spiele(i + 1); }, lesezeit(m));
      }
      if (m.s === 'bot') {
        tippt(true);
        plane(function () { tippt(false); rein(); }, (m.d || 1400) * 0.72);
      } else { rein(); }
    }

    function starte(i) {
      stop();
      aktiv = i;
      chatEl.innerHTML = '';
      kalEl.classList.remove('fokus');
      kalEl.innerHTML = kalenderHtml();
      noteEl.textContent = SZENARIEN[i].hinweis;
      [].forEach.call(tabsEl.children, function (b, n) { b.classList.toggle('on', n === i); });

      if (reduce) {
        SZENARIEN[i].chat.forEach(nachricht);
        eintragen(SZENARIEN[i].termin);
        return;
      }
      plane(function () { spiele(0); }, 700);
    }

    tabsEl.innerHTML = SZENARIEN.map(function (s, i) {
      return '<button class="sz-tab' + (i ? '' : ' on') + '" type="button" data-sz="' + i + '">' +
        esc(s.tab) + '</button>';
    }).join('');

    tabsEl.addEventListener('click', function (e) {
      var b = e.target.closest('.sz-tab');
      if (b) starte(parseInt(b.dataset.sz, 10));
    });

    // Anhalten nur, solange die Maus auf dem Telefon liegt.
    // Die Markierung .pausiert sitzt weiterhin auf der Buehne, damit
    // Plakette und angehaltene Animationen daran haengen koennen.
    var phoneEl = root.querySelector('.bphone');
    if (phoneEl) {
      phoneEl.addEventListener('mouseenter', anhalten);
      phoneEl.addEventListener('mouseleave', fortsetzen);
    }

    kalEl.innerHTML = kalenderHtml();
    noteEl.textContent = SZENARIEN[0].hinweis;
    sicht(root, function () { pausiert = false; root.classList.remove('pausiert'); starte(aktiv); }, stop);
  }

  /* =======================================================================
     DEMO 1 – WhatsApp
     ======================================================================= */
  var WA = [
    { s:'out', t:'Hallo, wann habt ihr diese Woche Zeit für einen Reifenwechsel?', z:'21:47' },
    { s:'in',  t:'Guten Abend! Sehr gern. Für welches Fahrzeug – und liegen Ihre Winterräder bei uns?', z:'21:47', d:1400 },
    { s:'out', t:'Golf 7, MU-AB 123. Räder habt ihr eingelagert.', z:'21:48' },
    { s:'in',  t:'Perfekt, Radsatz steht im Lager (Platz B-14).\n\nFrei wäre:\n• Mi, 08:30\n• Do, 14:00\n• Fr, 09:15', z:'21:48', d:1900 },
    { s:'out', t:'Donnerstag 14 Uhr bitte', z:'21:49' },
    { s:'in',  t:'Eingetragen ✅\n\n📅 Do, 16.10. um 14:00\n🔧 Reifenwechsel inkl. Auswuchten\n⏱ ca. 40 Minuten · 39 €\n\nBis Donnerstag!', z:'21:49', d:2200 }
  ];

  function demoWhatsApp(root) {
    var body = root.querySelector('.wabody'), timer = [];
    function stop() { timer.forEach(clearTimeout); timer = []; }

    function zeige(i) {
      if (i >= WA.length) {
        timer.push(setTimeout(function () { body.innerHTML = ''; zeige(0); }, 5000));
        return;
      }
      var m = WA[i];
      function rein() {
        var d = document.createElement('div');
        d.className = 'wamsg ' + m.s;
        d.innerHTML = esc(m.t) + '<span class="watime">' + m.z + (m.s === 'out' ? '<span class="ck">✓✓</span>' : '') + '</span>';
        body.appendChild(d);
        while (body.children.length > 5) body.removeChild(body.firstChild);
        timer.push(setTimeout(function () { zeige(i + 1); }, m.s === 'out' ? 850 : 2400));
      }
      if (m.s === 'in') {
        var t = document.createElement('div');
        t.className = 'wamsg in';
        t.innerHTML = '<span class="typ" style="padding:1px 2px"><i></i><i></i><i></i></span>';
        body.appendChild(t);
        timer.push(setTimeout(function () { t.remove(); rein(); }, m.d || 1300));
      } else rein();
    }

    if (reduce) {
      body.innerHTML = WA.slice(-3).map(function (m) {
        return '<div class="wamsg ' + m.s + '">' + esc(m.t) + '<span class="watime">' + m.z + '</span></div>';
      }).join('');
      return;
    }
    sicht(root, function () { body.innerHTML = ''; zeige(0); }, stop);
  }

  /* =======================================================================
     DEMO 2 – Erinnerungs-Automation
     ======================================================================= */
  var FLOW = [
    { ic:'clock',    t:'Jeden Morgen um 07:00', s:'n8n startet automatisch' },
    { ic:'database', t:'Fahrzeugbestand prüfen', s:'1.842 Kundenfahrzeuge',
      o:'→ 14 × HU-Ablauf in 4 Wochen\n→ 31 × Reifenwechsel fällig' },
    { ic:'sparkle',  t:'Nachricht personalisieren', s:'Name, Fahrzeug, Termin',
      o:'„Hallo Herr Weber, bei Ihrem Octavia\n(MU-KL 88) läuft im November die HU ab.\nDi, 04.11. um 09:00 hätte ich frei."' },
    { ic:'whatsapp', t:'Per WhatsApp versenden', s:'45 Nachrichten, 0 Minuten Aufwand',
      o:'✓ 45 zugestellt · 38 gelesen' },
    { ic:'calendar', t:'Antworten verarbeiten', s:'Der Assistent bucht direkt ein',
      o:'→ 19 Termine gebucht\n→ 2 Rückrufwünsche an den Chef' }
  ];

  function demoFlow(root) {
    root.querySelector('.flowbody').innerHTML = FLOW.map(function (f) {
      return '<div class="fstep"><span class="fnode">' + icon(f.ic) + '</span>' +
        '<span class="fbody"><b>' + f.t + '</b><span>' + f.s + '</span>' +
        (f.o ? '<div class="out">' + esc(f.o) + '</div>' : '') + '</span></div>';
    }).join('');

    var steps = root.querySelectorAll('.fstep');
    var cnt = root.querySelector('.cnt'), euro = root.querySelector('.euro');
    var timer = [];
    function stop() { timer.forEach(clearTimeout); timer = []; }

    function zaehl(el, ziel, ms) {
      var t0 = performance.now();
      (function tick(now) {
        var p = Math.min((now - t0) / ms, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ziel * e).toLocaleString('de-DE') + ' €';
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }

    function lauf() {
      stop();
      steps.forEach(function (s) { s.classList.remove('live'); });
      if (cnt) cnt.textContent = '–';
      if (euro) euro.textContent = '0 €';
      steps.forEach(function (s, i) {
        timer.push(setTimeout(function () {
          s.classList.add('live');
          if (i === 1 && cnt) cnt.textContent = '45 Treffer';
          if (i === steps.length - 1 && euro) zaehl(euro, 5320, 1300);
        }, 800 + i * 1400));
      });
      timer.push(setTimeout(lauf, 800 + steps.length * 1400 + 5500));
    }

    if (reduce) {
      steps.forEach(function (s) { s.classList.add('live'); });
      if (cnt) cnt.textContent = '45 Treffer';
      if (euro) euro.textContent = '5.320 €';
      return;
    }
    sicht(root, lauf, stop);
    var b = root.querySelector('.replay');
    if (b) b.addEventListener('click', lauf);
  }

  /* =======================================================================
     DEMO 3 – Social-Media-Autopilot
     ======================================================================= */
  var POSTS = [
    { bild:'reifen',   a:'Winterreifen', b:'jetzt wechseln', likes:87,
      cap:'O bis O – von Oktober bis Ostern. Diese Woche noch Termine frei.', tags:'#winterreifen #musterstadt', zeit:'vor 2 Stunden' },
    { bild:'diagnose', a:'Motorkontroll-', b:'leuchte an?', likes:124,
      cap:'Erst auslesen, dann reparieren. Diagnose 59 € – wird bei Auftrag angerechnet.', tags:'#kfzdiagnose #werkstatt', zeit:'vor 1 Tag' },
    { bild:'oldtimer', a:'Feierabend-', b:'projekt', likes:341,
      cap:'Dieser Käfer von 1972 war drei Jahre eingemottet. Nächste Woche H-Abnahme. 🐞', tags:'#oldtimer #käfer', zeit:'vor 2 Tagen' },
    { bild:'oel',      a:'Inspektion', b:'ab 189 €', likes:66,
      cap:'Nach Herstellervorgabe gewartet – Ihre Garantie bleibt erhalten.', tags:'#inspektion #service', zeit:'vor 3 Tagen' },
    { bild:'motor',    a:'Zahnriemen', b:'oder Kette?', likes:209,
      cap:'Die Frage kommt jede Woche. Beim Riemen zählt das Intervall, bei der Kette das Geräusch.', tags:'#autowissen', zeit:'vor 5 Tagen' },
    { bild:'werkzeug', a:'Neu im Haus:', b:'Achsvermessung', likes:153,
      cap:'Ab sofort vermessen wir selbst – nach jedem Eingriff am Fahrwerk.', tags:'#achsvermessung', zeit:'vor 6 Tagen' }
  ];

  function postHtml(p) {
    return '<article class="igpost">' +
      '<div class="igbar"><span class="igav"><i>MW</i></span>' +
        '<span><b>musterwerkstatt</b><span>' + p.zeit + '</span></span></div>' +
      '<div class="igimg"><img src="' + bild(p.bild, 520) + '" alt="" loading="lazy" decoding="async">' +
        '<div class="igov"><b>' + p.a + ' <em>' + p.b + '</em></b><span>Musterwerkstatt · Musterstadt</span></div></div>' +
      '<div class="igacts">' + icon('heart') + icon('chat') + icon('send') +
        '<span class="last">' + icon('bookmark') + '</span></div>' +
      '<div class="iglikes">' + p.likes + ' Gefällt mir</div>' +
      '<div class="igcap"><b>musterwerkstatt</b> ' + p.cap + ' <span class="tags">' + p.tags + '</span></div>' +
    '</article>';
  }

  function demoInsta(root) {
    var track = root.querySelector('.igtrack');
    track.innerHTML = POSTS.map(postHtml).join('') + POSTS.map(postHtml).join('');
    if (reduce) return;

    var y = 0, an = false, raf = null, letzte = 0;
    function tick(now) {
      if (!an) return;
      var dt = letzte ? now - letzte : 16;
      letzte = now;
      y += dt * 0.024;
      var h = track.scrollHeight / 2;
      if (h > 0 && y >= h) y -= h;
      track.style.transform = 'translateY(' + -y + 'px)';
      raf = requestAnimationFrame(tick);
    }
    function start() { if (an) return; an = true; letzte = 0; raf = requestAnimationFrame(tick); }
    function stop() { an = false; if (raf) cancelAnimationFrame(raf); }

    sicht(root, start, stop);
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
  }

  /* Startet/stoppt eine Animation je nach Sichtbarkeit */
  function sicht(el, start, stop) {
    if (!('IntersectionObserver' in window)) { start(); return; }
    var laeuft = false;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !laeuft) { laeuft = true; start(); }
        else if (!e.isIntersecting && laeuft) { laeuft = false; if (stop) stop(); }
      });
    }, { threshold: .3 }).observe(el);
  }

  /* =======================================================================
     Start
     ======================================================================= */
  function init() {
    renderLeistungen();
    renderFunktionen();
    renderAblauf();
    renderZeiten();
    renderPakete();
    fuellePlatzhalter();
    navigation();
    schalter();
    beobachte();

    var bu = document.getElementById('demo-buehne'); if (bu) demoBuehne(bu);
    var wa = document.getElementById('demo-wa');   if (wa) demoWhatsApp(wa);
    var fl = document.getElementById('demo-flow'); if (fl) demoFlow(fl);
    var ig = document.getElementById('demo-ig');   if (ig) demoInsta(ig);

    var jahr = document.getElementById('jahr');
    if (jahr) jahr.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
