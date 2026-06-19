"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EndingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const thanksRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 60%",
      onEnter: () => {
        if (hasPlayed) return;
        setHasPlayed(true);

        const tl = gsap.timeline();

        tl.from(line1Ref.current, {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
          duration: 2,
          ease: "power3.out",
        })
          .from(
            line2Ref.current,
            {
              opacity: 0,
              y: 20,
              filter: "blur(8px)",
              duration: 1.5,
              ease: "power3.out",
            },
            "-=0.5"
          )
          .to(glowRef.current, {
            opacity: 1,
            scale: 1.2,
            duration: 3,
            ease: "power2.inOut",
          })
          .from(
            thanksRef.current,
            {
              opacity: 0,
              y: 20,
              duration: 1.5,
              ease: "power3.out",
            },
            "-=1"
          );
      },
    });

    return () => trigger.kill();
  }, [hasPlayed]);

  return (
    <section
      ref={sectionRef}
      id="ending"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-royal-gold/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <p
          ref={line1Ref}
          className="mb-4 font-[family-name:var(--font-body)] text-2xl italic text-royal-beige/70 md:text-3xl lg:text-4xl"
        >
          Beautiful moments fade away...
        </p>
        <p
          ref={line2Ref}
          className="mb-12 font-[family-name:var(--font-display)] text-3xl text-gradient-gold md:text-5xl lg:text-6xl"
        >
          But memories stay forever ❤️
        </p>

        <div className="mx-auto mb-12 h-px w-32 bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent" />

        <p
          ref={thanksRef}
          className="font-[family-name:var(--font-body)] text-xl text-royal-beige/50 md:text-2xl"
        >
          Made with love for the Dewase Family ✨
        </p>

        <motion.div
          className="mt-8 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.4em] text-royal-gold/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Pravin • Sneha • Riyansh
        </motion.div>
      </div>
    </section>
  );
}
