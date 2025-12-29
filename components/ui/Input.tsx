import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[#94A3B8] mb-2 font-body">
                    {label}
                </label>
            )}
            <input
                className={`w-full h-12 px-4 py-2 bg-black/50 border-b-2 border-white/20 text-white text-sm font-body placeholder:text-white/30 focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                {...props}
            />
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export function TextArea({ label, className = '', ...props }: TextAreaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[#94A3B8] mb-2 font-body">
                    {label}
                </label>
            )}
            <textarea
                className={`w-full min-h-[100px] px-4 py-2 bg-black/50 border-b-2 border-white/20 text-white text-sm font-body placeholder:text-white/30 focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none ${className}`}
                {...props}
            />
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[#94A3B8] mb-2 font-body">
                    {label}
                </label>
            )}
            <select
                className={`w-full h-12 px-4 py-2 bg-black/50 border-b-2 border-white/20 text-white text-sm font-body focus-visible:border-[#F7931A] focus-visible:shadow-[0_10px_20px_-10px_rgba(247,147,26,0.3)] focus-visible:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0F1115]">
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
