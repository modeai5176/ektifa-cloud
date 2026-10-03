'use client';

import { motion, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

/** Masked line-by-line text reveal. Pass an array of lines. */
export function RevealText({
  lines,
  className = '',
  as = 'div',
  delay = 0,
  stagger = 0.12,
}: {
  lines: string[];
  className?: string;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
  stagger?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="reveal-line">
          <motion.span
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 1, ease } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

/** Simple fade-up for supporting copy and objects. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1.1, ease, delay },
      }}
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      {children}
    </motion.div>
  );
}

/** Image/surface mask reveal — a panel slides away to expose content. */
export function RevealMask({
  children,
  className = '',
  color = '#0b0a09',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: color, transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 1.2, ease }}
      />
    </div>
  );
}

export { fadeUp };
