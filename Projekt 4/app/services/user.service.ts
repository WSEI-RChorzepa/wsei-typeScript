import { LeanDocument } from 'mongoose';
import bcrypt from 'bcrypt';
import IUser from '../models/User';
import UserSchema, { UserDocument } from '../db/models/user.schema';
import PasswordSchema, { PasswordDocument } from '../db/models/password.schema';
import mongoose from 'mongoose';

export default class UserService {
  static async getByEmail(email: string): Promise<LeanDocument<UserDocument> | null> {
    return await UserSchema.findOne({ 'contact.email': email }).lean().exec();
  }

  static async verifyPassword(userId: string, password: string): Promise<boolean> {
    const passDocument = (await PasswordSchema.findOne({ userId: userId })
      .lean()
      .exec()) as LeanDocument<PasswordDocument>;

    try {
      return await bcrypt.compare(password, passDocument.password);
    } catch (error) {
      return false;
    }
  }

  static async create(data: IUser, password: string): Promise<{ user: UserDocument; password: PasswordDocument }> {
    try {
      const userDocument = await new UserSchema({
        _id: new mongoose.Types.ObjectId(),
        ...data,
      }).save();

      const passwordDocument = await new PasswordSchema({
        userId: userDocument.id,
        password,
      }).save();

      return {
        user: userDocument,
        password: passwordDocument,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
