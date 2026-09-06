import type { SiteContent } from "@/types/site";

/** English copy.
 *
 *  Written from `~/repos/freelance/giuseppe-ciccone/portfolio` and nothing
 *  else. Three rules from that record govern every string below and are worth
 *  restating where someone will edit them:
 *
 *  1. The three measured figures keep their qualifier in the same sentence.
 *     Coverage was counted at both ends. The review rate *moved* — there was no
 *     control group, so it was never *caused*. The star rating is a check that
 *     closes an objection, not a third result.
 *  2. The one estimate carries the word *estimated* as part of the claim.
 *  3. The LightBurn bridge gets a capability claim and never an efficiency one;
 *     the B2B platform evidences a system built and integrated, never a change
 *     in how the business sells.
 *
 *  `**double asterisks**` mark the load-bearing phrase in a sentence and are
 *  rendered as <strong> by the `Rich` component. Bold the specific, not the
 *  sentence. */
export const en: SiteContent = {
  slotNote: "Photograph to come",

  meta: {
    title: "Giuseppe Ciccone · AI automation and internal tools",
    description:
      "AI developer in Nola, Italy. I build automations, AI assistants and internal tools that remove manual, repetitive work from commercial operations — order processing, marketplace APIs, ERP integration and conversational AI. Four production systems in under six months, one of them measured.",
    keywords: [
      "Giuseppe Ciccone",
      "AI automation",
      "AI developer",
      "Amazon SP-API",
      "Mexal ERP integration",
      "agent skills",
      "computer use automation",
      "Next.js developer",
      "Tauri desktop app",
      "freelance developer Italy",
    ],
    ogTitle: "Giuseppe Ciccone · AI automation and internal tools",
    ogDescription:
      "Four production systems in under six months, sole developer. Review-request coverage went from 2–4% to 98%, counted at both ends.",
  },

  nav: {
    work: "Work",
    about: "About",
    contact: "Contact",
    cta: "Get in touch",
    language: "Language",
  },

  hero: {
    stats: [
      {
        figure: "coverage",
        display: "98",
        label: "Review-request coverage, from 2–4%",
      },
      {
        figure: "systems",
        display: "4",
        label: "Production systems, sole developer, under six months",
      },
    ],
    headline: { before: "No one does this ", em: "by hand", after: "." },
    sub: "I build automations, AI assistants and internal tools that remove manual, repetitive work from commercial operations.",
    primary: "Open the live demo",
    secondary: "See the work",
    slot: "Portrait",
  },

  results: {
    heading: "What actually changed.",
    lede: "Four systems in production for one client, and one of them measured against a counted baseline rather than asserted.",
    rows: [
      {
        figure: "coverage",
        from: "2–4%",
        display: "98",
        label: "Review-request coverage",
        description:
          "19,185 accepted solicitations across 19,575 attempts over 100 days. **Both ends counted, not estimated.**",
        tag: "Measured",
      },
      {
        figure: "reviewRate",
        from: "1.33%",
        display: "2.55",
        label: "Review rate per 100 units",
        description:
          "Like-for-like products over the following 100 days — five product families, 62 reviews before, 132 after. **No control group**, so the rate moved.",
        tag: "Measured",
      },
      {
        figure: "rating",
        from: "3.85",
        display: "4.38",
        label: "Average star rating",
        description:
          "**A check, not a third result.** Soliciting every buyer did not drag the rating down — and the automation has no mechanism for lifting one.",
        tag: "A check",
      },
      {
        figure: "orders",
        display: "280",
        label: "Orders a day",
        description:
          "The scale the client's operation runs at, across Amazon, eBay, TikTok Shop and Temu — and the reason none of this survives being done by hand.",
        tag: "Client's scale",
      },
    ],
    noteLabel: "One estimate, and the label is part of it",
    note: "The monthly Mexal job the agent skill replaced cost an **estimated 3.5–5.5 hours a month**. Calculated from the documented steps with every assumption written down — never timed, and never quoted as a measurement.",
  },

  capabilities: {
    heading: "What I actually do",
    body: "Six capabilities and a habit. Every plate has a system behind it that is running today.",
    caption:
      "Each plate is a capability with a shipped system behind it. The systems themselves are in the rail below.",
    centreSlot: "The engraver on the production floor",
    plates: [
      {
        area: "Unattended automation",
        title: "It runs without anyone",
        proof:
          "A Python service on a Hetzner VPS solicits every eligible Amazon order and posts a Telegram summary. A systemd timer at 10:00 Europe/Rome — every day, including the weeks nobody is thinking about reviews.",
      },
      {
        area: "Process automation",
        title: "The procedure is the product",
        proof:
          "Where a system has no API, the automatable unit is the operator's procedure. I sit with it, write it precisely enough for an agent to run, and harden it against what actually broke in a real run.",
      },
      {
        area: "Agent workstations",
        title: "It runs on their machine",
        proof:
          "A Claude environment on the client's own Windows PC, under their own account. Standing it up is the one-off; the next procedure they want handled is a document rather than a project.",
      },
      {
        area: "Opening a capability",
        title: "A product line that was closed",
        proof:
          "Engraving templates, a Windows application and operator training, delivered together. They sell personalised engraved products today and could not before — a capability claim, not an efficiency one.",
      },
      {
        area: "System of record",
        title: "Written into the ERP",
        proof:
          "Orders posted into Mexal over its WebAPI as real Ordini Cliente, against an integration reverse-engineered read-only and reconciled field by field to the ERP's own screens. Nothing to reconcile at month end.",
      },
      {
        area: "LLM products",
        title: "Designed around the refusal",
        proof:
          "A four-language concierge with a named list of facts she may never invent, and no permission to hedge — because “usually 11:00” is still an invented time.",
      },
      {
        area: "Measurement",
        title: "The number that survives",
        proof:
          "Six specifications tested against a census-grade baseline. The larger, arithmetically correct figure was rejected as an artefact of a shrinking divisor.",
      },
    ],
  },

  story: {
    heading: "Four systems in production, and one of them measured.",
    paragraphs: [
      "I work freelance out of Nola, near Naples. In under six months I delivered **four production systems** for one client — a Windows desktop application, an unattended backend service, a B2B ordering platform with an ERP integration, and an agent skill that runs on the company's own machine. Sole developer on all four: requirements, build, deployment, and the operator training that decides whether a tool actually gets used.",
      "The client runs two businesses at once — wholesale distribution on the Mexal ERP, and multi-marketplace retail across Amazon, eBay, TikTok Shop and Temu, personalised engraving included. **280+ orders a day.** That combination is what makes the work interesting: high volume, several channels each with their own rules, an ERP that is the single source of truth, and a laser at the end of the chain.",
      "One of the four I measured rather than asserted, and I reported the movement rather than an effect — there was no control group, and claiming otherwise would not survive the first person who asked how it was derived. I am building an AI automation company on that basis.",
    ],
    cta: "See the systems",
    slots: ["Nola, Italy", "The agent workstation"],
  },

  work: {
    leadHeading: "Five systems. Four of them a client's.",
    leadBody:
      "Sole developer on every one — requirements, build, deployment and operator training. All four client systems are still deployed and running; three are in daily use.",
    end: "The fifth is not a case study. It is live, and you can open it and talk to her.",
    endCta: "Open the live demo",
    labels: {
      problem: "Problem",
      built: "Built",
      changed: "Changed",
      stack: "Stack",
    },
    projects: [
      {
        id: "reviews",
        kind: "Client work · Victoria Marketing",
        title: "Amazon review-request automation",
        problem:
          "Amazon allows one review request per eligible order, inside a window that closes for good. At 280+ orders a day, keeping up by hand is arithmetically impossible — only **2–4% of eligible orders** were ever asked.",
        built:
          "A Python service on a Debian VPS built on the SP-API `solicitations` endpoint — the sanctioned first-party route, not a browser script against Seller Central. A systemd timer fires once a day at 10:00 Europe/Rome, with bounded same-day retries, and posts a Telegram summary of everything it sent.",
        changed:
          "Coverage reached **98%** — 19,185 accepted solicitations across 19,575 attempts over 100 days, both ends counted. Over the following 100 days the review rate per 100 units **moved from 1.33% to 2.55%** on like-for-like products. No one in the company performs any step of this any more.",
        slot: "The daily Telegram summary",
      },
      {
        id: "lightburn",
        kind: "Client work · Victoria Marketing",
        title: "Amazon → LightBurn bridge",
        problem:
          "The company had bought a laser engraver and was selling nothing with it. Nobody could operate LightBurn, no engraving templates existed, and the customer's personalisation text lives inside an Amazon order payload. **Not a slow process — no process at all.**",
        built:
          "The engraving templates, plus a Tauri v2 Windows application that reads each order's personalisation, writes the customer's text into the right `.lbrn2` template by finding fields by their placeholder text, and opens it in LightBurn ready to run. Four signed releases to its own update channel.",
        changed:
          "**They sell personalised engraved products today and could not before.** A capability claim, not an efficiency one: nothing was being produced beforehand, so there is no baseline and no time-saving number is claimed.",
        slot: "The order queue on the production floor",
      },
      {
        id: "mexal",
        kind: "Client work · Victoria Marketing",
        title: "Mexal OX → CO, as an agent skill",
        problem:
          "Every month, one calendar day at a time: filter the document list to that date, tick every row, read the selected total, work out a set percentage of it **by value**, then untick rows until the total matched — and commit. Thirty-one times a month, against a screen with no undo.",
        built:
          "The procedure written precisely enough for an agent to run it against the live ERP window, and hardened against what actually broke: Esc destroying the working tab, Ctrl+Shift+Home injecting digits into date fields, keystrokes dropped below ~60 ms spacing. It runs on the client's own machine, under their own account.",
        changed:
          "Three parameters — start date, end date, percentage — and the month runs, with every selection reconciled **to the cent** against a predicted value before anything commits. It replaced an **estimated 3.5–5.5 hours a month**: estimated from the documented steps, never timed.",
        mediaAlt: [
          "The Mexal document list filtered to a single date, with buyer names and order references pixelated.",
          "The selection footer of the same screen, showing the document count and the selected total, with the client's order-book figure pixelated.",
        ],
        caption:
          "The two screens the procedure turns on — redacted: every column carrying a buyer name or an order reference is pixelated, and so is the client's own total.",
      },
      {
        id: "b2b",
        kind: "Client work · Victoria Marketing",
        title: "B2B ordering platform + Mexal",
        problem:
          "B2B orders arrived by phone, email, WhatsApp or a rep, and someone inside the company keyed each one into the ERP. A standard shop was the wrong answer and the company said so: B2B settles on negotiated terms and invoices at 30/60/90 days, not a card at checkout.",
        built:
          "A **payment-free** Next.js ordering portal that writes each submitted order straight into Mexal over its WebAPI as a real Ordine Cliente, plus Capacitor shells for iOS and Android so one deploy updates web and both apps. The portal **stores no customer PII at all** — a client is an opaque username, a PIN and a pointer to their Mexal code.",
        changed:
          "The channel is open and the ERP integration works end to end. **One business customer has ordered through it.** That evidences a platform built and integrated — it does not evidence a change in how the business sells, and the company moving its customers across is its own commercial decision.",
        slot: "The portal on a phone",
      },
      {
        id: "marea",
        kind: "Personal project · live",
        title: "Marea — AI concierge",
        problem:
          "A five-star resort sells an experience where the answer to any question is supposed to arrive immediately. Most guest questions are the same handful, asked over and over, in four languages, at any hour — answered by staff whose real value is everything a machine cannot do.",
        built:
          "A concierge grounded in one hand-written knowledge base per property, compiled into the prompt — no retrieval, so you can read the whole of what she knows. **Multi-tenant by construction:** the second hotel is a folder and an environment variable, not a fork.",
        changed:
          "Built speculatively, before asking for the meeting, and **live at approdo.vercel.app**. The pitch is upcoming — so this evidences product thinking and business development, not a delivered client outcome.",
        slot: "Marea mid-conversation",
      },
    ],
  },

  feature: {
    label: "Built to pitch",
    heading: "Marea",
    lede: "A concierge for a five-star resort, built before anyone asked for it.",
    body: "The engineering is in what she refuses to do. Check-in and check-out times, pet policy, smoking, parking, Wi-Fi, children's discounts, the spa minimum age and **every price** are on a named list she may never invent — for those, the only permitted reply is that reception will confirm, with their number. Hedging is banned too, because “usually 11:00” is still an invented time.",
    languagesLabel: "Answers in the guest's own language",
    languages: ["Italiano", "English", "Deutsch", "Français"],
    primary: "Open the live demo",
    secondary: "Talk about one for your business",
    slot: "Marea mid-conversation",
  },

  close: {
    heading: "Tell me what your team still does by hand.",
    primary: "Email me",
    altBefore: "Or open ",
    altLink: "the live concierge",
    altAfter: " and ask her something.",
    place: "Nola (NA), Italy",
    rights: "© 2026 Giuseppe Ciccone",
  },
};
