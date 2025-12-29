# 🌊 FinFlow - Kişisel Finans & Yatırım Takibi

FinFlow, gelir/gider yönetimi ve çeşitli varlık yatırımlarınızı (altın, dolar, euro) takip etmenizi sağlayan, **leaderboard** sistemiyle rekabetçi bir yaklaşım sunan modern Next.js uygulamasıdır.

## ✨ Özellikler

### 💰 Gelir/Gider Yönetimi
- Gelir ve gider işlemleri ekleme, görüntüleme ve silme
- Kategori bazlı harcama takibi
- Aylık gelir ve gider istatistikleri
- Son 6 ayın gelir/gider trend grafiği

### 🪙 Çoklu Varlık Yönetimi
FinFlow, **7 farklı varlık tipi** ile yatırımlarınızı takip etmenizi sağlar:
- **Gram Altın** - Gram bazında altın yatırımı
- **Çeyrek Altın** - Çeyrek altın adedi
- **Yarım Altın** - Yarım altın adedi
- **Tam Altın** - Tam altın adedi
- **Reşat Altın** - Reşat altını adedi
- **Amerikan Doları (USD)** - Dolar yatırımı
- **Euro (EUR)** - Euro yatırımı

Her varlık için:
- Alış fiyatı ve güncel değer takibi
- Otomatik kar/zarar hesaplama
- Yüzdelik getiri gösterimi
- API üzerinden güncel fiyat güncelleme

### 📊 Dashboard ve Analizler
- Toplam varlık, bakiye ve aylık istatistikler
- İnteraktif gelir/gider trend grafiği (Recharts)
- Kategori bazlı harcama pasta grafiği
- Tüm varlık tipleri için detaylı kar/zarar analizi
- Real-time API fiyat gösterimi

### 🏆 Leaderboard Sistemi
- **Nick-based** kullanıcı sistemi
- Toplam kar sıralaması (en yüksekten en düşüğe)
- Top 3 için özel madalya gösterimi (🥇🥈🥉)
- Kendi sıranızı vurgulu görme
- Otomatik 30 saniye güncelleme
- Vercel serverless backend ile güçlendirilmiş

### 🔒 Güvenlik ve Veri
- Nick + 4 haneli PIN ile güvenli giriş
- Tüm kişisel veriler tarayıcıda IndexedDB ile saklanır
- **Gizlilik:** Gelir/gider detayları tamamen local, sadece toplam kar backend'e gönderilir
- JSON olarak veri dışa/içe aktarma (Yedekleme/Geri Yükleme)
- Session-based unlock (tab kapatılınca PIN tekrar ister)

### 🌐 API Entegrasyonu
- **Otomatik fiyat güncelleme:** https://finans.truncgil.com/v4/today.json
- Her session başında API'den güncel fiyatlar çekilir
- 5 dakika cache mekanizması
- Manuel refresh özelliği
- Hata durumunda fallback

### 🎨 Bitcoin DeFi Aesthetic
- True void (#030304) arka plan
- Bitcoin orange (#F7931A) gradient ve glow efektleri
- Glassmorphism card tasarımları
- Grid pattern backgrounds
- Premium ve modern kullanıcı arayüzü

## 🛠️ Teknolojiler

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** IndexedDB (via Dexie.js)
- **Backend:** Vercel Serverless Functions
- **API:** finans.truncgil.com (live prices)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Fonts:** Space Grotesk, Inter, JetBrains Mono
- **Language:** TypeScript

## 🚀 Kurulum

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd finflow
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Development sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 📖 Kullanım Kılavuzu

### İlk Kullanım - Kayıt
1. Uygulamayı ilk açtığınızda **"Kayıt Ol"** sekmesini seçin
2. Benzersiz bir kullanıcı adı (nick) girin
3. 4 haneli PIN belirleyin
4. "Kayıt Ol" butonuna tıklayın
5. Artık dashboard'a erişebilirsiniz

### Giriş Yapma
1. "Giriş Yap" sekmesinde kullanıcı adınızı girin
2. PIN'inizi girin
3. Aynı browser session'ında sayfalar arası PIN tekrar sorulmaz
4. Tab kapatıp açtığınızda tekrar giriş yapmanız gerekir

### Varlık Ekleme
1. Sol menüden "Varlıklar" sayfasına gidin
2. "Yeni Varlık" butonuna tıklayın
3. Varlık tipini seçin (7 seçenek)
4. **Güncel fiyat otomatik gösterilir**
5. Miktar/adet, alış fiyatı ve tarihi girin
6. "Ekle" butonuna tıklayın

### Leaderboard
1. Sol menüden "Leaderboard" sayfasına gidin
2. Toplam karınız otomatik hesaplanır ve backend'e gönderilir
3. Tüm kullanıcıların sıralamasını görürsünüz
4. Kendi sıranız turuncu renkle vurgulanır
5. Sayfa her 30 saniyede otomatik yenilenir

### API Fiyat Güncelleme
1. "Ayarlar" sayfasından API durumunu görüntüleyin
2. Manuel refresh için yenile butonuna tıklayın
3. Tüm varlık fiyatları ve değişim yüzdeleri gösterilir

### Veri Yedekleme
1. "Ayarlar" sayfasından "JSON Olarak İndir" butonuna tıklayın
2. JSON dosyası bilgisayarınıza indirilir

### Veri Geri Yükleme
1. "Ayarlar" sayfasından "JSON Dosyası Seç" butonuna tıklayın
2. Daha önce indirdiğiniz JSON dosyasını seçin
3. Verileriniz geri yüklenecek

## 🏗️ Proje Yapısı

```
finflow/
├── app/                          # Next.js App Router
│   ├── api/                      # Serverless API routes
│   │   └── leaderboard/
│   │       ├── submit/route.ts   # Kar gönderme
│   │       └── get/route.ts      # Leaderboard alma
│   ├── page.tsx                  # Dashboard
│   ├── transactions/page.tsx     # İşlemler
│   ├── assets/page.tsx           # Varlıklar
│   ├── leaderboard/page.tsx      # Leaderboard
│   ├── settings/page.tsx         # Ayarlar
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React bileşenleri
│   ├── ui/                       # Temel UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── Dashboard/                # Dashboard bileşenleri
│   ├── Transactions/             # İşlem bileşenleri
│   ├── Assets/                   # Varlık bileşenleri
│   ├── Settings/                 # Ayar bileşenleri
│   ├── AppLayout.tsx             # Ana layout wrapper
│   ├── Sidebar.tsx               # Navigasyon
│   └── PINScreen.tsx             # Nick + PIN girişi
├── lib/                          # Utilities
│   ├── api.ts                    # API service
│   ├── db.ts                     # Dexie database
│   ├── auth.ts                   # Authentication
│   └── calculations.ts           # Hesaplamalar
└── data/                         # Backend storage
    └── leaderboard.json          # Leaderboard verisi
```

## 🎯 Varlık Tipleri ve API Mapping

| Varlık Tipi | API Key | Açıklama |
|-------------|---------|----------|
| Gram Altın | `GRA` | Gram bazında altın |
| Çeyrek Altın | `CEYREKALTIN` | Çeyrek altın |
| Yarım Altın | `YARIMALTIN` | Yarım altın |
| Tam Altın | `TAMALTIN` | Tam altın |
| Reşat Altın | `RESATALTIN` | Reşat altını |
| USD | `USD` | Amerikan Doları |
| EUR | `EUR` | Euro |

## 🌐 Deployment - Vercel

### Otomatik Deployment

1. GitHub'a push edin
2. [Vercel](https://vercel.com) hesabınıza giriş yapın
3. "New Project" seçin
4. Repository'nizi seçin
5. Deploy butonuna tıklayın

Vercel otomatik olarak:
- Next.js uygulamasını build edecek
- Serverless functions'ları deploy edecek
- `data/` klasörünü oluşturacak

### Manual Build

```bash
npm run build
npm start
```

### Environment Variables

Herhangi bir environment variable gerekmemektedir. Uygulama tamamen client-side + serverless functions ile çalışır.

## 🔐 Güvenlik ve Gizlilik

### Veri Saklama
- **Local (IndexedDB):** Tüm gelir/gider işlemleri, varlık detayları, kullanıcı bilgileri
- **Backend (JSON):** Sadece kullanıcı nick'i ve toplam kar miktarı
- **Session Storage:** Unlock durumu ve API cache

### Privacy-First Yaklaşım
- Kimse başkasının gelir/gider detaylarını göremez
- Leaderboard'da sadece nick ve toplam kar görünür
- Backend'e hiçbir hassas bilgi gönderilmez

### Yedekleme Önerileri
- Düzenli olarak JSON export yapın
- Browser cache'i temizlerseniz tüm veriler silinir
- Önemli: PIN'inizi unutmayın!

## 📱 Tarayıcı Desteği

- Chrome (önerilen)
- Firefox
- Safari
- Edge

IndexedDB destekleyen tüm modern tarayıcılar.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 🆕 Yenilikler (v2.0)

### Major Updates
- ✨ **7 Varlık Tipi:** Artık sadece altın/gümüş değil, çeyrek, yarım, tam, reşat altın + dolar + euro
- 🌐 **API Entegrasyonu:** Manuel fiyat girişi kaldırıldı, otomatik güncel fiyatlar
- 🏆 **Leaderboard Sistemi:** Toplam kar sıralaması ve rekabetçi deneyim
- 👤 **Nick-based Auth:** PIN yanında kullanıcı adı ile giriş
- 📊 **Gelişmiş Analizler:** Varlık tipi bazında detaylı kar/zarar

---

**Made with ❤️ using Next.js, Bitcoin DeFi Aesthetic & finans.truncgil.com API**
