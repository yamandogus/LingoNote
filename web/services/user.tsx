import { apiService } from "./api";

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
}

class UserService {
    async getUser(): Promise<User> {
        return apiService.getUser();
    }

    async updateUser(data: UpdateUserRequest): Promise<{ message: string; user: User }> {
        return apiService.updateUser(data);
    }

    async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
        return apiService.changePassword(currentPassword, newPassword);
    }

    async deleteAccount(): Promise<{ message: string }> {
        return apiService.deleteAccount();
    }
}

export const userService = new UserService();
