import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
    try {
        const { type, details } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                success: false,
                error: 'API Key missing'
            }, { status: 500 });
        }

        let prompt = '';

        if (type === 'car') {
            prompt = `Sen bir araç değerleme uzmanısın. Şu özelliklerdeki aracın Türkiye ikinci el piyasasındaki ortalama tahmini değerini (TL) söyle:
      Marka: ${details.brand}
      Model: ${details.model}
      Yıl: ${details.year}
      KM: ${details.km}
      
      Sadece tek bir sayısal değer (TL) ver. Açıklama yapma. Örn: 1250000`;
        } else if (type === 'home') {
            prompt = `Sen bir gayrimenkul değerleme uzmanısın. Şu özelliklerdeki evin Türkiye piyasasındaki ortalama tahmini değerini (TL) söyle:
      Konum: ${details.location}
      Oda Sayısı: ${details.roomCount}
      Büyüklük: ${details.m2} m2
      
      Sadece tek bir sayısal değer (TL) ver. Açıklama yapma. Örn: 5000000`;
        } else if (type === 'land') {
            prompt = `Sen bir gayrimenkul değerleme uzmanısın. Şu özelliklerdeki arsanın Türkiye piyasasındaki ortalama tahmini değerini (TL) söyle:
      Konum: ${details.location}
      Büyüklük: ${details.m2} m2
      
      Sadece tek bir sayısal değer (TL) ver. Açıklama yapma. Örn: 3000000`;
        } else {
            return NextResponse.json({ success: false, error: 'Invalid type' });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('Gemini Valuation Response:', text);

        // Extract number from text (remove non-numeric chars)
        const price = parseInt(text.replace(/[^0-9]/g, ''));

        if (isNaN(price)) {
            throw new Error('Fiyat tahmin edilemedi');
        }

        return NextResponse.json({
            success: true,
            estimatedPrice: price
        });
    } catch (error) {
        console.error('Valuation error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to estimate value' },
            { status: 500 }
        );
    }
}
