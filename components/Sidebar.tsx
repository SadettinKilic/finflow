'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ArrowLeftRight, Coins, Settings, TrendingUp } from 'lucide-react';

const navigationItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'İşlemler', href: '/transactions', icon: ArrowLeftRight },
    { name: 'Varlıklar', href: '/assets', icon: Coins },
    { name: 'Leaderboard', href: '/leaderboard', icon: TrendingUp },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0F1115] border-r border-white/10 p-6 flex flex-col">
            {/* Logo */}
            <div className="mb-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#EA580C] to-[#F7931A] flex items-center justify-center glow-orange">
                        <TrendingUp size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-heading font-bold gradient-text">
                        FinFlow
                    </h1>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm tracking-wider transition-all duration-300 ${isActive
                                ? 'bg-gradient-to-r from-[#EA580C]/20 to-[#F7931A]/20 text-[#F7931A] border border-[#F7931A]/50 glow-orange'
                                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-[#94A3B8] font-mono text-center">
                    FinFlow v1.0.0
                </p>
            </div>
        </aside>
    );
}
