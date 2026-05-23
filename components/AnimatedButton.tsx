'use client';

import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export default function AnimatedButton({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<'button'>, 'children' | 'className'>) {
  return (
    <motion.button
      className={className}
      whileHover={{ y: -2, scale: 1.02, boxShadow: '0 0 34px rgba(139, 92, 246, 0.28)' }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
