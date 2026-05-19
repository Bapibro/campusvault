'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function AnimatedHoverCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}
