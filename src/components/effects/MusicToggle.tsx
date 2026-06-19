"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMusicalNote, HiMusicalNote } from "react-icons/hi2";

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.button
      data-cursor-hover
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-6 right-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full glass-card glow-gold transition-colors hover:border-royal-gold/40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.span
            key="on"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
          >
            <HiMusicalNote className="h-5 w-5 text-royal-gold" />
          </motion.span>
        ) : (
          <motion.span
            key="off"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
          >
            <HiOutlineMusicalNote className="h-5 w-5 text-royal-gold/70" />
          </motion.span>
        )}
      </AnimatePresence>

      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full border border-royal-gold/30"
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <span className="sr-only">
        {isPlaying
          ? "Ambient piano music playing (visual indicator)"
          : "Click to enable ambient music feel"}
      </span>
    </motion.button>
  );
}
