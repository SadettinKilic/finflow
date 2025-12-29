'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { db } from '@/lib/db';
import { getCurrentUserId } from '@/lib/auth';
import { getAssetTypeOptions, getBuyingPrice, type AssetType } from '@/lib/api';

interface AssetFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function AssetForm({ isOpen, onClose, onSuccess }: AssetFormProps) {
    const [assetType, setAssetType] = useState<AssetType>('gold_gram');
    const [quantity, setQuantity] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const [currentPrice, setCurrentPrice] = useState<number>(0);

    useEffect(() => {
        if (isOpen) {
            loadCurrentPrice();
        }
    }, [assetType, isOpen]);

    const loadCurrentPrice = async () => {
        const price = await getBuyingPrice(assetType);
        setCurrentPrice(price);
        // Always update buy price when asset type changes (or on initial load)
        setBuyPrice(price.toString());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const userId = getCurrentUserId();
        if (!userId) {
            alert('Lütfen giriş yapın');
            setLoading(false);
            return;
        }

        try {
            await db.assets.add({
                assetType,
                quantity: parseFloat(quantity),
                buyPrice: parseFloat(buyPrice),
                date: new Date(date),
                userId,
            });

            // Reset form
            setAssetType('gold_gram');
            setQuantity('');
            setBuyPrice('');
            setDate(new Date().toISOString().split('T')[0]);

            onSuccess();
            onClose();
        } catch (error) {
            console.error('Asset error:', error);
            alert('Varlık eklenirken hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Yeni Varlık Ekle">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Select
                    label="Varlık Tipi"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as AssetType)}
                    options={getAssetTypeOptions()}
                />

                {currentPrice > 0 && (
                    <div className="bg-[#F7931A]/10 border border-[#F7931A]/30 rounded-lg p-3">
                        <p className="text-xs text-[#94A3B8] font-body mb-1">Güncel Fiyat</p>
                        <p className="text-lg font-mono font-bold text-[#F7931A]">
                            ₺{currentPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                )}

                <Input
                    type="number"
                    label="Miktar / Adet"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    required
                />

                <Input
                    type="number"
                    label="Alış Fiyatı (₺)"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    required
                />

                <Input
                    type="date"
                    label="Alış Tarihi"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                        İptal
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Ekleniyor...' : 'Ekle'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
