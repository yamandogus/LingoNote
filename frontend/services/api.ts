const API_BASE_URL = __DEV__
  ? 'http://192.168.1.4:3001/api'
  : 'http://192.168.1.4:3001/api';

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
  isFavorite: boolean;
  createdAt: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  category: string;
  color: string;
  image?: string | null;
  isFavorite?: boolean;
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  category?: string;
  color?: string;
  image?: string | null;
  isFavorite?: boolean;
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
    
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
    console.log('API Base URL:', API_BASE_URL);
    console.log('Development mode:', __DEV__);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      console.log('Fetching from:', url);
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('HTTP Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error: any) {
      console.error('Network error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      }
      
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Sunucuya bağlanılamıyor. Backend çalışıyor mu kontrol edin.');
      }
      
      throw error;
    }
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

  async updateUser(data: { username?: string; email?: string; password?: string; avatar?: string }) {
    return this.request<{ message: string; user: any }>('/auth/user', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{ message: string }>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async deleteAccount() {
    return this.request<{ message: string }>('/auth/delete', {
      method: 'DELETE',
    });
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

  async toggleFavorite(id: string) {
    return this.request<{ message: string; note: Note }>(`/notes/${id}/favorite`, {
      method: 'PATCH',
    });
  }
}

export const apiService = new ApiService(); 