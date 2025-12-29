'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { RefreshCw } from 'lucide-react';
import { getPrices, fetchPrices, getAssetTypeName, type AssetType, type AllPrices } from '@/lib/api';

export function APIStatus() {
    const [prices, setPrices] = useState<AllPrices | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPrices();
    }, []);

    const loadPrices = async () => {
        const data = await getPrices();
        setPrices(data);
    };

    const handleRefresh = async () => {
        setLoading(true);
        await fetchPrices(); // Force fetch
        await loadPrices();
        setLoading(false);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const assetTypes: AssetType[] = [
        'gold_gram',
        'gold_quarter',
        'gold_half',
        'gold_full',
        'gold_resat',
        'usd',
        'eur',
    ];

    return (
        <Card>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-heading font-semibold text-white mb-1">
                            API Fiyat Durumu
                        </h3>
                        {prices && (
                            <p className="text-xs text-[#94A3B8] font-mono">
                                Son Güncelleme: {new Date(prices.lastUpdate).toLocaleString('tr-TR')}
                            </p>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={loading}
                        className="!p-2"
                    >
                        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    </Button>
                </div>

                {!prices ? (
                    <p className="text-center py-8 text-[#94A3B8] font-body">Veriler yükleniyor...</p>
                ) : (
                    <div className="space-y-2">
                        {assetTypes.map((type) => {
                            const data = prices[type];
                            const isPositive = data.change >= 0;

                            return (
                                <div
                                    key={type}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="text-sm font-body text-white">{getAssetTypeName(type)}</p>
                                        <p className="text-xs text-[#94A3B8] font-mono">{data.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-mono font-bold text-[#F7931A]">
                                            {formatCurrency(data.buying)}
                                        </p>
                                        <p className={`text-xs font-mono ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                            {isPositive ? '+' : ''}{data.change.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Card>
    );
}
