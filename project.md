---
project: "FinFlow"
version: "1.0.0"
stack: 
  - Framework: "Next.js 14+ (App Router)"
  - CSS: "Tailwind CSS"
  - Database: "IndexedDB (via Dexie.js)"
  - Icons: "Lucide React"
  - Charts: "Recharts"
constraints:
  - "No Backend: All data must stay in the browser (IndexedDB)."
  - "Private: To be deployed on a private Vercel domain."
  - "Responsive: Mobile-first design."
---

# 🌊 FinFlow | Project Manifest & Backlog

FinFlow, kişisel finans yönetimini yerel veritabanı kullanarak çözen, gelir/gider ve kıymetli maden (altın/gümüş) takibi yapan bir Dashboard uygulamasıdır.

## 🏗️ Mimari Gereksinimler
- **Storage:** Tarayıcı kapansa bile veriler `Dexie.js` ile IndexedDB'de saklanmalı.
- **State Management:** Veri güncellendiğinde grafikler anlık (real-time) tepki vermeli.
- **Visuals:** Sade, "Glassmorphism" veya temiz "Slate" teması kullanılmalı.

---

## 🚀 Uygulama Fazları (Task List)

### 1. Kurulum ve Veri Katmanı
- [ ] Next.js projesini TypeScript ve Tailwind ile başlat. - [ ] `lib/db.ts` dosyasında Dexie şemasını kur: - `transactions`: `++id, type, category, amount, date, note`
    - `assets`: `++id, assetType (gold/silver), weight, buyPrice, date`
- [ ] Global Layout ve Sidebar yapısını oluştur. ### 2. Finansal İşlemler (Gelir/Gider)
- [ ] Gelir ve Gider ekleme formu (Modal) oluştur. - [ ] İşlem listesi (Transaction Table) bileşenini yap (Silme özelliği dahil). - [ ] Toplam bakiye hesaplama mantığını (Income - Expense) kur. ### 3. Varlık Yönetimi (Altın & Gümüş)
- [ ] Emtia ekleme ekranı oluştur (Gramaj ve Alış fiyatı girişi). - [ ] Varlıkların toplam değerini hesaplayan kartlar yap. - [ ] *Opsiyonel:* Güncel kurları manuel girmek için bir "Settings" alanı ekle. ### 4. Dashboard ve Görselleştirme
- [ ] **Ana Özet:** Toplam Varlık, Aylık Gider, Aylık Gelir kartları. - [ ] **Harcama Grafiği:** Kategori bazlı Pasta Grafik (Recharts). - [ ] **Akış Grafiği:** Son 6 ayın Gelir/Gider trend çizgisi. - [ ] **Kar/Zarar:** Altın/Gümüş için "Maliyet vs Güncel Değer" analizi. ### 5. Veri Güvenliği ve Export
- [ ] Verileri JSON olarak dışa aktarma (Backup) özelliği. - [ ] JSON dosyasından verileri geri yükleme (Import) özelliği. - [ ] Sayfa girişine basit bir Local Password (PIN) ekranı ekle. ---

## 📊 Öngörülen Veri Yapısı (Schema)

```typescript
interface Transaction {
  id?: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: Date;
  note?: string;
}

interface Asset {
  id?: number;
  assetType: 'gold' | 'silver';
  weight: number; // Gram
  buyPrice: number; // Birim alış fiyatı
  date: Date;
}
