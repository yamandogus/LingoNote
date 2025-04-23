import axios from "axios";

export const translateText = async (text: string, from = "en", to = "tr") => {
  try {
    const res = await axios.post(
      "https://libretranslate.de/translate",
      {
        q: text,
        source: from,
        target: to,
        format: "text",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.translatedText;
  } catch (error) {
    console.error("Çeviri hatası:", error);
    return null;
  }
};
