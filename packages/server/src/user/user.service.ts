import { User } from './user.interface';

class UserServiceClass {
  static instance: UserServiceClass;
  static getInstance(): UserServiceClass {
    if (!UserServiceClass.instance) {
      UserServiceClass.instance = new UserServiceClass();
    }
    return UserServiceClass.instance;
  }

  private users: User[] = [
    {
      id: '1',
      name: 'Guille',
      folder: 'g_data',
    },
  ];

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((u) => u.id === userId);
  }
}

export const UserService = UserServiceClass.getInstance();
