# LingoNote Backend

Bu klasör, LingoNote uygulamasının backend (sunucu tarafı) kodlarını içerir.

## Kullanılacak Teknolojiler ve Paketler
- **Express.js**: API sunucusu
- **PostgreSQL**: Veritabanı
- **zod**: Veri doğrulama
- **dotenv**: Ortam değişkenleri yönetimi
- **bcrypt**: Şifreleme
- **winston**: Loglama
- **jsonwebtoken (jwt)**: Kimlik doğrulama
- **helmet**: Güvenlik

## Klasör ve Dosya Yapısı
- `src/` : Tüm backend kaynak kodları burada olacak.
  - `controllers/` : API iş mantığı (her endpoint için bir dosya)
  - `routes/` : Express route tanımlamaları
  - `middlewares/` : Express middleware'leri (auth, error handler, vs.)
  - `models/` : Veritabanı modelleri
  - `utils/` : Yardımcı fonksiyonlar
  - `validators/` : Zod ile doğrulama şemaları
  - `config/` : Konfigürasyon dosyaları (örn. veritabanı bağlantısı, dotenv)
  - `app.js` : Express uygulamasının ana dosyası
  - `server.js` : Sunucunun başlatıldığı dosya
- `.env.example` : Ortam değişkenleri örnek dosyası

Her dosyanın içinde, o dosyada ne yapılacağına dair kısa bir açıklama olacak. Kodlar boş olacak, sadece açıklama satırı olacak. 