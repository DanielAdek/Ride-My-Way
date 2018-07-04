import jwt from 'jsonwebtoken';

const baseUrl = '/api/v1';
const token = {
  user: `${jwt.sign({
    userid: 1,
    email: 'maildaniel.me1@gmail.com'
  }, process.env.SECRET, { expiresIn: '24h' })}`
};


export default { baseUrl, token };
