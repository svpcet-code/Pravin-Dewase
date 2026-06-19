"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { galleryPhotos } from "@/data/photos";

export function ClosingSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const closingPhotos = galleryPhotos.slice(0, 4);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          className="mb-12 flex justify-center gap-3 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          {closingPhotos.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="relative h-20 w-16 overflow-hidden rounded-lg border border-royal-gold/20 md:h-28 md:w-20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 0.6 - i * 0.1, y: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 1 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <p className="mb-4 font-[family-name:var(--font-body)] text-xl italic leading-relaxed text-royal-beige/80 md:text-2xl lg:text-3xl">
            Beautiful moments fade away...
            <br />
            But memories stay forever ❤️
          </p>
        </motion.div>

        <motion.div
          className="my-12 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-royal-gold/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="font-[family-name:var(--font-display)] text-2xl text-gradient-gold md:text-4xl">
            Made with love for the Dewase Family ✨
          </p>
          <p className="mt-4 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.3em] text-royal-gold/50">
            Pravin • Sneha • Riyansh
          </p>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          animate={isInView ? { opacity: [0.3, 0.8, 0.3] } : {}}
          transition={{ duration: 3, repeat: Infinity, delay: 2 }}
        >
          <div className="h-16 w-16 rounded-full bg-royal-gold/10 blur-xl" />
        </motion.div>
      </div>
    </section>
  );
}
