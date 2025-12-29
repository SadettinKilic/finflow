import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: Request) {
    try {
        const { balance, date } = await request.json();
        const apiKey = process.env.GEMINI_API_KEY;
        console.log('Advice Request:', { balance, date, hasApiKey: !!apiKey });

        if (!apiKey) {
            console.error('Missing GEMINI_API_KEY for Advice');
            // Mock response if API key is missing (fallback)
            return NextResponse.json({
                success: true,
                advice: `(Demo Modu - API Key Eksik) Mevcut bakiye: ${balance} TL. Altın fiyatları yükseliş trendinde olabilir. Portföyünüzü çeşitlendirerek %60 altın, %40 gümüş değerlendirebilirsiniz.`
            });
        }

        const prompt = `Sen bir finansal yatırım danışmanısın. Kullanıcının ${balance} TL bakiyesi var. Tarih: ${date}. 
    Kısa, nötr ve profesyonel bir dille, bu bakiye ile şu anki piyasa koşullarına göre mantıklı bir altın/gümüş sepeti önerisi yap.
    Örnek format: "Şu anki piyasada X TL ile Y alabilirsin çünkü Z."
    Yatırım tavsiyesi değildir uyarısı ekleme, sadece dostane bir öneri sun. Çok kısa tut (max 2-3 cümle).`;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('Gemini Advice Response:', text);

        return NextResponse.json({
            success: true,
            advice: text
        });

    } catch (error: any) {
        console.error('Advice error:', error);

        let errorMessage = 'Tavsiye oluşturulamadı';
        if (error.message?.includes('429') || error.message?.includes('Quota') || error.message?.includes('Too Many Requests')) {
            errorMessage = 'Bugünlük çok yoruldum, piyasaları analiz etmekten devrelerim ısındı. Lütfen yarın tekrar gel! 🤖💤';
        }

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}

