'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { db } from '@/lib/db';
import { DollarSign } from 'lucide-react';

export function PriceSettings() {
    const [goldPrice, setGoldPrice] = useState('');
    const [silverPrice, setSilverPrice] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPrices();
    }, []);

    const loadPrices = async () => {
        const settings = await db.settings.get(1);
        if (settings) {
            setGoldPrice(settings.goldPrice.toString());
            setSilverPrice(settings.silverPrice.toString());
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await db.settings.put({
                id: 1,
                goldPrice: parseFloat(goldPrice),
                silverPrice: parseFloat(silverPrice),
            });

            alert('Fiyatlar güncellendi');
        } catch (error) {
            console.error('Price update error:', error);
            alert('Fiyatlar güncellenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[#F7931A]/20 border border-[#F7931A]/50 flex items-center justify-center glow-orange">
                    <DollarSign size={24} className="text-[#F7931A]" />
                </div>
                <h2 className="text-2xl font-heading font-semibold gradient-text">
                    Güncel Fiyat Ayarları
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="number"
                    label="Altın Fiyatı (₺/gram)"
                    value={goldPrice}
                    onChange={(e) => setGoldPrice(e.target.value)}
                    placeholder="2800"
                    step="0.01"
                    required
                />

                <Input
                    type="number"
                    label="Gümüş Fiyatı (₺/gram)"
                    value={silverPrice}
                    onChange={(e) => setSilverPrice(e.target.value)}
                    placeholder="35"
                    step="0.01"
                    required
                />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Kaydediliyor...' : 'Fiyatları Güncelle'}
                </Button>
            </form>
        </Card>
    );
}
