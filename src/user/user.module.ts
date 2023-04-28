import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import RMQConfig from '../rmq.config';
import { RMQ_USERS_SERVICE } from './constants';

const UserMongooseModule = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
]);

const RMQClient = ClientsModule.register([
  {
    name: RMQ_USERS_SERVICE,
    transport: Transport.RMQ,
    options: { ...RMQConfig.options },
  },
]);

@Module({
  imports: [RMQClient, UserMongooseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
