import { Inject, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/userCreate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { getImageB64FromUrl } from '../utils/helpers';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_USERS_SERVICE } from './constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(RMQ_USERS_SERVICE) private readonly client: ClientProxy,
  ) {}

  async createUser(user: UserCreateDto) {
    const createdUser = new this.userModel(user);
    const data = await createdUser.save();
    const dataJson = JSON.parse(JSON.stringify(data));
    await this.sendRmqEvent('user-created', dataJson);

    return plainToClass(UserEntity, dataJson);
  }

  async getUser(userId: string) {
    const data = await this.userModel.findById(userId);
    const dataJson = JSON.parse(JSON.stringify(data));

    return plainToClass(UserEntity, dataJson);
  }

  async getUserAvatar(userId: string) {
    const data = await this.userModel.findById(userId, {
      avatar: true,
      avatar_base64: true,
    });
    if (data.avatar_base64) {
      return data.avatar_base64;
    } else {
      const imageB64 = await getImageB64FromUrl(data.avatar);
      this.saveUserAvatar(userId, imageB64);

      return imageB64;
    }
  }

  async deleteUserAvatar(userId: string) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $unset: { avatar_base64: 1, avatar: 1 } },
    );
  }

  async saveUserAvatar(userId: string, imageB64: string) {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { avatar_base64: imageB64 },
    );
  }

  async sendRmqEvent(eventName, data) {
    await this.client.send(eventName, data);
  }
}
