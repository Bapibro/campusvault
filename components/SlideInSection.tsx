'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { HTMLMotionProps } from 'framer-motion';

const slideInLeftVariant = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const slideInRightVariant = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export function SlideInLeft({
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
      viewport={{ once: true, amount: 0.3 }}
      variants={slideInLeftVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideInRight({
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
      viewport={{ once: true, amount: 0.3 }}
      variants={slideInRightVariant}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
