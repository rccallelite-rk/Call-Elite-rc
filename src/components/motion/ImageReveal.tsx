import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type ImageRevealVariant =
  | 'clip-up'      // Revealed from bottom up
  | 'clip-right'   // Revealed from left to right
  | 'zoom-out'     // Image starts scaled and settles to 1.0
  | 'curtain'      // Dark/red curtain wipe revealing image
  | 'scale-reveal';// Subtle scale up with opacity

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: ImageRevealVariant;
  delay?: number;
  loading?: 'lazy' | 'eager';
  aspectRatio?: string;
  overlay?: React.ReactNode;
}

export const ImageReveal: React.FC<ImageRevealVariant & ImageRevealProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  variant = 'zoom-out',
  delay = 0,
  loading = 'lazy',
  aspectRatio = '',
  overlay,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={loading}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
        {overlay}
      </div>
    );
  }

  // Variant 1: Curtain wipe reveal
  if (variant === 'curtain') {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={loading}
            className={`w-full h-full object-cover ${imgClassName}`}
          />
        </motion.div>
        {/* Animated curtain overlay wipe */}
        <motion.div
          initial={{ y: '0%' }}
          whileInView={{ y: '-100%' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: delay + 0.1, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-[#0A192F] z-10 pointer-events-none"
        />
        {overlay}
      </div>
    );
  }

  // Variant 2: Clip-path reveal (from bottom up)
  if (variant === 'clip-up') {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        <motion.div
          initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={loading}
            className={`w-full h-full object-cover ${imgClassName}`}
          />
        </motion.div>
        {overlay}
      </div>
    );
  }

  // Variant 3: Clip-path reveal (from left to right)
  if (variant === 'clip-right') {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        <motion.div
          initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={loading}
            className={`w-full h-full object-cover ${imgClassName}`}
          />
        </motion.div>
        {overlay}
      </div>
    );
  }

  // Variant 4: Scale-reveal (subtle scale up)
  if (variant === 'scale-reveal') {
    return (
      <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={loading}
            className={`w-full h-full object-cover ${imgClassName}`}
          />
        </motion.div>
        {overlay}
      </div>
    );
  }

  // Variant 5 (Default): Zoom-out reveal (cinematic)
  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <motion.div
        initial={{ scale: 1.15, opacity: 0.4 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={loading}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </motion.div>
      {overlay}
    </div>
  );
};
