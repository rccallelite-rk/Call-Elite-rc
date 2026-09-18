import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#E53935] via-[#ff6b6b] to-[#0A192F] origin-left z-[9999] pointer-events-none shadow-[0_0_8px_rgba(229,57,53,0.5)]"
      aria-hidden="true"
    />
  );
};
