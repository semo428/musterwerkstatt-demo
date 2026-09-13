/* =========================================================================
   Werkstatt-Assistent
   Ein Gesprächsverlauf, zwei Fenster: fest im Hero und schwebend beim Scrollen.
   Live über den n8n-Chat-Trigger, sonst Demomodus mit hinterlegten Antworten.
   ========================================================================= */
(function () {
  'use strict';

  var S = window.SITE; if (!S) return;
  var C = S.chat;
  var ICON = window.icon;

  var live = !!(C.webhookUrl && C.webhookUrl.indexOf('http') === 0);
  var sendet = false;
  var views = [];                 // alle gemounteten Fenster
  var verlauf = [];               // {text, who}

  var sessionId = (function () {
    try {
      var v = sessionStorage.getItem('mw_sid');
      if (!v) { v = 'web-' + Math.random().toString(36).slice(2, 12); sessionStorage.setItem('mw_sid', v); }
      return v;
    } catch (e) { return 'web-' + Math.random().toString(36).slice(2, 12); }
  })();

  /* ---------- Markup eines Fensters ---------- */
  function boxHtml(mitSchliessen) {
    return '<div class="chatbox">' +
      '<div class="chead">' +
        '<span class="cav">' + ICON('chat') + '</span>' +
        '<span class="ctxt"><b>' + C.titel + '</b><span><i class="dotlive"></i>' + C.untertitel + '</span></span>' +
        (mitSchliessen ? '<button class="cx" type="button" aria-label="Schließen">×</button>' : '') +
      '</div>' +
      '<div class="clog" aria-live="polite"></div>' +
      '<div class="chips"></div>' +
      '<div class="cfoot">' +
        '<form class="cform">' +
          '<textarea rows="1" maxlength="2000" aria-label="Ihre Nachricht" ' +
            'placeholder="Frage stellen oder Termin nennen …"></textarea>' +
          '<button class="csend" type="submit" aria-label="Senden" disabled>' + ICON('send') + '</button>' +
        '</form>' +
        '<div class="clegal">' + (live
          ? 'KI-Assistent · Antworten können Fehler enthalten'
          : 'Demomodus – noch kein n8n-Webhook hinterlegt') + '</div>' +
      '</div>' +
    '</div>';
  }

  function fmt(t) {
    return String(t)
      .replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; })
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  /* ---------- Ein Fenster aufbauen ---------- */
  function mount(host, mitSchliessen) {
    host.innerHTML = boxHtml(mitSchliessen);

    var v = {
      log:   host.querySelector('.clog'),
      chips: host.querySelector('.chips'),
      form:  host.querySelector('.cform'),
      input: host.querySelector('textarea'),
      send:  host.querySelector('.csend')
    };

    // bisherigen Verlauf nachzeichnen
    verlauf.forEach(function (m) { zeichne(v, m.text, m.who); });
    zeichneChips(v);
    // Bei reiner Begrüßung oben beginnen – sonst ist der erste Satz abgeschnitten
    if (verlauf.length <= 1) v.log.scrollTop = 0;

    v.form.addEventListener('submit', function (e) { e.preventDefault(); frage(v.input.value); });
    v.input.addEventListener('input', function () {
      v.send.disabled = !v.input.value.trim() || sendet;
      v.input.style.height = 'auto';
      v.input.style.height = Math.min(v.input.scrollHeight, 100) + 'px';
    });
    v.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); frage(v.input.value); }
    });
    v.chips.addEventListener('click', function (e) {
      var b = e.target.closest('.chip'); if (b) frage(b.textContent);
    });

    var x = host.querySelector('.cx');
    if (x) x.addEventListener('click', function () { schwebendAuf(false); });

    views.push(v);
    return v;
  }

  function zeichne(v, text, who) {
    var d = document.createElement('div');
    d.className = 'msg ' + who;
    d.innerHTML = fmt(text);
    v.log.appendChild(d);
    v.log.scrollTop = v.log.scrollHeight;
  }

  function zeichneChips(v) {
    v.chips.innerHTML = (C.vorschlaege || []).map(function (t) {
      return '<button class="chip" type="button">' + t + '</button>';
    }).join('');
  }

  function add(text, who) {
    verlauf.push({ text: text, who: who });
    views.forEach(function (v) { zeichne(v, text, who); });
  }

  function tippen(an) {
    views.forEach(function (v) {
      var t = v.log.querySelector('.typ');
      if (an && !t) {
        t = document.createElement('div');
        t.className = 'msg bot typ';
        t.innerHTML = '<i></i><i></i><i></i>';
        v.log.appendChild(t);
        v.log.scrollTop = v.log.scrollHeight;
      } else if (!an && t) { t.remove(); }
    });
  }

  function sperren(an) {
    sendet = an;
    views.forEach(function (v) {
      v.send.disabled = an || !v.input.value.trim();
      if (!an) v.chips.style.display = 'none';
    });
  }

  /* ---------- Demoantworten ---------- */
  var DEMO = [
    { re: /(hu\b|au\b|haupt|abgas|t[üu]v|plakette)/i, a:
      'Die HU inklusive AU kostet bei uns ab 139 € für Pkw bis 3,5 t und dauert rund 45 Minuten. Geprüft wird jeden Dienstag und Donnerstag direkt im Haus.\n\nVorher machen wir einen kostenlosen Vorabcheck – so finden wir Mängel, bevor der Prüfer sie findet, und Sie sparen sich die Nachprüfung.\n\nSoll ich nach einem Termin schauen? Dann bräuchte ich Fahrzeug, Kennzeichen und Ihre Telefonnummer.' },
    { re: /(reifen|r[äa]der|wechsel|winterreifen|sommerreifen|einlager)/i, a:
      'Der Radwechsel kostet ab 39 €, inklusive Auswuchten und Prüfen der RDKS-Sensoren. Die Einlagerung im klimatisierten Reifenhotel liegt bei 49 € pro Saison.\n\nDauer: 30 bis 45 Minuten.\n\nIch habe diese Woche noch frei:\n• Mittwoch, 08:30 Uhr\n• Donnerstag, 14:00 Uhr\n• Freitag, 09:15 Uhr\n\nWas passt Ihnen? Ich bräuchte dann noch Ihren Namen und eine Telefonnummer.' },
    { re: /(garantie|hersteller|vertragswerkstatt|serviceheft)/i, a:
      'Nein, Ihre Garantie bleibt vollständig erhalten. Wir warten streng nach Herstellervorgabe und tragen alles ins digitale Serviceheft ein.\n\nSeit der EU-Gruppenfreistellungsverordnung darf jede qualifizierte freie Werkstatt die Wartung übernehmen, ohne dass die Neuwagen- oder Mobilitätsgarantie erlischt.\n\nDie kleine Inspektion beginnt bei 189 €. Soll ich einen Termin vormerken?' },
    { re: /(motorkontroll|warnleuchte|leuchte|check.?engine|fehlerspeicher)/i, a:
      'Das lässt sich seriös nur durch Auslesen klären. Wichtig vorab: Wenn die Leuchte **blinkt** oder der Motor unrund läuft, fahren Sie bitte nicht weiter und rufen Sie uns direkt an – 07571 123456.\n\nLeuchtet sie dauerhaft und das Auto fährt normal, können Sie vorsichtig zu uns kommen. Die Diagnose kostet 59 € und dauert 45 bis 90 Minuten; beauftragen Sie danach die Reparatur, rechnen wir sie an.\n\nSoll ich Ihnen kurzfristig einen Diagnosetermin suchen?' },
    { re: /(bremse|bel[äa]g|scheibe|quietsch|schleif)/i, a:
      'Schleifen beim Bremsen deutet meist auf abgefahrene Beläge hin – manchmal sitzt auch nur ein Steinchen im Sattel. Sicher sagen lässt sich das erst, wenn wir das Rad abnehmen.\n\nBremsen vorne inklusive Belägen, Scheiben und Material liegen ab 249 €, die Arbeit dauert zwei bis drei Stunden.\n\nWeil die Bremse sicherheitsrelevant ist, schieben wir Sie möglichst noch diese Woche dazwischen. Wann könnten Sie?' },
    { re: /(klima|k[üa]hl|kalt|riecht|k[äa]ltemittel)/i, a:
      'Meistens fehlt einfach Kältemittel – eine Klimaanlage verliert jährlich etwas, auch ohne Defekt.\n\nDer Klimaservice kostet ab 99 € für R134a und ab 159 € für das neuere R1234yf. Enthalten sind Befüllen, Dichtheitsprüfung und eine Desinfektion gegen Geruch und Keime. Dauer: etwa eine Stunde.\n\nWird die Anlage kurz danach wieder schwach, liegt ein Leck vor – das suchen wir dann mit Kontrastmittel.' },
    { re: /(ersatzwagen|leihwagen|mietwagen|mobil)/i, a:
      'Ja – bei Inspektion, Reparatur und Unfallinstandsetzung stellen wir Ihnen kostenfrei einen Ersatzwagen, solange eines unserer beiden Fahrzeuge frei ist.\n\nSagen Sie einfach bei der Terminbuchung Bescheid, dann reserviere ich ihn direkt mit.' },
    { re: /(inspektion|wartung|[öo]lwechsel|service)/i, a:
      'Die kleine Inspektion beginnt bei 189 € und dauert zwei bis vier Stunden. Gewartet wird nach Herstellervorgabe, Ihre Garantie bleibt erhalten, und der Eintrag ins digitale Serviceheft ist inklusive.\n\nVor jeder Arbeit bekommen Sie einen schriftlichen Kostenvoranschlag – was mehr wird, besprechen wir vorher mit Ihnen.\n\nEin Ersatzwagen steht auf Wunsch kostenfrei bereit. Wann würde es Ihnen passen?' },
    { re: /(termin|buchen|wann|frei|zeit haben)/i, a:
      'Sehr gern. Damit ich im Kalender nachsehen kann, brauche ich drei Dinge:\n\n1. Worum geht es – HU, Inspektion, Reifen, Bremsen?\n2. Fahrzeug und Kennzeichen\n3. Ihr Name und eine Telefonnummer\n\nDann schlage ich Ihnen zwei bis drei konkrete Termine vor und buche direkt ein.' },
    { re: /(preis|kostet|kosten|teuer|stundensatz)/i, a:
      'Unser Stundensatz liegt bei 89 €. Wichtiger ist aber: Vor jeder Reparatur bekommen Sie einen schriftlichen Kostenvoranschlag, und was darüber hinausginge, besprechen wir vorher mit Ihnen.\n\nZu welcher Leistung möchten Sie es genau wissen?' },
    { re: /([öo]ffnung|geschlossen|offen|samstag|sonntag|wann.*da)/i, a:
      'Montag bis Freitag von 08:00 bis 12:00 und von 13:00 bis 18:00 Uhr, samstags von 09:00 bis 13:00 Uhr. Sonntags ist geschlossen.\n\nIch selbst bin rund um die Uhr erreichbar – Sie können also auch jetzt schon einen Termin festmachen.' },
    { re: /(abschlepp|panne|notfall|liegen ?geblieben|springt nicht|unfall)/i, a:
      'Wenn Sie liegengeblieben sind, rufen Sie bitte direkt unter **0151 2345678** an – dann organisieren wir das Abschleppen.\n\nStehen Sie auf der Autobahn oder in gefährlicher Position: zuerst absichern, Warnweste anlegen, hinter die Leitplanke und die 110 verständigen.' },
    { re: /(adresse|wo seid|wo ist|anfahrt|finden|parken)/i, a:
      'Sie finden uns in der Industriestraße 14, 72488 Musterstadt. Zwölf Kundenparkplätze liegen direkt vor der Halle, die Fahrzeugannahme ist die erste Tür rechts.' },
    { re: /(oldtimer|youngtimer|h.?kennzeichen|k[äa]fer|restaur)/i, a:
      'Oldtimer sind bei uns gut aufgehoben. Wir bereiten Fahrzeuge auf die H-Kennzeichen-Abnahme vor und begleiten Sie zum Termin, Teile beschaffen wir über unser Lieferantennetz.\n\nUm welches Modell und Baujahr geht es denn?' },
    { re: /(werkstattinhaber|assistent|bot|ki\b|anbieten|ask connect|kostet.*bot)/i, a:
      'Sie sind Werkstattinhaber? Dann sind Sie hier genau richtig – diese Seite ist eine Demo von ASK Connect.\n\nIch bin genau das Produkt: ein Assistent, der Ihre Leistungen und Preise kennt, Fragen beantwortet und Termine in Ihren Google Kalender einträgt. Auch abends und am Wochenende.\n\nScrollen Sie auf dieser Seite zum Abschnitt „Für Werkstattinhaber" – dort steht, was das kostet und wie die Einführung abläuft.' }
  ];

  function demoAntwort(t) {
    for (var i = 0; i < DEMO.length; i++) if (DEMO[i].re.test(t)) return DEMO[i].a;
    return 'Das kann ich Ihnen aus dem Stand nicht sicher beantworten – und raten möchte ich bei Ihrem Fahrzeug nicht.\n\n' +
      'Rufen Sie uns gern unter ' + S.kontakt.telefon + ' an, oder schildern Sie mir Ihr Anliegen etwas genauer. ' +
      'Ich kann Ihnen auch direkt einen Rückruf einplanen.';
  }

  /* ---------- Senden ---------- */
  function frage(text) {
    text = (text || '').trim();
    if (!text || sendet) return;

    sperren(true);
    add(text, 'me');
    views.forEach(function (v) { v.input.value = ''; v.input.style.height = 'auto'; });
    tippen(true);

    if (!live) {
      setTimeout(function () {
        tippen(false);
        add(demoAntwort(text), 'bot');
        sperren(false);
      }, 750 + Math.min(text.length * 15, 1000));
      return;
    }

    var ctrl = new AbortController();
    var frist = setTimeout(function () { ctrl.abort(); }, 45000);

    fetch(C.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'sendMessage', sessionId: sessionId, chatInput: text }),
      signal: ctrl.signal
    })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); })
      .then(function (raw) {
        var out = raw;
        try {
          var j = JSON.parse(raw);
          if (Array.isArray(j)) j = j[0] || {};
          out = j.output || j.text || j.message || j.answer || j.response ||
                (j.json && (j.json.output || j.json.text)) || raw;
        } catch (e) { /* Klartext */ }
        tippen(false);
        add(typeof out === 'string' ? out : JSON.stringify(out), 'bot');
      })
      .catch(function (err) {
        tippen(false);
        add('Die Verbindung zum Assistenten hat gerade nicht geklappt' +
            (err && err.name === 'AbortError' ? ' (Zeitüberschreitung)' : '') +
            '. Rufen Sie uns gern direkt an: ' + S.kontakt.telefon, 'bot err');
      })
      .finally(function () { clearTimeout(frist); sperren(false); });
  }

  /* ---------- Schwebendes Fenster ---------- */
  var fab, floater, offen = false, floatAufgebaut = false;
  var heroSichtbar = true;   // eine Quelle der Wahrheit für beide Fenster

  function schwebendAuf(v) {
    offen = v;
    floater.classList.toggle('open', v);
    fab.classList.toggle('open', v);
    fab.setAttribute('aria-expanded', String(v));
    if (v && !floatAufgebaut) { floatAufgebaut = true; mount(floater, true); }
    if (v) setTimeout(function () {
      var t = floater.querySelector('textarea'); if (t) t.focus();
    }, 260);
  }

  /* ---------- Öffentlicher Einstieg für die Ask-Buttons ---------- */
  window.assistentFragen = function (text) {
    var hero = document.getElementById('chat-hero');
    if (hero && heroSichtbar) {
      hero.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { frage(text); }, 260);
    } else {
      schwebendAuf(true);
      setTimeout(function () { frage(text); }, 320);
    }
  };

  /* ---------- Start ---------- */
  function init() {
    var hero = document.getElementById('chat-hero');
    if (hero) mount(hero, false);

    var schmal = window.matchMedia && window.matchMedia('(max-width:620px)').matches;
    add(schmal && C.begruessungKurz ? C.begruessungKurz : C.begruessung, 'bot');
    views.forEach(function (v) { v.log.scrollTop = 0; });

    var holder = document.createElement('div');
    holder.innerHTML =
      '<div class="float" id="chat-float" role="dialog" aria-label="Werkstatt-Assistent"></div>' +
      '<button class="fab" id="chat-fab" aria-label="Assistent öffnen" aria-expanded="false">' +
        '<span class="pip"></span>' +
        '<span class="ic1">' + ICON('chat') + '</span>' +
        '<span class="ic2">' + ICON('close') + '</span>' +
      '</button>';
    document.body.appendChild(holder);
    fab = document.getElementById('chat-fab');
    floater = document.getElementById('chat-float');

    fab.addEventListener('click', function () { schwebendAuf(!offen); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && offen) schwebendAuf(false);
    });

    // Knopf erscheint, sobald der Hero-Chat aus dem Blick ist
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        heroSichtbar = es[0].isIntersecting;
        fab.classList.toggle('show', !heroSichtbar);
        if (heroSichtbar && offen) schwebendAuf(false);
      }, { threshold: .25 }).observe(hero);
    } else {
      heroSichtbar = false;
      fab.classList.add('show');
    }

    // Ask-Buttons auf der Seite
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-frage]');
      if (b) { e.preventDefault(); window.assistentFragen(b.dataset.frage); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
