"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OpeningIntro } from "@/components/sections/OpeningIntro";
import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { FamilySection } from "@/components/sections/FamilySection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ClosingSection } from "@/components/sections/ClosingSection";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {!introComplete && <OpeningIntro onComplete={() => setIntroComplete(true)} />}

      <AnimatePresence>
        {introComplete && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10"
          >
            <HeroSection />
            <GallerySection />
            <FamilySection />
            <TimelineSection />
            <ClosingSection />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
