import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: false })
  avatar_base64: string;

  @Prop({ required: false })
  createdAt: string;

  @Prop({ required: false })
  updatedAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
