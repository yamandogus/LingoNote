// Bu dosyada PostgreSQL veritabanı bağlantısı yapılacak.
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('PostgreSQL bağlantısı başarılı!');
  } catch (error) {
    console.error('PostgreSQL bağlantı hatası:', error.message);
    process.exit(1);
  }
};

export { prisma, connectDB };