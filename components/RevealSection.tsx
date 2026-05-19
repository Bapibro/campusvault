'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

const revealVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function RevealSection({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
} & Omit<HTMLMotionProps<'div'>, 'animate' | 'initial'>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={revealVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
