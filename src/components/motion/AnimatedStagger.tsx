import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export type StaggerVariant = 'stagger-up' | 'stagger-scale' | 'stagger-horizontal' | 'stagger-sequence';

interface AnimatedStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  variant?: StaggerVariant;
}

export const AnimatedStagger: React.FC<AnimatedStaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.09,
  initialDelay = 0.04,
  variant = 'stagger-up',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: StaggerVariant;
}

export const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  className = '',
  variant = 'stagger-up',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getItemVariants = () => {
    switch (variant) {
      case 'stagger-scale':
        return {
          hidden: { opacity: 0, scale: 0.9, y: 12 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
      case 'stagger-horizontal':
        return {
          hidden: { opacity: 0, x: -24 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
      case 'stagger-sequence':
        return {
          hidden: { opacity: 0, y: 28, scale: 0.96 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            },
          },
        };
      case 'stagger-up':
      default:
        return {
          hidden: { opacity: 0, y: 24, scale: 0.98 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        };
    }
  };

  return (
    <motion.div variants={getItemVariants()} className={className}>
      {children}
    </motion.div>
  );
};
