"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineMapPin, HiOutlineCalendarDays } from "react-icons/hi2";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/images/y.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-royal-black/70" />
        <div className="absolute inset-0 cinematic-overlay" />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center"
        style={{ y, opacity }}
      >
        <motion.p
          className="mb-4 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.4em] text-royal-gold/70 md:text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          An Unforgettable Evening
        </motion.p>

        <motion.h1
          className="mb-6 font-[family-name:var(--font-display)] text-5xl font-light leading-tight text-gradient-gold md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        >
          Celebrating
          <br />
          Pravin Dewase 🎂
        </motion.h1>

        <motion.p
          className="mx-auto mb-8 max-w-2xl font-[family-name:var(--font-body)] text-lg italic text-royal-beige/80 md:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          An unforgettable evening of love, family &amp; beautiful memories.
        </motion.p>

        <motion.div
          className="mb-10 flex flex-wrap items-center justify-center gap-6 font-[family-name:var(--font-sans)] text-sm text-royal-beige/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="flex items-center gap-2">
            <HiOutlineMapPin className="h-4 w-4 text-royal-gold" />
            Kamal Hotel, Rajasthan
          </span>
          <span className="flex items-center gap-2">
            <HiOutlineCalendarDays className="h-4 w-4 text-royal-gold" />
            18 June
          </span>
        </motion.div>

        <motion.button
          data-cursor-hover
          onClick={scrollToGallery}
          className="group relative overflow-hidden rounded-full border border-royal-gold/30 bg-royal-gold/10 px-10 py-4 font-[family-name:var(--font-sans)] text-sm uppercase tracking-[0.2em] text-royal-gold-light transition-all hover:border-royal-gold/60 hover:bg-royal-gold/20 glow-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Enter Memories ❤️</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-royal-gold/0 via-royal-gold/20 to-royal-gold/0"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-10 w-6 rounded-full border border-royal-gold/30 p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-royal-gold"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
