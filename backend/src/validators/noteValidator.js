import { z } from "zod";

export const noteCreateValidator = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır.").max(100),
  content: z.string().min(10, "İçerik en az 10 karakter olmalıdır."),
  category: z.string().min(3).max(20),
  color: z.string().min(3).max(20),
  image: z.string().url("Geçerli bir URL giriniz.").optional(), // Opsiyonel ve URL formatında
});

export const noteUpdateValidator = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır.").max(100).optional(),
  content: z.string().min(10, "İçerik en az 10 karakter olmalıdır.").optional(),
  category: z.string().min(3).max(20).optional(),
  color: z.string().min(3).max(20).optional(),
  image: z.string().url("Geçerli bir URL giriniz.").optional(), // Opsiyonel ve URL formatında
});

export const noteDeleteValidator = z.object({
  id: z.string().min(3).max(20),
});
