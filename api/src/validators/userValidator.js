import { z } from "zod";

export const registerValidator = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateProfileValidator = z.object({
  username: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  avatar: z.string().url().optional(),
});
