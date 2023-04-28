import { Exclude } from 'class-transformer';

export class UserEntity {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;

  createdAt: string;

  @Exclude()
  updatedAt: string;

  @Exclude()
  avatar_base64: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
