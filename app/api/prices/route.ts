import { NextResponse } from 'next/server';

const EXTERNAL_API_URL = 'https://finans.truncgil.com/v4/today.json';

export async function GET() {
    try {
        // Fetch from external API with a cache-busting timestamp
        // The server-side fetch is not subject to CORS
        const response = await fetch(`${EXTERNAL_API_URL}?t=${Date.now()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Mimic a browser agent if necessary, though usually not needed for public APIs
                'User-Agent': 'Mozilla/5.0 (compatible; FinFlow/1.0)',
            },
            // We want fresh data on the server side too
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`External API responded with ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Price Proxy Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch prices' },
            { status: 500 }
        );
    }
}
