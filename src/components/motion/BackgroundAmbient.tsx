import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BackgroundAmbientProps {
  variant?: 'subtle-glow' | 'navy-ambient' | 'grid-glow' | 'minimal';
  className?: string;
}

export const BackgroundAmbient: React.FC<BackgroundAmbientProps> = ({
  variant = 'subtle-glow',
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  if (variant === 'navy-ambient') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        {/* Soft Red Pulse */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 right-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#E53935]/20 to-transparent blur-[100px]"
        />
        {/* Deep Blue Drift */}
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.2, 0.35, 0.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/20 to-transparent blur-[120px]"
        />
      </div>
    );
  }

  if (variant === 'grid-glow') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-r from-red-500/10 via-blue-500/10 to-transparent blur-[90px]"
        />
      </div>
    );
  }

  // Default: subtle-glow for light backgrounds
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-100/35 to-transparent blur-[80px]"
      />
      <motion.div
        animate={{
          scale: [1.05, 0.95, 1.05],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-0 -ml-24 w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-red-100/30 via-amber-50/25 to-transparent blur-[80px]"
      />
    </div>
  );
};
