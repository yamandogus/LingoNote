const API_BASE_URL = 'http://localhost:3000/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  userId: string;
  createdAt: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  category: string;
  color: string;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  category?: string;
  color?: string;
}

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async login(data: LoginRequest) {
    return this.request<{ message: string; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterRequest) {
    return this.request<{ message: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUser() {
    return this.request<{
      id: string;
      username: string;
      email: string;
      createdAt: string;
    }>('/auth/user');
  }

  // Note endpoints
  async getNotes() {
    return this.request<{ notes: Note[] }>('/notes');
  }

  async getNoteById(id: string) {
    return this.request<Note>(`/notes/${id}`);
  }

  async createNote(data: CreateNoteRequest) {
    return this.request<{ message: string; note: Note }>('/notes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNote(id: string, data: UpdateNoteRequest) {
    return this.request<{ message: string; note: Note }>(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNote(id: string) {
    return this.request<{ message: string }>(`/notes/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(); 