import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: '127.0.0.1',
    port: '5432'
  },
  production: {
    use_env_variables: 'DATABASE_URL'
  }
};
