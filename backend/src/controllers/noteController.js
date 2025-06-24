import Note from "../models/note.js";

// Not oluşturma

export const createNote = async (req, res) => {
  try {
    const { title, content, category, color } = req.body;

    const userId = req.user.userId;

    const newNote = new Note({
      title,
      content,
      category,
      color,
      user: userId,
    });

    await newNote.save();
    res
      .status(201)
      .json({ message: "Not başarıyla oluşturuldu.", note: newNote });
    res.status(201).json();
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// Tüm notları listeleme (kullanıcıya ait)

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const notes = await Note.find({ user: userId });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
