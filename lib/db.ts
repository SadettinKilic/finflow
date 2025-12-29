import Dexie, { type EntityTable } from 'dexie';
import type { AssetType } from './api';

// TypeScript Interfaces
export interface Transaction {
    id?: number;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: Date;
    note?: string;
    userId: number; // Link to user
}

export interface Asset {
    id?: number;
    assetType: AssetType; // 7 types now
    quantity: number; // Adet (miktar)
    buyPrice: number; // Birim alış fiyatı
    date: Date;
    userId: number; // Link to user
}

export interface User {
    id?: number;
    nick: string; // Unique nickname
    pin: string; // 4 digit PIN
    createdAt: Date;
}

// Dexie Database
const db = new Dexie('FinFlowDB') as Dexie & {
    transactions: EntityTable<Transaction, 'id'>;
    assets: EntityTable<Asset, 'id'>;
    users: EntityTable<User, 'id'>;
};

// Schema Definition
db.version(2).stores({
    transactions: '++id, type, category, amount, date, userId',
    assets: '++id, assetType, quantity, buyPrice, date, userId',
    users: '++id, &nick, pin, createdAt', // &nick = unique index
});

// Migrate old data if exists (version 1 to version 2)
db.version(1).stores({
    transactions: '++id, type, category, amount, date, note',
    assets: '++id, assetType, weight, buyPrice, date',
    settings: '++id, goldPrice, silverPrice',
});

export { db };
