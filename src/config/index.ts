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
  jwt_reset_token: process.env.JWT_RESET_SECRET,
  jwt_access_token_duration: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_reset_token_duration: process.env.JWT_RESET_EXPIRES_IN,
  jwt_refresh_token_duration: process.env.JWT_REFRESH_EXPIRES_IN,
  resetlink: process.env.RESET_LINK,
  email: process.env.SEND_EMAIL,
  send_email_pass: process.env.SEND_EMAIL_PASS
};

