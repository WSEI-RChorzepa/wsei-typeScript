import mongoose, { ConnectOptions } from 'mongoose';
import config from '../config';

export default async (url: string = config.mongoConnectionString, options: ConnectOptions = {}) => {
  return mongoose.connect(url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
