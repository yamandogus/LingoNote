import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "gizli_anahtar";
export const PORT = process.env.PORT || 3000;
// Başka configler de ekleyebilirsin