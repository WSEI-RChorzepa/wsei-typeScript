import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import IPassword from '../../models/Password';

export interface PasswordDocument extends IPassword, Document {}

const PasswordSchema = new Schema<PasswordDocument>({
  userId: { type: Schema.Types.ObjectId, required: true, unique: true },
  password: { type: String, required: true },
});

PasswordSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (error, hash) => {
    if (error) {
      return next(error);
    }

    this.password = hash;
    next();
  });
});

export default mongoose.model<PasswordDocument>('password', PasswordSchema);
