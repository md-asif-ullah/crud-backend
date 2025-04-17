import dotenv from "dotenv";

dotenv.config(".env");

const port = process.env.PORT || 5000;
const envirment = process.env.NODE_ENV || "development";
const dbUrl = process.env.DB_URL;
const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_SECRET;
const Expiration = process.env.JWT_EXPIRATION;
const refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION;
const origin = process.env.ORIGIN;

export {
  port,
  envirment,
  dbUrl,
  jwtSecret,
  jwtRefreshTokenSecret,
  Expiration,
  refreshTokenExpiration,
  origin,
};
