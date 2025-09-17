# LingoNote Backend

PostgreSQL ve Prisma ORM kullanan Express.js backend API'si.

## Kurulum

1. **Dependencies yükleyin:**
```bash
npm install
```

2. **Environment değişkenlerini ayarlayın:**
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/lingonote"
JWT_SECRET="your-secret-key-here"
PORT=3000
NODE_ENV=development
```

3. **Prisma client'ı generate edin:**
```bash
npm run db:generate
```

4. **Database'i oluşturun:**
```bash
npm run db:push
```

## Çalıştırma

**Development modunda:**
```bash
npm run dev
```

**Production modunda:**
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/auth/user` - Kullanıcı bilgileri (Auth gerekli)

### Notes
- `GET /api/notes` - Tüm notları listele (Auth gerekli)
- `POST /api/notes` - Yeni not oluştur (Auth gerekli)
- `GET /api/notes/:id` - Tek not getir (Auth gerekli)
- `PUT /api/notes/:id` - Not güncelle (Auth gerekli)
- `DELETE /api/notes/:id` - Not sil (Auth gerekli)

## Database Schema

### User
- `id` (String, Primary Key)
- `username` (String, Unique)
- `email` (String, Unique)
- `password` (String, Hashed)
- `createdAt` (DateTime)

### Note
- `id` (String, Primary Key)
- `title` (String)
- `content` (String)
- `category` (String)
- `color` (String)
- `userId` (String, Foreign Key)
- `createdAt` (DateTime)

## Teknolojiler

- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

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