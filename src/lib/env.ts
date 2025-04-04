export const env = {
  // 環境変数
  NODE_ENV: process.env.NODE_ENV || "development",

  // Prisma
  DATABASE_URL: process.env.DATABASE_URL || "",

  // 認証
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST || "",
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT || "",
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER || "",
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD || "",
  EMAIL_FROM: process.env.EMAIL_FROM || "",
};