import { z } from "zod";

export const noteCreateValidator = z.object({
    title:z.string().min(3).max(100),
    content:z.string().min(10),
    category:z.string().min(3).max(20),
    color:z.string().min(3).max(20),
});

export const noteUpdateValidator = z.object({
    title:z.string().min(3).max(100),
    content:z.string().min(10),
    category:z.string().min(3).max(20),
    color:z.string().min(3).max(20),
});

export const noteDeleteValidator = z.object({
    id:z.string().min(3).max(20),
})