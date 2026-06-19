"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (window.innerWidth < 768) return () => window.removeEventListener("resize", checkMobile);

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousemove", handleHover);
    document.addEventListener("mouseleave", handleLeave);

    let animationId: number;
    const animateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.12,
        y: prev.y + (position.y - prev.y) * 0.12,
      }));
      animationId = requestAnimationFrame(animateTrail);
    };
    animationId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousemove", handleHover);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animationId);
    };
  }, [position.x, position.y]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-screen"
        animate={{
          x: trail.x - 20,
          y: trail.y - 20,
          opacity: isVisible ? 0.4 : 0,
          scale: isHovering ? 2.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <div
          className="h-10 w-10 rounded-full border border-royal-gold/30"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
            boxShadow: "0 0 30px rgba(212,175,55,0.2)",
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="h-2 w-2 rounded-full bg-royal-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
      </motion.div>
    </>
  );
}
