# CafeConnect Mobil Uygulaması

CafeConnect (eski adıyla Kahve360) mobil uygulaması, kahve dükkanlarını keşfetmek, sadakat kartlarınızı yönetmek ve kampanyalardan haberdar olmak için tasarlanmış bir React Native uygulamasıdır.

## Özellikler

- Kahve dükkanlarını haritada görüntüleme
- Kullanıcı konumuna göre en yakın kahve dükkanlarını listeleme
- Marka ve özelliklere göre filtreleme
- Sadakat kartları yönetimi
- Kampanyaları takip etme
- Kullanıcı profili ve tercihler

## Kurulum

### Ön Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- React Native CLI
- iOS için XCode
- Android için Android Studio ve JDK

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
cd mobile
npm install
```

2. iOS için pod'ları yükleyin:
```bash
cd ios
pod install
cd ..
```

3. Uygulamayı çalıştırın:

iOS için:
```bash
npm run ios
```

Android için:
```bash
npm run android
```

## Proje Yapısı

```
mobile/
├── src/
│   ├── api/                # API istekleri
│   ├── components/         # Paylaşılan UI bileşenleri
│   ├── screens/            # Ekranlar (Ana Sayfa, Harita, Profil vb.)
│   ├── navigation/         # Navigasyon yapılandırması
│   ├── models/             # Veri modelleri
│   ├── services/           # Konum hizmetleri, bildirimler vb.
│   ├── utils/              # Yardımcı fonksiyonlar
│   └── assets/             # Görseller, fontlar vb.
├── App.tsx                 # Ana uygulama bileşeni
├── index.js                # Giriş noktası
└── app.json                # Uygulama yapılandırması
```

## Geliştirme

Bu mobil uygulama, mevcut CafeConnect web uygulamasının mobil versiyonudur. Web uygulamasından farklı olarak, React Native kullanılarak hem iOS hem de Android platformlarında çalışacak şekilde tasarlanmıştır.

### Web Uygulamasından Taşınan Özellikler

- Konum tabanlı kahve dükkanı sıralaması
- Marka ve özellik filtreleme
- Sadakat kartları
- Kampanya takibi

### Mobil'e Özel Özellikler

- Yerel bildirimler
- QR kod tarama
- Çevrimdışı mod
- Konum izinleri yönetimi

## Katkıda Bulunma

1. `mobile-dev` branch'ini kullanın
2. Yeni özellikler için feature branch'leri oluşturun
3. Pull request gönderin

## Lisans

Bu proje özel lisans altında dağıtılmaktadır.
