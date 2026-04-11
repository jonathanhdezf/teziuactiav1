'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  duration?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.6,
}: FadeInProps) {
  const directionOffset = 40;
  
  const initialVariants = {
    up: { opacity: 0, y: directionOffset },
    down: { opacity: 0, y: -directionOffset },
    left: { opacity: 0, x: directionOffset },
    right: { opacity: 0, x: -directionOffset },
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // easeOutCubic kind of feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
