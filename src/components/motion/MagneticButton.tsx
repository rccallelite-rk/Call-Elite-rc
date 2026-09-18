import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0.1 to 0.3
  glowEffect?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.18,
  glowEffect = false,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    // Clamp to max 7px offset for controlled, professional feel
    const clampedX = Math.max(-7, Math.min(7, distanceX));
    const clampedY = Math.max(-7, Math.min(7, distanceY));
    setPosition({ x: clampedX, y: clampedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (shouldReduceMotion) {
    return (
      <button ref={ref} onClick={onClick} className={className} {...props}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      whileTap={{ scale: 0.96, y: position.y + 1 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 24,
        mass: 0.5,
      }}
      className={`relative overflow-hidden group select-none ${className}`}
      {...(props as any)}
    >
      {/* Subtle interactive shimmer gleam */}
      <span
        aria-hidden="true"
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none"
      />
      {glowEffect && (
        <span
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-500/20 to-amber-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
