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
    inhaber:  'Thomas Meier',
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
    vorschlaege: [
      'Was kostet die HU?',
      'Termin für Reifenwechsel',
      'Bekomme ich einen Ersatzwagen?',
      'Motorkontrollleuchte leuchtet'
    ]
  },

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

  /* --- Pakete  ▸ HIER EURE ECHTEN PREISE EINTRAGEN ---------------------- */
  pakete: [
    { name:'Website-Assistent', setup:'690 €', monat:'89 €', top:false,
      punkte:['Chat-Assistent auf Ihrer Website','Antworten aus Ihrer Wissensbasis','Terminbuchung in Google Kalender'] },
    { name:'+ WhatsApp', setup:'1.290 €', monat:'149 €', top:true,
      punkte:['Alles aus Website-Assistent','Derselbe Bot auf WhatsApp','Automatische HU- und Saison-Erinnerungen','Terminerinnerung gegen No-Shows'] },
    { name:'Rundum', setup:'1.990 €', monat:'249 €', top:false,
      punkte:['Alles aus + WhatsApp','Social-Media-Autopilot','Automatische Bewertungsanfragen'] }
  ]
};
