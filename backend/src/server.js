import app from "./app.js"; // app.js'den app import edildi
import dotenv from "dotenv";
dotenv.config();

// Port dinleme
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server çalışıyor 👉 http://localhost:${PORT}`);
});
