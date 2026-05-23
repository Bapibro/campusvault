'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export default function AnimatedHoverCard({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className'>) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -8,
        scale: 1.015,
        boxShadow: '0 0 45px rgba(139, 92, 246, 0.18)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.985 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
