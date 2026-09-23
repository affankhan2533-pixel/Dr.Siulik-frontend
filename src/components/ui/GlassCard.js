"use client";

import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', dark = false, hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.3 }}
      className={`${dark ? 'glass-panel-dark text-white' : 'glass-card text-brand-textDark'} rounded-2xl p-6 relative overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
