import { prisma } from "../config/db.js";

// Not oluşturma
export const createNote = async (req, res) => {
  try {
    const { title, content, category, color } = req.body;
    const userId = req.user.userId;

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        category,
        color,
        userId,
      }
    });

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
    const notes = await prisma.note.findMany({
      where: { userId }
    });
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
    const note = await prisma.note.findFirst({
      where: { 
        id: noteId, 
        userId 
      }
    });
    
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
    const { title, content, category, color } = req.body;

    const updatedNote = await prisma.note.updateMany({
      where: {
        id: noteId,
        userId,
      },
      data: {
        title,
        content,
        category,
        color,
      }
    });

    if (updatedNote.count === 0) {
      return res
        .status(404)
        .json({ message: "Not bulunamadı veya güncellenemedi." });
    }

    const note = await prisma.note.findUnique({
      where: { id: noteId }
    });

    res.status(200).json({ message: "Not güncellendi.", note });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// Not Silme
export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.userId;
    const noteId = req.params.id;
    
    const deletedNote = await prisma.note.deleteMany({
      where: {
        id: noteId,
        userId,
      }
    });

    if (deletedNote.count === 0) {
      return res.status(400).json({ message: "Not bulunamadı veya silinemedi." });
    }
    
    res.status(200).json({ message: "Not silindi" });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
