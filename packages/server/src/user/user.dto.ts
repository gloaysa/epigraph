import { User } from './user.interface';

export class UserResponse {
  id: string;
  name: string;

  constructor(data: User) {
    this.id = data.id;
    this.name = data.name;
  }
}
