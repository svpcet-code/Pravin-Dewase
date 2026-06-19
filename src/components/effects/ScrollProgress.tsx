"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-royal-gold via-royal-amber to-royal-gold-light"
        style={{ scaleX }}
      />
      <motion.div
        className="fixed top-4 right-4 z-[100] hidden rounded-full glass-card px-3 py-1 font-[family-name:var(--font-sans)] text-xs tracking-widest text-royal-gold/80 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        {percentage}%
      </motion.div>
    </>
  );
}
