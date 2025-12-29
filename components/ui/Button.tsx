import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps) {
    const baseStyles = 'px-6 py-3 rounded-full font-medium font-body tracking-wider uppercase text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]';

    const variants = {
        primary: 'bg-gradient-to-r from-[#EA580C] to-[#F7931A] text-white glow-orange hover:scale-105 hover:glow-orange-lg',
        outline: 'bg-transparent border-2 border-white/20 text-white hover:border-white hover:bg-white/10',
        ghost: 'bg-transparent text-white hover:bg-white/10 hover:text-[#F7931A]',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
