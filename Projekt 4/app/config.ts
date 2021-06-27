import dotenv from 'dotenv';
import path from 'path';

const env = dotenv.config();

if (env.error) {
  throw new Error('.env file was not found. ');
}

export default {
  root: path.dirname(require.main?.filename as string),
  port: parseInt(process.env.PORT as string, 10),
  sessionSecret: process.env.SESSION_SECRET as string,
  mongoConnectionString: process.env.MONGO_CONNECTION_STRING as string,
};
