import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
      transition={{
        duration: shouldReduceMotion ? 0.05 : 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`w-full min-h-full ${className}`}
    >
      {children}
    </motion.div>
  );
};
