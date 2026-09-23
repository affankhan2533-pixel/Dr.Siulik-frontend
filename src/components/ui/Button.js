"use client";

import { motion } from 'framer-motion';

export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer touch-manipulation select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-brand-deep hover:bg-brand-primary text-white shadow-md hover:shadow-lg hover:shadow-brand-primary/20 active:bg-brand-deep',
    secondary: 'bg-brand-soft hover:bg-brand-primary/10 text-brand-deep border border-brand-primary/25 active:bg-brand-soft/80',
    outline: 'border-2 border-brand-deep text-brand-deep hover:bg-brand-deep hover:text-white',
    glass: 'glass-panel text-brand-textDark hover:bg-white/90 hover:border-brand-primary/40 shadow-glass',
    gold: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md',
  };

  const sizes = {
    sm: 'px-4 py-2.5 min-h-[44px] text-xs sm:text-xs font-semibold gap-2',
    md: 'px-6 py-3 min-h-[46px] text-sm sm:text-sm tracking-wide gap-2.5',
    lg: 'px-8 py-3.5 min-h-[50px] text-sm sm:text-base tracking-wide gap-3 font-semibold',
  };

  const Component = href ? motion.a : motion.button;
  const elementProps = href ? { href } : { type, disabled };

  return (
    <Component
      whileHover={{ scale: disabled ? 1 : 1.025 }}
      whileTap={{ scale: disabled ? 1 : 0.975 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...elementProps}
      {...props}
    >
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />}
    </Component>
  );
}
