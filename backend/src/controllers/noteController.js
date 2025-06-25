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

// Tek bir notu getirme

export const getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;
    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      return res.status(404).json({ message: "Not bulunamadı." });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// Not güncelleme
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;
    const { title, content, category } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      {
        _id: noteId,
        user: userId,
      },
      {
        title,
        content,
        category,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Not bulunamadı veya güncellenemedi." });
    }
    res.status(200).json({ message: "Not güncellendi.", note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// Not Silme

export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;
    const deletedNote = await Note.findOneAndDelete({
      _id: noteId,
      user: userId,
    });

    if (!deletedNote) {
      res.status(400).json({ message: "Not bulunamadı veya silinemedi." });
    }
    res.status(200).json({ message: "Not silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
