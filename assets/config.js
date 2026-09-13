/* =========================================================================
   Musterwerkstatt – Demoseite für ASK Connect
   Eine Datei für alle Inhalte. Für einen neuen Kunden nur hier anpassen.
   ========================================================================= */

window.SITE = {

  /* --- Betrieb (Kulisse) ----------------------------------------------- */
  betrieb: {
    name:     'Musterwerkstatt',
    nameLang: 'Musterwerkstatt Meier GmbH',
    claim:    'Kompetent. Ehrlich. Zuverlässig.',
    seit:     1998
  },

  kontakt: {
    strasse:     'Industriestraße 14',
    plz:         '72488',
    stadt:       'Musterstadt',
    telefon:     '07571 123456',
    telefonHref: '+497571123456',
    mail:        'info@musterwerkstatt-demo.de'
  },

  zeiten: [
    { tag: 'Mo – Fr', zeit: '08:00 – 12:00 & 13:00 – 18:00' },
    { tag: 'Samstag', zeit: '09:00 – 13:00' },
    { tag: 'Sonntag', zeit: 'geschlossen', zu: true }
  ],

  /* --- Leistungen ------------------------------------------------------
     frage = wird beim Klick auf den Ask-Button direkt an den Bot geschickt
     -------------------------------------------------------------------- */
  leistungen: [
    { id:'hu', titel:'HU / AU', icon:'shield', bild:'diagnose',
      kurz:'Haupt- und Abgasuntersuchung im Haus, inklusive kostenlosem Vorabcheck.',
      preis:'ab 139 €',
      frage:'Was kostet die HU?' },

    { id:'inspektion', titel:'Inspektion & Wartung', icon:'wrench', bild:'oel',
      kurz:'Nach Herstellervorgabe – Ihre Garantie bleibt vollständig erhalten.',
      preis:'ab 189 €',
      frage:'Bleibt meine Garantie erhalten?' },

    { id:'reifen', titel:'Reifenservice', icon:'tyre', bild:'reifen',
      kurz:'Wechseln, auswuchten, RDKS anlernen – Einlagerung im Reifenhotel.',
      preis:'ab 39 €',
      frage:'Termin für Reifenwechsel?' },

    { id:'bremsen', titel:'Bremsen & Fahrwerk', icon:'disc', bild:'werkzeug',
      kurz:'Beläge, Scheiben, Stoßdämpfer und Achsvermessung auf dem Prüfstand.',
      preis:'ab 249 €',
      frage:'Meine Bremsen schleifen – was tun?' },

    { id:'klima', titel:'Klimaservice', icon:'snow', bild:'fahren',
      kurz:'Befüllen, desinfizieren, Dichtheit prüfen – R134a und R1234yf.',
      preis:'ab 99 €',
      frage:'Klimaanlage kühlt schlecht' },

    { id:'diagnose', titel:'Fehlerdiagnose', icon:'chip', bild:'elektrik',
      kurz:'Motorkontrollleuchte an? Wir lesen aus, was wirklich los ist.',
      preis:'59 €',
      frage:'Motorkontrollleuchte an – was nun?' }
  ],

  weitere: 'Außerdem: Reparaturen aller Art · Unfallinstandsetzung · Oldtimer & Youngtimer',

  /* --- Der Assistent (unser Produkt) ------------------------------------ */
  chat: {
    webhookUrl:  'https://n8n-dev.askconnect.de/webhook/kfz-website-chat/chat',
    titel:       'Werkstatt-Assistent',
    untertitel:  'Antwortet sofort · 24/7',
    begruessung: 'Guten Tag! Ich bin der digitale Assistent der Musterwerkstatt. Ich kenne unsere Leistungen, Preise und den Werkstattkalender – fragen Sie mich einfach, oder lassen Sie sich direkt einen Termin einbuchen.',
    begruessungKurz: 'Guten Tag! Ich kenne Preise, Leistungen und den Kalender – fragen Sie mich einfach.',
    vorschlaege: [
      'Was kostet die HU?',
      'Termin für Reifenwechsel',
      'Bekomme ich einen Ersatzwagen?',
      'Motorkontrollleuchte leuchtet'
    ]
  },

  /* --- Was der Assistent kann (Abschnitt „In Aktion") -------------------- */
  funktionen: [
    { icon:'clock',    titel:'Antwortet rund um die Uhr',
      text:'Abends, sonntags, in der Mittagspause – genau dann, wenn bei Ihnen niemand ans Telefon geht.' },
    { icon:'calendar', titel:'Bucht selbstständig Termine',
      text:'Er kennt Ihre Terminarten samt Dauer, prüft den Kalender und trägt verbindlich ein.' },
    { icon:'phone',    titel:'Vergibt Rückruf-Zeitfenster',
      text:'Gehört ein Anliegen ans Telefon, bietet er Zeiten an, zu denen Sie laut Kalender wirklich können.' },
    { icon:'shield',   titel:'Erfindet nichts',
      text:'Er antwortet nur aus Ihrer freigegebenen Wissensbasis. Weiß er etwas nicht, sagt er das offen.' },
    { icon:'database', titel:'Nimmt alles vollständig auf',
      text:'Name, Telefon, Fahrzeug, Kennzeichen, Anliegen – kein Zettel mit halben Angaben mehr.' },
    { icon:'bolt',     titel:'Erkennt Notfälle',
      text:'Bei Panne oder defekten Bremsen bucht er keinen Termin, sondern nennt sofort Ihre Nummer.' }
  ],

  /* --- Bilder (Unsplash-IDs, geprüft) ----------------------------------- */
  bilder: {
    hero:     'photo-1625047509168-a7026f36de04',
    halle:    'photo-1615906655593-ad0386982a0f',
    meister:  'photo-1558618666-fcd25c85cd64',
    werkzeug: 'photo-1530046339160-ce3e530c7d2f',
    motor:    'photo-1486262715619-67b85e0b08d3',
    oel:      'photo-1487754180451-c456f719a1fc',
    reifen:   'photo-1578844251758-2f71da64c96f',
    diagnose: 'photo-1606577924006-27d39b132ae2',
    elektrik: 'photo-1581092918056-0c4c3acd3789',
    oldtimer: 'photo-1489824904134-891ab64532f1',
    fahren:   'photo-1449965408869-eaa3f722e40d',
    abend:    'photo-1493238792000-8113da705763'
  },

  /* --- Anbieter --------------------------------------------------------- */
  anbieter: {
    name:  'ASK Connect',
    claim: 'KI-Assistenten für Kfz-Betriebe',
    mail:  'info@askconnect.de'
  },

  /* --- Pakete -----------------------------------------------------------
     Drei eigenständige Angebote, keine Stufenleiter.
     spanne = einmalige Einrichtung · monat = laufender Betrieb
     -------------------------------------------------------------------- */
  pakete: [
    {
      name:   'Social-Media-Autopilot',
      fuer:   'Nur Marketing – auch ohne Assistent buchbar.',
      spanne: '399 – 599 €',
      monat:  '34,99 €',
      top:    false,
      punkte: [
        'Beiträge für Instagram und Facebook',
        'Saisonthemen sind hinterlegt',
        'Ein Foto per WhatsApp genügt',
        'Freigabe vor jeder Veröffentlichung'
      ]
    },
    {
      name:   'Website-Assistent',
      fuer:   'Der Einstieg: Fragen und Termine auf Ihrer Seite.',
      spanne: '399 – 599 €',
      monat:  '39,99 €',
      top:    false,
      punkte: [
        'Assistent in Ihrem Erscheinungsbild',
        'Antworten nur aus Ihrer Wissensbasis',
        'Termine direkt in Google Kalender',
        'Wahlweise nur Rückruf-Zeitfenster'
      ]
    },
    {
      name:   'Assistent + WhatsApp',
      fuer:   'Erreichbar auf dem Kanal, den Ihre Kunden nutzen.',
      spanne: '699 – 999 €',
      monat:  '49,99 €',
      top:    true,
      punkte: [
        'Alles aus dem Website-Assistenten',
        'Ihre Werkstattnummer wird angebunden',
        'Erinnerungen an HU, Inspektion, Reifen',
        'Terminerinnerung gegen No-Shows'
      ]
    },
    {
      name:   'All-in',
      fuer:   'Alles zusammen – Anfragen und Marketing.',
      spanne: '1.099 – 1.399 €',
      monat:  '69,99 €',
      top:    false,
      punkte: [
        'Alles aus „Assistent + WhatsApp“',
        'Plus kompletter Social-Media-Autopilot',
        'Günstiger als beide Pakete einzeln',
        'Quartalsgespräch zur Feinjustierung'
      ]
    }
  ],

  /* --- Ablauf der Zusammenarbeit ---------------------------------------- */
  ablauf: [
    { titel:'Kostenloses Erstgespräch',
      text:'20 bis 30 Minuten am Telefon oder bei Ihnen vor Ort. Sie erzählen, wie Anfragen bei Ihnen hereinkommen und was am meisten Zeit frisst. Danach wissen Sie, ob sich das für Ihren Betrieb lohnt – unverbindlich und ohne Kosten.' },
    { titel:'Wir schauen uns Ihren Alltag an',
      text:'Welche Fragen kommen immer wieder? Wo bleiben Anfragen liegen? Wir suchen die zwei, drei Stellen mit dem größten Hebel – statt Ihren ganzen Betrieb umzukrempeln.' },
    { titel:'Sie bekommen ein festes Angebot',
      text:'Ein Vorschlag mit klarem Umfang, festem Preis und benannten laufenden Kosten. Keine Stundenzettel, keine Überraschungen auf der Rechnung.' },
    { titel:'Wir richten alles ein',
      text:'Wir sammeln Ihre Unterlagen ein – Preisliste, Leistungen, häufige Fragen –, bauen den Assistenten und binden ihn in Ihre Website ein. Ihr Aufwand: ein bis zwei Termine, den Rest machen wir.' },
    { titel:'Zwei Wochen testen – das Risiko liegt bei uns',
      hervor: true,
      text:'Sie und Ihr Team probieren alles in Ruhe aus und sagen uns, wo die Antworten noch nicht passen. Überzeugt es Sie nicht, geben Sie es zurück – vom Einrichtungspreis zahlen Sie dann keinen Cent. Offen bleiben nur die Kosten, die im Testbetrieb wirklich angefallen sind, etwa für Hosting und KI-Nutzung.' },
    { titel:'Wir bleiben erreichbar',
      text:'Nach dem Start schauen wir gemeinsam, was gut läuft und was noch fehlt. Wenn etwas hakt, sind wir kurzfristig für Sie da – und erweitern die Lösung, wenn Ihr Betrieb wächst.' }
  ]
};
