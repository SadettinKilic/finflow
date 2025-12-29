import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'leaderboard.json');

interface LeaderboardEntry {
    nick: string;
    totalProfit: number;
    lastUpdate: string;
}

// Ensure data directory exists
async function ensureDataDir() {
    const dataDir = path.join(process.cwd(), 'data');
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
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

// Write leaderboard data
async function writeLeaderboard(data: LeaderboardEntry[]) {
    await ensureDataDir();
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: Request) {
    try {
        const { nick, totalProfit } = await request.json();

        if (!nick || typeof totalProfit !== 'number') {
            return NextResponse.json(
                { success: false, error: 'Invalid data' },
                { status: 400 }
            );
        }

        // Read current leaderboard
        const leaderboard = await readLeaderboard();

        // Find existing entry or create new
        const existingIndex = leaderboard.findIndex(entry => entry.nick === nick);

        if (existingIndex >= 0) {
            // Update existing
            leaderboard[existingIndex] = {
                nick,
                totalProfit,
                lastUpdate: new Date().toISOString(),
            };
        } else {
            // Add new
            leaderboard.push({
                nick,
                totalProfit,
                lastUpdate: new Date().toISOString(),
            });
        }

        // Save
        await writeLeaderboard(leaderboard);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Leaderboard submit error:', error);
        return NextResponse.json(
            { success: false, error: 'Server error' },
            { status: 500 }
        );
    }
}
