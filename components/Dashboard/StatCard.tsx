'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
    return (
        <Card className="relative overflow-hidden">
            {/* Background Icon Watermark */}
            <div className="absolute top-4 right-4 opacity-10">
                <Icon size={80} className="text-[#F7931A]" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#EA580C]/20 border border-[#EA580C]/50 flex items-center justify-center glow-orange">
                        <Icon size={24} className="text-[#F7931A]" />
                    </div>
                    <h3 className="text-sm font-body text-[#94A3B8] uppercase tracking-wider">
                        {title}
                    </h3>
                </div>

                <div className="mb-2">
                    <p className="text-3xl font-mono font-bold text-white">
                        {value}
                    </p>
                </div>

                {trend && (
                    <p className={`text-sm font-body ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                        {trendUp ? '↑' : '↓'} {trend}
                    </p>
                )}
            </div>
        </Card>
    );
}
