"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const timelineEvents = [
  {
    emoji: "✨",
    title: "Arrival at Kamal Hotel",
    description: "The evening begins with warmth and anticipation at Kamal Hotel, Rajasthan.",
  },
  {
    emoji: "🎂",
    title: "Cake Cutting",
    description: "A magical moment as candles glow and wishes fill the air for Pravin.",
  },
  {
    emoji: "❤️",
    title: "Family Moments",
    description: "Sneha, Riyansh, and loved ones gather to celebrate the man of the hour.",
  },
  {
    emoji: "🥳",
    title: "Celebration Time",
    description: "Laughter, joy, and beautiful memories captured throughout the night.",
  },
  {
    emoji: "🌙",
    title: "Beautiful Ending",
    description: "Under the night sky, an evening of love comes to a perfect close.",
  },
];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="mb-3 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.4em] text-royal-gold/60">
            The Journey
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-light text-gradient-gold md:text-6xl">
            A Night to Remember 🌙
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-royal-gold/0 via-royal-gold/40 to-royal-gold/0 md:left-1/2 md:-translate-x-px" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.title}
              className={`relative mb-12 flex items-start gap-6 md:mb-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="hidden flex-1 md:block" />

              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-royal-gold/30 bg-royal-dark text-xl glow-gold md:absolute md:left-1/2 md:-translate-x-1/2">
                {event.emoji}
              </div>

              <div
                className={`flex-1 rounded-2xl glass-card p-6 glow-gold transition-all hover:border-royal-gold/30 md:max-w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "md:text-right" : ""
                }`}
                data-cursor-hover
              >
                <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl text-royal-gold-light md:text-2xl">
                  {event.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-base text-royal-beige/70">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
