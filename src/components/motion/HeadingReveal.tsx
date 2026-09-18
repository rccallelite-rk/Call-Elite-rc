import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface HeadingRevealProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p';
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left';
}

export const HeadingReveal: React.FC<HeadingRevealProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const initialY = direction === 'up' ? '100%' : direction === 'down' ? '-100%' : '0%';
  const initialX = direction === 'left' ? '30px' : '0%';

  return (
    <div className="overflow-hidden leading-tight py-0.5">
      <motion.div
        initial={{ y: initialY, x: initialX, opacity: 0 }}
        whileInView={{ y: '0%', x: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier for mask reveal
        }}
      >
        <Component className={className}>{children}</Component>
      </motion.div>
    </div>
  );
};
