import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'standard' | 'glass';
    hover?: boolean;
}

export function Card({
    children,
    className = '',
    variant = 'standard',
    hover = true
}: CardProps) {
    const baseStyles = 'rounded-2xl p-8 transition-all duration-300';

    const variants = {
        standard: 'bg-[#0F1115] border border-white/10',
        glass: 'glass',
    };

    const hoverStyles = hover
        ? 'hover:-translate-y-1 hover:border-[#F7931A]/50 hover:shadow-[0_0_30px_-10px_rgba(247,147,26,0.2)]'
        : '';

    return (
        <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
}
