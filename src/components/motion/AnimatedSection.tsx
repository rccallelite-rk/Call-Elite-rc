import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type SectionMotionVariant =
  | 'fade-lift'
  | 'cinematic'
  | 'mask-up'
  | 'scale-subtle'
  | 'slide-left'
  | 'slide-right'
  | 'none';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  threshold?: number;
  variant?: SectionMotionVariant;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  id,
  delay = 0,
  variant = 'fade-lift',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || variant === 'none') {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  // Define tailored motion configurations based on section archetype
  const getMotionConfig = () => {
    switch (variant) {
      case 'cinematic':
        return {
          initial: { opacity: 0, scale: 0.97, y: 24 },
          whileInView: { opacity: 1, scale: 1, y: 0 },
          transition: {
            duration: 0.8,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };
      case 'mask-up':
        return {
          initial: { opacity: 0, clipPath: 'inset(10% 0% 0% 0%)', y: 20 },
          whileInView: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', y: 0 },
          transition: {
            duration: 0.75,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        };
      case 'scale-subtle':
        return {
          initial: { opacity: 0, scale: 0.95 },
          whileInView: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.65,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };
      case 'slide-left':
        return {
          initial: { opacity: 0, x: -30 },
          whileInView: { opacity: 1, x: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };
      case 'slide-right':
        return {
          initial: { opacity: 0, x: 30 },
          whileInView: { opacity: 1, x: 0 },
          transition: {
            duration: 0.7,
            delay,
            ease: [0.16, 1, 0.3, 1],
          },
        };
      case 'fade-lift':
      default:
        return {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        };
    }
  };

  const config = getMotionConfig();

  return (
    <motion.section
      id={id}
      initial={config.initial}
      whileInView={config.whileInView}
      viewport={{ once: true, margin: '-60px' }}
      transition={config.transition}
      className={className}
    >
      {children}
    </motion.section>
  );
};
