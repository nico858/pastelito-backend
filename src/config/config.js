import dotenv from 'dotenv';
dotenv.config();

export const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,

    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbLink: process.env.DB_LINK,
    
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,

    smtpEmail: process.env.SMTP_EMAIL,
    smtpPass: process.env.SMTP_PASSWORD,

    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  
}