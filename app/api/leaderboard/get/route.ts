import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'leaderboard.json');

interface LeaderboardEntry {
    nick: string;
    totalProfit: number;
    lastUpdate: string;
}

// Read leaderboard data
async function readLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function GET() {
    try {
        const leaderboard = await readLeaderboard();

        // Sort by totalProfit descending
        const sorted = leaderboard.sort((a, b) => b.totalProfit - a.totalProfit);

        // Add rank
        const withRank = sorted.map((entry, index) => ({
            rank: index + 1,
            nick: entry.nick,
            totalProfit: entry.totalProfit,
            lastUpdate: entry.lastUpdate,
        }));

        return NextResponse.json({
            leaderboard: withRank,
        });
    } catch (error) {
        console.error('Leaderboard get error:', error);
        return NextResponse.json(
            { leaderboard: [] },
            { status: 500 }
        );
    }
}
