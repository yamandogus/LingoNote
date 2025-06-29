import { apiService, Note, CreateNoteRequest, UpdateNoteRequest } from "./api";

export interface NoteResponse {
  notes: Note[];
}

export interface CreateNoteResponse {
  message: string;
  note: Note;
}

export interface UpdateNoteResponse {
  message: string;
  note: Note;
}

export interface DeleteNoteResponse {
  message: string;
}

class NoteService {
  // Tüm notları getir
  async getNotes(): Promise<NoteResponse> {
    return apiService.getNotes();
  }

  // ID'ye göre not getir
  async getNoteById(id: string): Promise<Note> {
    return apiService.getNoteById(id);
  }

  // Yeni not oluştur
  async createNote(data: CreateNoteRequest): Promise<CreateNoteResponse> {
    return apiService.createNote(data);
  }

  // Notu güncelle
  async updateNote(id: string, data: UpdateNoteRequest): Promise<UpdateNoteResponse> {
    return apiService.updateNote(id, data);
  }

  // Notu sil
  async deleteNote(id: string): Promise<DeleteNoteResponse> {
    return apiService.deleteNote(id);
  }

  // Kategoriye göre notları filtrele
  async getNotesByCategory(category: string): Promise<NoteResponse> {
    const response = await apiService.getNotes();
    const filteredNotes = response.notes.filter(note => note.category === category);
    return { notes: filteredNotes };
  }

  // Başlığa göre not ara
  async searchNotesByTitle(title: string): Promise<NoteResponse> {
    const response = await apiService.getNotes();
    const filteredNotes = response.notes.filter(note => 
      note.title.toLowerCase().includes(title.toLowerCase())
    );
    return { notes: filteredNotes };
  }

  // İçeriğe göre not ara
  async searchNotesByContent(content: string): Promise<NoteResponse> {
    const response = await apiService.getNotes();
    const filteredNotes = response.notes.filter(note => 
      note.content.toLowerCase().includes(content.toLowerCase())
    );
    return { notes: filteredNotes };
  }

  // Tarihe göre notları sırala (en yeni)
  async getNotesSortedByDate(): Promise<NoteResponse> {
    const response = await apiService.getNotes();
    const sortedNotes = response.notes.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return { notes: sortedNotes };
  }

  // Renge göre notları filtrele
  async getNotesByColor(color: string): Promise<NoteResponse> {
    const response = await apiService.getNotes();
    const filteredNotes = response.notes.filter(note => note.color === color);
    return { notes: filteredNotes };
  }
}

export const noteService = new NoteService(); 