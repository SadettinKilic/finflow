import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(req: Request) {
    try {
        const { nick } = await req.json();

        if (!nick) {
            return NextResponse.json({ error: 'Nick is required' }, { status: 400 });
        }

        const normalizedNick = nick.trim().toLowerCase();

        // Check if nick exists in Redis leaderboard
        // We use zscore to see if the user has a score in the 'leaderboard' sorted set
        const exists = await kv.zscore('leaderboard', normalizedNick);

        return NextResponse.json({
            available: exists === null,
            exists: exists !== null
        });
    } catch (error) {
        console.error('Check nick error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
