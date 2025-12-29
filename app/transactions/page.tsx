'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { TransactionForm } from '@/components/Transactions/TransactionForm';
import { TransactionList } from '@/components/Transactions/TransactionList';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function TransactionsPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const handleSuccess = () => {
        setRefresh(prev => prev + 1);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-heading font-bold gradient-text mb-2">
                            İşlemler
                        </h1>
                        <p className="text-[#94A3B8] font-body">
                            Gelir ve gider işlemlerinizi yönetin
                        </p>
                    </div>

                    <Button onClick={() => setIsFormOpen(true)}>
                        <Plus size={20} className="mr-2" />
                        Yeni İşlem
                    </Button>
                </div>

                <TransactionList refresh={refresh} />

                <TransactionForm
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={handleSuccess}
                />
            </div>
        </AppLayout>
    );
}
