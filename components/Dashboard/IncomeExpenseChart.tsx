'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getLast6MonthsTrend } from '@/lib/calculations';

export function IncomeExpenseChart() {
    const [data, setData] = useState<{ month: string; income: number; expense: number }[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const trendData = await getLast6MonthsTrend();
        setData(trendData);
    };

    return (
        <Card className="col-span-1 md:col-span-2">
            <h2 className="text-xl font-heading font-semibold mb-6 gradient-text">
                Gelir/Gider Trendi (Son 6 Ay)
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                        dataKey="month"
                        stroke="#94A3B8"
                        style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12 }}
                    />
                    <YAxis
                        stroke="#94A3B8"
                        style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0F1115',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            fontFamily: 'var(--font-inter)',
                        }}
                        labelStyle={{ color: '#94A3B8' }}
                    />
                    <Legend
                        wrapperStyle={{
                            fontFamily: 'var(--font-inter)',
                            fontSize: 14,
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Gelir"
                        dot={{ fill: '#10B981', r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#EF4444"
                        strokeWidth={2}
                        name="Gider"
                        dot={{ fill: '#EF4444', r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
