# KepenkPro — Endüstriyel Kapı & Kepenk Sistemleri Web Sitesi

Kurumsal bir kepenk ve endüstriyel kapı firması için geliştirilmiş tam stack web sitesi.  
Frontend React + Tailwind, backend Rust + Actix-web, veritabanı SQLite.

---

## Teknoloji Yığını

| Katman | Teknoloji |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Rust, Actix-web 4, Actix-cors |
| Veritabanı | SQLite (rusqlite — bundled) |
| İkonlar | Lucide React |
| Router | React Router DOM v7 |

---

## Proje Yapısı

```
demo-site/
├── frontend/
│   ├── public/
│   │   └── gorseller/          # Ürün görselleri (urun1.png ... urun10.png)
│   └── src/
│       ├── components/
│       │   ├── Header.jsx       # Sticky header, masaüstü dropdown menü
│       │   ├── MobilMenu.jsx    # Sağdan kayan drawer menü (mobil)
│       │   └── Footer.jsx       # Footer
│       ├── pages/
│       │   ├── AnaSayfa.jsx     # Hero, özellikler, ürün önizleme, referanslar
│       │   ├── Hakkimizda.jsx   # Şirket profili, istatistikler, referanslar
│       │   ├── Urunler.jsx      # Tüm ürün kartları
│       │   ├── Galeri.jsx       # Proje galerisi
│       │   └── Iletisim.jsx     # İletişim formu → backend API
│       ├── data/
│       │   └── icerik.js        # Tüm statik içerik (ürünler, referanslar, iletişim)
│       ├── App.jsx              # Router yapısı, ScrollEnUst
│       └── index.css            # Tailwind import
└── backend/
    ├── src/
    │   └── main.rs              # Actix-web sunucu, SQLite işlemleri
    ├── Cargo.toml
    └── iletisim.db              # SQLite veritabanı (otomatik oluşur)
```

---

## Kurulum ve Çalıştırma

### Gereksinimler
- [Node.js](https://nodejs.org) (v18+)
- [Rust](https://rustup.rs) (v1.70+)

### 1. Backend

```bash
cd backend

# Geliştirme
cargo run

# Production (önerilen)
cargo build --release
./target/release/backend
```

Backend `http://0.0.0.0:5051` adresinde başlar.  
`iletisim.db` dosyası ilk çalıştırmada otomatik oluşturulur.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://0.0.0.0:4000` adresinde başlar.

---

## API Endpointleri

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/api/saglik` | Sunucu sağlık kontrolü |
| POST | `/api/iletisim` | İletişim formu kaydı |
| GET | `/api/iletisim` | Tüm kayıtları listele |

### POST `/api/iletisim` — İstek Gövdesi

```json
{
  "ad_soyad": "Ad Soyad",
  "email": "ornek@email.com",
  "telefon": "+90 5xx xxx xx xx",
  "konu": "Teklif Talebi",
  "mesaj": "Mesaj içeriği"
}
```

### Yanıt

```json
{
  "basarili": true,
  "mesaj": "Mesajınız alındı, en kısa sürede dönüş yapacağız"
}
```

---

## Sayfalar

| Sayfa | Yol | Açıklama |
|---|---|---|
| Ana Sayfa | `/` | Hero, özellikler, ürün önizleme, referanslar |
| Hakkımızda | `/hakkimizda` | Şirket profili, istatistikler |
| Ürünler | `/urunler` | 10 ürün kategorisi |
| Galeri | `/galeri` | 6 proje fotoğrafı |
| İletişim | `/iletisim` | Form + iletişim bilgileri |

---

## İçerik Güncelleme

Tüm statik içerik `frontend/src/data/icerik.js` dosyasında tutulur.

```js
// Ürün eklemek / düzenlemek
export const urunler = [ ... ]

// İletişim bilgilerini güncellemek
export const iletisimBilgileri = {
  adres: "...",
  telefon: "...",
  email: "...",
  calisma: "...",
}
```

---

## Cloudflare Tunnel ile Yayına Alma

```bash
# Sadece frontend'i expose et, backend Vite proxy üzerinden çalışır
cloudflared tunnel --url localhost:4000
```

Vite'ın proxy ayarı (`vite.config.js`) sayesinde `/api/*` istekleri  
otomatik olarak `localhost:5051` backend'ine yönlendirilir.  
Dışarıdan yalnızca `4000` portu görünür, backend güvende kalır.

---

## Veritabanı Kayıtlarını Görüntüleme

```bash
# SQLite CLI ile
sqlite3 backend/iletisim.db "SELECT * FROM iletisim;"

# Veya API üzerinden
curl http://localhost:5051/api/iletisim
```

---

## Geliştirici Notları

- Yeni sayfa eklemek için `pages/` altına `.jsx` dosyası oluştur, `App.jsx`'e route ekle
- Yeni ürün eklemek için sadece `data/icerik.js` dosyasını düzenle
- Görseller `frontend/public/gorseller/` klasöründe, `urun1.png` ... `urun10.png` formatında
- Backend tek dosya (`main.rs`), karmaşık değil — struct → handler → main akışı

---

*Bu proje bir demo / kendini kanıtlama projesidir.*  
*İçerisindeki firma adı, adres, telefon ve e-posta bilgileri tamamen kurgusaldır, gerçek bir kuruluşa ait değildir.*
