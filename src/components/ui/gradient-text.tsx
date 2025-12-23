import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'success' | 'warning' | 'premium';
}

const variants = {
  primary: 'from-blue-600 via-blue-500 to-cyan-500',
  success: 'from-emerald-600 via-emerald-500 to-teal-500',
  warning: 'from-amber-600 via-orange-500 to-red-500',
  premium: 'from-blue-600 via-purple-500 to-pink-500',
};

export function GradientText({ 
  children, 
  className,
  variant = 'primary' 
}: GradientTextProps) {
  return (
    <span 
      className={cn(
        'bg-gradient-to-l bg-clip-text text-transparent',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
