import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5001,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_Token: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_Token: process.env.JWT_REFRESH_SECRET,
  jwt_access_token_duration: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_token_duration: process.env.JWT_REFRESH_EXPIRES_IN,
};

