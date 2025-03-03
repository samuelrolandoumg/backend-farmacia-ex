require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  host: process.env.DB_HOST, 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
  port: process.env.DB_PORT,
  dialect: "postgres", 
  pool: {
    max: 5, 
    min: 0, 
    acquire: 30000, 
    idle: 10000, 
  },
};
