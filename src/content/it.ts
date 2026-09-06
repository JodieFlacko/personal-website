import type { SiteContent } from "@/types/site";

/** Italian copy.
 *
 *  A mirror of `en.ts`, not a loose translation. The qualifiers on the three
 *  measured figures are load-bearing and do not survive being smoothed out:
 *  *contati a entrambi gli estremi*, *nessun gruppo di controllo*, *una
 *  verifica, non un terzo risultato*, and *una stima* on the ERP hours. If a
 *  sentence here reads better without one of those, the sentence is wrong.
 *
 *  Numbers follow Italian convention — 19.185, 2,55%, 3,85 — and the runtime
 *  formats the animated counters from `<html lang>`, so the two agree.
 *
 *  Giuseppe should read these strings before launch. */
export const it: SiteContent = {
  slotNote: "Fotografia in arrivo",

  meta: {
    title: "Giuseppe Ciccone · Automazioni AI e strumenti interni",
    description:
      "Sviluppatore AI a Nola. Costruisco automazioni, assistenti AI e strumenti interni che tolgono il lavoro manuale e ripetitivo dalle operazioni commerciali — gestione ordini, API marketplace, integrazione ERP e AI conversazionale. Quattro sistemi in produzione in meno di sei mesi, uno dei quali misurato.",
    keywords: [
      "Giuseppe Ciccone",
      "automazione AI",
      "sviluppatore AI",
      "Amazon SP-API",
      "integrazione Mexal",
      "agent skill",
      "computer use",
      "sviluppatore Next.js",
      "applicazione Tauri",
      "sviluppatore freelance Italia",
    ],
    ogTitle: "Giuseppe Ciccone · Automazioni AI e strumenti interni",
    ogDescription:
      "Quattro sistemi in produzione in meno di sei mesi, sviluppatore unico. La copertura delle richieste di recensione è passata dal 2–4% al 98%, contata a entrambi gli estremi.",
  },

  nav: {
    work: "Lavori",
    about: "Chi sono",
    contact: "Contatti",
    cta: "Scrivimi",
    language: "Lingua",
  },

  hero: {
    stats: [
      {
        figure: "coverage",
        display: "98",
        label: "Copertura delle richieste di recensione, dal 2–4%",
      },
      {
        figure: "systems",
        display: "4",
        label: "Sistemi in produzione, sviluppatore unico, in meno di sei mesi",
      },
    ],
    headline: { before: "Nessuno lo fa più ", em: "a mano", after: "." },
    sub: "Costruisco automazioni, assistenti AI e strumenti interni che tolgono il lavoro manuale e ripetitivo dalle operazioni commerciali.",
    primary: "Apri la demo dal vivo",
    secondary: "Guarda i lavori",
    slot: "Ritratto",
  },

  results: {
    heading: "Che cosa è cambiato davvero.",
    lede: "Quattro sistemi in produzione per un cliente, e uno di questi misurato su una baseline contata invece che dichiarata.",
    rows: [
      {
        figure: "coverage",
        from: "2–4%",
        display: "98",
        label: "Copertura delle richieste di recensione",
        description:
          "19.185 sollecitazioni accettate su 19.575 tentativi in 100 giorni. **Entrambi gli estremi contati, non stimati.**",
        tag: "Misurato",
      },
      {
        figure: "reviewRate",
        from: "1,33%",
        display: "2,55",
        label: "Tasso di recensione ogni 100 unità",
        description:
          "A parità di prodotto, nei 100 giorni successivi — cinque famiglie di prodotto, 62 recensioni prima, 132 dopo. **Nessun gruppo di controllo**: il tasso si è mosso.",
        tag: "Misurato",
      },
      {
        figure: "rating",
        from: "3,85",
        display: "4,38",
        label: "Valutazione media",
        description:
          "**Una verifica, non un terzo risultato.** Sollecitare tutti gli acquirenti non ha abbassato la valutazione — e l'automazione non ha alcun meccanismo per alzarla.",
        tag: "Una verifica",
      },
      {
        figure: "orders",
        display: "280",
        label: "Ordini al giorno",
        description:
          "La scala a cui lavora l'operatività del cliente, tra Amazon, eBay, TikTok Shop e Temu — e il motivo per cui niente di tutto questo regge se fatto a mano.",
        tag: "Scala del cliente",
      },
    ],
    noteLabel: "Una stima, e l'etichetta ne fa parte",
    note: "Il lavoro mensile in Mexal sostituito dalla skill costava **una stima di 3,5–5,5 ore al mese**. Calcolata dai passaggi documentati, con ogni assunzione scritta — mai cronometrata, e mai citata come misurazione.",
  },

  capabilities: {
    heading: "Che cosa faccio davvero",
    body: "Sei capacità e un'abitudine. Dietro ogni scheda c'è un sistema che oggi è in funzione.",
    caption:
      "Ogni scheda è una capacità con dietro un sistema consegnato. I sistemi sono nella fila qui sotto.",
    centreSlot: "L'incisore laser in produzione",
    plates: [
      {
        area: "Automazione non presidiata",
        title: "Funziona senza nessuno",
        proof:
          "Un servizio Python su un VPS Hetzner sollecita ogni ordine Amazon idoneo e pubblica un riepilogo su Telegram. Un timer systemd alle 10:00 Europe/Rome — tutti i giorni, comprese le settimane in cui nessuno pensa alle recensioni.",
      },
      {
        area: "Automazione di processo",
        title: "Il prodotto è la procedura",
        proof:
          "Quando un sistema non ha API, l'unità automatizzabile è la procedura dell'operatore. Mi siedo a guardarla, la scrivo con la precisione che serve a un agente per eseguirla, e la irrobustisco su ciò che si è rotto davvero.",
      },
      {
        area: "Postazioni per agenti",
        title: "Gira sulla loro macchina",
        proof:
          "Un ambiente Claude sul PC Windows del cliente, sotto il suo account. Allestirlo si paga una volta sola; la procedura successiva che vogliono automatizzare è un documento, non un progetto.",
      },
      {
        area: "Aprire una capacità",
        title: "Una linea di prodotto che era chiusa",
        proof:
          "Template di incisione, un'applicazione Windows e la formazione degli operatori, consegnati insieme. Oggi vendono prodotti personalizzati incisi e prima non potevano — è una questione di capacità, non di efficienza.",
      },
      {
        area: "Sistema di riferimento",
        title: "Scritto dentro l'ERP",
        proof:
          "Ordini trasmessi in Mexal via WebAPI come veri Ordini Cliente, su un'integrazione ricostruita in sola lettura e riconciliata campo per campo con le schermate dell'ERP. Niente da riconciliare a fine mese.",
      },
      {
        area: "Prodotti LLM",
        title: "Progettati sul rifiuto",
        proof:
          "Un concierge in quattro lingue con un elenco esplicito di fatti che non può mai inventare, e il divieto di attenuare — perché «di solito alle 11:00» resta un orario inventato.",
      },
      {
        area: "Misurazione",
        title: "Il numero che regge",
        proof:
          "Sei specifiche testate su una baseline censuaria. La cifra più grande, aritmeticamente corretta, è stata scartata: era un artefatto di un denominatore che si restringeva.",
      },
    ],
  },

  story: {
    heading: "Quattro sistemi in produzione, e uno di questi misurato.",
    paragraphs: [
      "Lavoro come freelance da Nola, vicino Napoli. In meno di sei mesi ho consegnato **quattro sistemi in produzione** per un cliente — un'applicazione desktop Windows, un servizio backend non presidiato, una piattaforma di ordini B2B integrata con l'ERP, e una agent skill che gira sulla macchina dell'azienda. Sviluppatore unico su tutti e quattro: requisiti, sviluppo, messa in produzione e la formazione degli operatori, che è ciò che decide se uno strumento verrà davvero usato.",
      "Il cliente porta avanti due attività insieme — distribuzione all'ingrosso sull'ERP Mexal, e vendita al dettaglio su più marketplace tra Amazon, eBay, TikTok Shop e Temu, incisioni personalizzate comprese. **280+ ordini al giorno.** È quella combinazione a rendere il lavoro interessante: volumi alti, canali diversi ognuno con le sue regole, un ERP che è l'unica fonte di verità, e un laser alla fine della catena.",
      "Uno dei quattro l'ho misurato invece di dichiararlo, e ho riportato il movimento e non un effetto — non esisteva un gruppo di controllo, e sostenere il contrario non avrebbe retto alla prima persona che avesse chiesto come fosse stato ricavato. È su questa base che sto costruendo un'azienda di automazione AI.",
    ],
    cta: "Guarda i sistemi",
    slots: ["Nola, Italia", "La postazione dell'agente"],
  },

  work: {
    leadHeading: "Cinque sistemi. Quattro sono di un cliente.",
    leadBody:
      "Sviluppatore unico su ognuno — requisiti, sviluppo, messa in produzione e formazione degli operatori. Tutti e quattro i sistemi del cliente sono ancora in funzione; tre sono in uso quotidiano.",
    end: "Il quinto non è un caso studio. È dal vivo: si apre e le si parla.",
    endCta: "Apri la demo dal vivo",
    labels: {
      problem: "Problema",
      built: "Costruito",
      changed: "Cambiato",
      stack: "Stack",
    },
    projects: [
      {
        id: "reviews",
        kind: "Lavoro cliente · Victoria Marketing",
        title: "Automazione delle richieste di recensione Amazon",
        problem:
          "Amazon consente una sola richiesta di recensione per ordine idoneo, dentro una finestra che poi si chiude per sempre. Con 280+ ordini al giorno starci dietro a mano è aritmeticamente impossibile: veniva sollecitato solo il **2–4% degli ordini idonei**.",
        built:
          "Un servizio Python su un VPS Debian costruito sull'endpoint `solicitations` delle SP-API — la via ufficiale di prima parte, non uno script che pilota Seller Central. Un timer systemd parte una volta al giorno alle 10:00 Europe/Rome, con ritentativi limitati nella stessa giornata, e pubblica su Telegram il riepilogo di ciò che ha inviato.",
        changed:
          "La copertura è arrivata al **98%** — 19.185 sollecitazioni accettate su 19.575 tentativi in 100 giorni, contati a entrambi gli estremi. Nei 100 giorni successivi il tasso di recensione ogni 100 unità **è passato dall'1,33% al 2,55%** a parità di prodotto. In azienda nessuno esegue più alcun passaggio di questo processo.",
        slot: "Il riepilogo Telegram quotidiano",
      },
      {
        id: "lightburn",
        kind: "Lavoro cliente · Victoria Marketing",
        title: "Ponte Amazon → LightBurn",
        problem:
          "L'azienda aveva comprato un incisore laser e non ci vendeva nulla. Nessuno sapeva usare LightBurn, non esisteva un solo template di incisione, e il testo personalizzato dal cliente vive dentro il payload dell'ordine Amazon. **Non un processo lento: nessun processo.**",
        built:
          "I template di incisione, più un'applicazione Windows in Tauri v2 che legge la personalizzazione di ogni ordine, scrive il testo del cliente nel template `.lbrn2` corretto trovando i campi dal loro testo segnaposto, e lo apre in LightBurn pronto da mandare in macchina. Quattro release firmate sul suo canale di aggiornamento.",
        changed:
          "**Oggi vendono prodotti personalizzati incisi e prima non potevano.** È una questione di capacità, non di efficienza: prima non si produceva nulla, quindi non esiste una baseline e nessun numero sul tempo risparmiato viene rivendicato.",
        slot: "La coda ordini in produzione",
      },
      {
        id: "mexal",
        kind: "Lavoro cliente · Victoria Marketing",
        title: "Mexal OX → CO, come agent skill",
        problem:
          "Ogni mese, un giorno di calendario alla volta: filtrare l'elenco documenti su quella data, spuntare tutte le righe, leggere il totale selezionato, calcolarne una percentuale stabilita **a valore**, poi togliere le spunte finché il totale non corrispondeva — e confermare. Trentuno volte al mese, su una schermata senza annulla.",
        built:
          "La procedura scritta con la precisione che serve a un agente per eseguirla sulla finestra viva dell'ERP, e irrobustita su ciò che si è rotto davvero: Esc che distrugge la scheda di lavoro, Ctrl+Maiusc+Home che inietta cifre nei campi data, i tasti persi sotto i ~60 ms di distanza. Gira sulla macchina del cliente, sotto il suo account.",
        changed:
          "Tre parametri — data inizio, data fine, percentuale — e il mese va, con ogni selezione riconciliata **al centesimo** contro un valore previsto prima di qualunque conferma. Ha sostituito **una stima di 3,5–5,5 ore al mese**: stimate dai passaggi documentati, mai cronometrate.",
        mediaAlt: [
          "L'elenco documenti di Mexal filtrato su una singola data, con nomi cliente e riferimenti ordine pixelati.",
          "Il piede della stessa schermata, con il conteggio dei documenti e il totale selezionato; la cifra del cliente è pixelata.",
        ],
        caption:
          "Le due schermate su cui gira la procedura — redatte: ogni colonna con un nome cliente o un riferimento ordine è pixelata, e così il totale del cliente.",
      },
      {
        id: "b2b",
        kind: "Lavoro cliente · Victoria Marketing",
        title: "Piattaforma di ordini B2B + Mexal",
        problem:
          "Gli ordini B2B arrivavano per telefono, email, WhatsApp o tramite un rappresentante, e qualcuno in azienda li ribatteva a mano nell'ERP. Un e-commerce standard era la risposta sbagliata, e l'azienda lo ha detto chiaramente: il B2B si regola su condizioni negoziate e fatture a 30/60/90 giorni, non con una carta al checkout.",
        built:
          "Un portale ordini Next.js **senza pagamenti**, che scrive ogni ordine inviato direttamente in Mexal via WebAPI come vero Ordine Cliente, più shell Capacitor per iOS e Android: un solo deploy aggiorna il web e le due app. Il portale **non conserva alcun dato personale del cliente** — un cliente è un nome utente opaco, un PIN e un puntatore al suo codice Mexal.",
        changed:
          "Il canale è aperto e l'integrazione con l'ERP funziona da capo a fondo. **Un cliente business ha ordinato tramite la piattaforma.** Questo dimostra un sistema costruito e integrato — non dimostra un cambiamento nel modo in cui l'azienda vende, e portarci sopra i propri clienti è una sua decisione commerciale.",
        slot: "Il portale su smartphone",
      },
      {
        id: "marea",
        kind: "Progetto personale · dal vivo",
        title: "Marea — concierge AI",
        problem:
          "Un resort cinque stelle vende un'esperienza in cui la risposta a qualsiasi domanda deve arrivare subito. La gran parte delle domande degli ospiti sono sempre le stesse, ripetute, in quattro lingue, a qualunque ora — e le risolve personale il cui valore vero è tutto ciò che una macchina non sa fare.",
        built:
          "Un concierge fondato su una knowledge base scritta a mano per ogni struttura e compilata nel prompt — nessun retrieval, quindi si può leggere per intero ciò che lei sa. **Multi-tenant per costruzione:** il secondo hotel è una cartella e una variabile d'ambiente, non un fork.",
        changed:
          "Costruito di iniziativa, prima di chiedere l'incontro, e **dal vivo su approdo.vercel.app**. La presentazione deve ancora avvenire — quindi dimostra visione di prodotto e sviluppo commerciale, non un risultato consegnato a un cliente.",
        slot: "Marea durante una conversazione",
      },
    ],
  },

  feature: {
    label: "Costruito per la presentazione",
    heading: "Marea",
    lede: "Un concierge per un resort cinque stelle, costruito prima che qualcuno lo chiedesse.",
    body: "L'ingegneria sta in ciò che si rifiuta di fare. Orari di check-in e check-out, animali, fumo, parcheggio, Wi-Fi, sconti bambini, età minima per la spa e **ogni prezzo** sono in un elenco esplicito che non può mai inventare: su quelli l'unica risposta ammessa è che la reception confermerà, con il suo numero. È vietato anche attenuare, perché «di solito alle 11:00» resta un orario inventato.",
    languagesLabel: "Risponde nella lingua dell'ospite",
    languages: ["Italiano", "English", "Deutsch", "Français"],
    primary: "Apri la demo dal vivo",
    secondary: "Parliamone per la tua azienda",
    slot: "Marea durante una conversazione",
  },

  close: {
    heading: "Dimmi che cosa il tuo team fa ancora a mano.",
    primary: "Scrivimi",
    altBefore: "Oppure apri ",
    altLink: "il concierge dal vivo",
    altAfter: " e prova a chiederle qualcosa.",
    place: "Nola (NA), Italia",
    rights: "© 2026 Giuseppe Ciccone",
  },
};
