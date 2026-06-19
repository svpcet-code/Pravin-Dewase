"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface OpeningIntroProps {
  onComplete: () => void;
}

export function OpeningIntro({ onComplete }: OpeningIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const streakRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            setVisible(false);
            onComplete();
          }, 400);
        },
      });

      tl.set(containerRef.current, { opacity: 1 })
        .from(particlesRef.current?.children || [], {
          opacity: 0,
          scale: 0,
          stagger: 0.02,
          duration: 1.5,
          ease: "power2.out",
        })
        .from(
          line1Ref.current,
          {
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
            duration: 2,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(line1Ref.current, {
          opacity: 0.6,
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(zoomRef.current, {
          scale: 1.15,
          duration: 2,
          ease: "power2.inOut",
        })
        .fromTo(
          streakRef.current,
          { x: "-100%", opacity: 0 },
          { x: "200%", opacity: 1, duration: 1.2, ease: "power4.inOut" },
          "-=1.5"
        )
        .to(line1Ref.current, {
          opacity: 0,
          y: -20,
          filter: "blur(8px)",
          duration: 0.8,
        })
        .from(
          line2Ref.current,
          {
            opacity: 0,
            scale: 0.8,
            y: 40,
            filter: "blur(15px)",
            duration: 1.5,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(line2Ref.current, {
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
        })
        .to({}, { duration: 1.2 })
        .to(line2Ref.current, {
          opacity: 0,
          scale: 1.1,
          filter: "blur(10px)",
          duration: 1,
          ease: "power2.in",
        })
        .to(
          [curtainLeftRef.current, curtainRightRef.current],
          {
            scaleX: 0,
            duration: 1.8,
            ease: "power4.inOut",
            stagger: 0.05,
          },
          "-=0.5"
        )
        .to(containerRef.current, {
          opacity: 0,
          filter: "blur(20px)",
          duration: 1,
          ease: "power2.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, mounted]);

  if (!mounted || !visible) return null;

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${10 + Math.random() * 80}%`,
    delay: Math.random() * 2,
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-royal-black opacity-0"
    >
      <div ref={zoomRef} className="absolute inset-0 scale-100">
        <div className="absolute inset-0 bg-gradient-to-b from-royal-wine/30 via-transparent to-royal-black" />
      </div>

      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute h-1 w-1 rounded-full bg-royal-gold/80"
            style={{
              left: p.left,
              top: p.top,
              boxShadow: "0 0 6px rgba(212,175,55,0.8)",
              animation: `float ${3 + Math.random() * 2}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      <div
        ref={streakRef}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-royal-gold/20 to-transparent opacity-0"
        style={{ transform: "skewX(-20deg)" }}
      />

      <div className="relative z-30 px-6 text-center">
        <p
          ref={line1Ref}
          className="mb-8 font-[family-name:var(--font-body)] text-xl italic tracking-wide text-royal-beige/80 md:text-2xl lg:text-3xl"
        >
          Some moments deserve to live forever...
        </p>
        <h1
          ref={line2Ref}
          className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-gradient-gold md:text-5xl lg:text-6xl"
        >
          Pravin Dewase&apos;s Birthday Celebration ✨
        </h1>
      </div>

      <div
        ref={curtainLeftRef}
        className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left bg-royal-black"
        style={{
          background:
            "linear-gradient(90deg, #0a0a0f 0%, #12121a 80%, transparent 100%)",
        }}
      />
      <div
        ref={curtainRightRef}
        className="absolute inset-y-0 right-0 z-20 w-1/2 origin-right bg-royal-black"
        style={{
          background:
            "linear-gradient(-90deg, #0a0a0f 0%, #12121a 80%, transparent 100%)",
        }}
      />

      <style jsx>{`
        @keyframes float {
          from {
            transform: translateY(0px);
            opacity: 0.4;
          }
          to {
            transform: translateY(-15px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
