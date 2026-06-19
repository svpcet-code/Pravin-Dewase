"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { galleryPhotos } from "@/data/photos";

function GalleryImage({
  photo,
  index,
}: {
  photo: (typeof galleryPhotos)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [loaded, setLoaded] = useState(false);

  const heightClass =
    photo.span === "wide"
      ? "h-[320px] md:h-[360px]"
      : photo.span === "tall"
        ? "h-[540px] md:h-[620px]"
        : "h-[420px] md:h-[480px]";

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
      data-cursor-hover
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-royal-gold/15 bg-[rgba(252,244,219,0.04)] shadow-[0_25px_70px_rgba(0,0,0,0.16)]">
        <div className={`relative w-full overflow-hidden ${heightClass}`}>
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-royal-wine/20 backdrop-blur-xl" />
          )}
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className={`object-contain bg-royal-black transition-all duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 100vw, 33vw"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className="p-5">
          <p className="font-[family-name:var(--font-body)] text-base text-royal-beige/85">
            {photo.alt}
          </p>
          {photo.caption && (
            <p className="mt-3 text-sm text-royal-gold/80">{photo.caption}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  const leftPhotos = galleryPhotos.slice(0, 3);
  const rightPhotos = galleryPhotos.slice(3);

  return (
    <section id="gallery" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={titleRef}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="mb-3 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.4em] text-royal-gold/60">
            Precious Moments
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-light text-gradient-gold md:text-6xl">
            Captured Memories 📖
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-royal-beige/70 md:text-base">
            A book of beautiful moments, preserved with gentle page styling and no cropped photos.
          </p>
        </motion.div>

        <div className="relative overflow-hidden rounded-[3rem] border border-royal-gold/15 bg-royal-dark/80 px-6 py-8 shadow-[0_35px_100px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-royal-gold/40 to-transparent" />
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-8">
              {leftPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className="rounded-[2rem] border border-royal-gold/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_16px_60px_rgba(0,0,0,0.18)]"
                >
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-royal-gold/60">
                    <span>Left Page</span>
                    <span>Memories</span>
                  </div>
                  <GalleryImage photo={photo} index={index} />
                </div>
              ))}
            </div>
            <div className="space-y-8">
              {rightPhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className="rounded-[2rem] border border-royal-gold/10 bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_16px_60px_rgba(0,0,0,0.18)]"
                >
                  <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-royal-gold/60">
                    <span>Right Page</span>
                    <span>Captured</span>
                  </div>
                  <GalleryImage photo={photo} index={index + leftPhotos.length} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
