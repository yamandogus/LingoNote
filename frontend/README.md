# LingoNote Frontend

React Native ve Expo kullanılarak geliştirilmiş mobil uygulama.

## Kurulum

1. **Dependencies yükleyin:**
```bash
npm install
```

2. **Expo CLI ile çalıştırın:**
```bash
npm start
```

## Özellikler

- **Authentication** - Kullanıcı kaydı ve girişi
- **Note Management** - Not oluşturma, düzenleme, silme
- **Categories** - Notları kategorilere ayırma
- **Dark/Light Theme** - Tema desteği
- **Responsive Design** - Farklı ekran boyutlarına uyum

## Teknolojiler

- **React Native** - Mobil uygulama framework'ü
- **Expo** - Development platform
- **TypeScript** - Type safety
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - Navigation
- **AsyncStorage** - Local storage
- **React Native Toast Message** - Bildirimler

## Proje Yapısı

```
frontend/
├── app/                    # Expo Router sayfaları
│   ├── auth/              # Authentication sayfaları
│   └── (tabs)/            # Ana uygulama sayfaları
├── components/            # Yeniden kullanılabilir bileşenler
├── contexts/              # React Context'ler
├── services/              # API servisleri
├── hooks/                 # Custom hooks
└── constants/             # Sabitler
```

## API Bağlantısı

Uygulama `http://localhost:3000/api` adresindeki backend API'sine bağlanır.

### Gerekli Environment Variables

Backend'in çalışır durumda olması ve aşağıdaki endpoint'lerin mevcut olması gerekir:

- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/user` - Kullanıcı bilgileri
- `GET /api/notes` - Notları listele
- `POST /api/notes` - Not oluştur
- `PUT /api/notes/:id` - Not güncelle
- `DELETE /api/notes/:id` - Not sil

## Çalıştırma

**Development:**
```bash
npm start
```

**Android:**
```bash
npm run android
```

**iOS:**
```bash
npm run ios
```

**Web:**
```bash
npm run web
```
