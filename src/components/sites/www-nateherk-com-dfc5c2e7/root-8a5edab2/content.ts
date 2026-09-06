import type {
  AwardPlate,
  RegistryRow,
  RoomPhoto,
  TrustLogo,
} from "@/types/nateherk";

/** Namespaced public root for every asset downloaded from the source site. */
export const ASSETS = "/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2";

export const LINKS = {
  youtube: "https://www.youtube.com/@nateherk",
  society: "https://www.skool.com/ai-automation-society",
  societyPlus: "https://www.skool.com/ai-automation-society-plus/about",
  linkedin: "https://www.linkedin.com/in/nateherkelman/",
  instagram: "https://www.instagram.com/nateherk",
  x: "https://x.com/nateherk",
  work: "https://uppitai.com/",
  amazon: "https://www.amazon.com/dp/B0H84Z9CXG",
  amazonReview: "https://www.amazon.com/review/create-review?asin=B0H84Z9CXG",
} as const;

export const REGISTRY_ROWS: readonly RegistryRow[] = [
  {
    count: 950000,
    display: "950,000",
    label: "YouTube subscribers",
    description:
      "Weekly tutorials on n8n and building an AI automation business.",
    href: LINKS.youtube,
  },
  {
    count: 450000,
    display: "450,000",
    label: "AI Automation Society members",
    description:
      "Join the free community and start learning AI automation today.",
    href: LINKS.society,
  },
  {
    count: 3500,
    display: "3,500",
    label: "Society Plus members",
    description:
      "Premium community with curriculum, templates, and weekly support.",
    href: LINKS.societyPlus,
  },
  {
    count: 60000,
    display: "60,000",
    label: "LinkedIn followers",
    description: "Connect with Nate professionally and see his career journey.",
    href: LINKS.linkedin,
  },
];

export const TRUST_LOGOS: readonly TrustLogo[] = [
  { src: `${ASSETS}/images/logos/microsoft.webp`, alt: "Microsoft" },
  { src: `${ASSETS}/images/logos/n8n.webp`, alt: "n8n" },
  { src: `${ASSETS}/images/logos/skool.webp`, alt: "Skool", tall: true },
  { src: `${ASSETS}/images/logos/apify.webp`, alt: "Apify" },
  { src: `${ASSETS}/images/logos/forbes.webp`, alt: "Forbes" },
  { src: `${ASSETS}/images/logos/linkedin.webp`, alt: "LinkedIn", tall: true },
  { src: `${ASSETS}/images/logos/hostinger.webp`, alt: "Hostinger" },
];

/** Order matters: the ring lays plates out at (index * 360 / count) degrees. */
export const AWARD_PLATES: readonly AwardPlate[] = [
  {
    source: "Forbes",
    title: "Featured Press",
    subtitle: "Top AI Sources for Business Owners",
    href: "https://www.forbes.com/sites/small-business/article/ai-podcasts-for-business-leaders/",
  },
  {
    source: "Skool Games",
    title: "4x Winner",
    subtitle: "Q1 to Q4 2025",
  },
  {
    source: "n8n",
    title: "Expert Partner",
    subtitle: "Verified Expert",
    badge: { src: `${ASSETS}/images/logos/n8n-expert-badge.webp`, alt: "" },
  },
  {
    source: "n8n Community",
    title: "2x Community Award",
    subtitle: "2024 and 2025 winner",
  },
  {
    source: "Microsoft",
    title: "Learn Creator",
    subtitle: "Official partnership",
    href: "https://learn.microsoft.com/en-us/community/learn-with/nate-herkelman/",
  },
  {
    source: "Talk AI",
    title: "Amplifier Award",
    subtitle: "Winner",
  },
  {
    source: "LinkedIn News",
    title: "Cited Perspective",
    subtitle: "Top perspective on the AI industry",
    href: "https://www.linkedin.com/news/story/anthropic-overtakes-openai-in-verified-business-clients-8839978/",
  },
];

export const ROOM_PHOTOS: readonly RoomPhoto[] = [
  {
    src: `${ASSETS}/images/workless.webp`,
    width: 1448,
    height: 956,
    alt: "Nate Herk teaching a room at Workless AI, a camera recording in the foreground.",
    caption: "Nate teaching at Workless AI.",
    shape: "land",
  },
  {
    src: `${ASSETS}/images/speaking-stage.webp`,
    width: 1800,
    height: 1200,
    alt: "Nate Herk presenting on a stage to a seated audience, slides on either side.",
    caption: "Teaching the process on stage.",
    shape: "wide",
  },
  {
    src: `${ASSETS}/images/speaking-mic.webp`,
    width: 1400,
    height: 1400,
    alt: "Nate Herk speaking into a microphone at an outdoor event.",
    caption: "Nate speaking at AfricAI.",
    shape: "square",
  },
  {
    src: `${ASSETS}/images/book-hand.webp`,
    width: 1050,
    height: 1400,
    alt: "Nate Herk holding up a copy of Becoming AI Native.",
    caption: "Becoming AI Native, in hand.",
    shape: "tall",
  },
  {
    src: `${ASSETS}/images/africai.webp`,
    width: 1800,
    height: 1200,
    alt: "Nate Herk with a group of attendees at AfricAI.",
    caption: "AfricAI Mastermind.",
    shape: "land",
  },
  {
    src: `${ASSETS}/images/montenegro.webp`,
    width: 933,
    height: 1400,
    alt: "Nate Herk with two friends on a boat in Montenegro, mountains behind them.",
    caption: "Nate with friends in Montenegro.",
    shape: "tall",
  },
];

export const BOOK_CATEGORIES: readonly string[] = [
  "Artificial Intelligence Expert Systems",
  "Information Management",
  "Office Management",
  "Business Office Skills",
];
