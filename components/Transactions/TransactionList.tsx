'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { db, Transaction } from '@/lib/db';
import { Trash2 } from 'lucide-react';

interface TransactionListProps {
    refresh: number;
}

export function TransactionList({ refresh }: TransactionListProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        loadTransactions();
    }, [refresh]);

    const loadTransactions = async () => {
        const allTransactions = await db.transactions.orderBy('date').reverse().toArray();
        setTransactions(allTransactions);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Bu işlemi silmek istediğinizden emin misiniz?')) {
            await db.transactions.delete(id);
            loadTransactions();
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('tr-TR');
    };

    if (transactions.length === 0) {
        return (
            <Card>
                <div className="text-center py-12">
                    <p className="text-[#94A3B8] font-body">Henüz işlem kaydı yok</p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-black/30">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-mono text-[#94A3B8] uppercase tracking-wider">
                                Tarih
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-mono text-[#94A3B8] uppercase tracking-wider">
                                Tip
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-mono text-[#94A3B8] uppercase tracking-wider">
                                Kategori
                            </th>
                            <th className="px-6 py-4 text-right text-sm font-mono text-[#94A3B8] uppercase tracking-wider">
                                Tutar
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-mono text-[#94A3B8] uppercase tracking-wider">
                                Not
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-mono text-[#94A3B8] uppercase tracking-wider">
                                İşlem
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-sm font-body text-white">
                                    {formatDate(transaction.date)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-mono uppercase ${transaction.type === 'income'
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                                            : 'bg-red-500/20 text-red-400 border border-red-500/50'
                                        }`}>
                                        {transaction.type === 'income' ? 'Gelir' : 'Gider'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-body text-white">
                                    {transaction.category}
                                </td>
                                <td className={`px-6 py-4 text-sm font-mono text-right font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                </td>
                                <td className="px-6 py-4 text-sm font-body text-[#94A3B8]">
                                    {transaction.note || '-'}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => transaction.id && handleDelete(transaction.id)}
                                        className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
