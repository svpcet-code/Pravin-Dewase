export interface Photo {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
  span?: "normal" | "wide" | "tall";
}

export const galleryPhotos: Photo[] = [
  {
    src: "/images/couple-celebration-2.png",
    alt: "Pravin and Sneha Dewase celebrating together",
    caption: "Together in celebration ❤️",
    featured: true,
    span: "wide",
  },
  {
    src: "/images/pravin-garden.png",
    alt: "Pravin Dewase in traditional attire at the garden",
    caption: "Pravin Dewase — The Birthday Star 🎂",
    featured: true,
    span: "tall",
  },
  {
    src: "/images/sneha-elegant.png",
    alt: "Sneha Dewase in elegant traditional attire",
    caption: "Sneha's graceful elegance ✨",
    span: "tall",
  },
  {
    src: "/images/couple-celebration-1.png",
    alt: "Pravin and Sneha sharing a beautiful moment",
    caption: "Love & laughter",
    span: "normal",
  },
  {
    src: "/images/sneha-portrait.png",
    alt: "Sneha Dewase portrait in white and blue",
    caption: "Radiant beauty",
    span: "normal",
  },
  {
    src: "/images/y.jpeg",
    alt: "Riyansh Dewase",
    caption: "A special captured memory",
    span: "wide",
  },
  {
    src: "/images/WhatsApp Image 2026-06-19 at 3.34.33 PM.jpeg",
    alt: "Additional captured memory image",
    caption: "New captured memory",
    span: "normal",
  },
];

export const familyMembers = [
  {
    name: "Pravin Dewase",
    role: "Birthday Star 🎂",
    emoji: "👨",
    image: "/images/pravin-garden.png",
    description: "The heart of this celebration — a wonderful husband, father, and friend.",
  },
  {
    name: "Sneha Dewase",
    role: "Loving Wife ❤️",
    emoji: "👩",
    image: "/images/sneha-elegant.png",
    description: "The grace and warmth that makes every moment magical.",
  },
  {
    name: "Together",
    role: " ",
    emoji: "",
    image: "/images/couple-celebration-2.png",
    description: "love",
  },
];
