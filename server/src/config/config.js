import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: '127.0.0.1',
    port: '5432'
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
