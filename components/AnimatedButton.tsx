'use client';

import { motion } from 'framer-motion';

export default function AnimatedButton({
  children,
  className = '',
  onClick,
  type = 'button',
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      {children}
    </motion.button>
  );
}
