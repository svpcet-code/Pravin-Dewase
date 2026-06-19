"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { familyMembers } from "@/data/photos";

function FamilyCard({
  member,
  index,
}: {
  member: (typeof familyMembers)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="perspective-[1000px]"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <motion.div
        className="group relative overflow-hidden rounded-3xl glass-card glow-gold"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor-hover
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-black via-royal-black/20 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <span className="mb-2 block text-3xl">{member.emoji}</span>
          <h3 className="mb-1 font-[family-name:var(--font-display)] text-2xl text-gradient-gold md:text-3xl">
            {member.name}
          </h3>
          <p className="mb-3 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.2em] text-royal-gold/70">
            {member.role}
          </p>
          <p className="font-[family-name:var(--font-body)] text-base text-royal-beige/70">
            {member.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FamilySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="family" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={titleRef}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="mb-3 font-[family-name:var(--font-sans)] text-xs uppercase tracking-[0.4em] text-royal-gold/60">
            The Dewase Family
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-light text-gradient-gold md:text-6xl">
            Our Beautiful Family ❤️
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {familyMembers.map((member, index) => (
            <FamilyCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
