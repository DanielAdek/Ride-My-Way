import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import route from './routes/index';
import swaggerDocument from './../swagger.json';

const app = express();

// ENABLE CORS
app.use(cors());

// SERVE STATIC FILES
app.use(express.static(path.join(__dirname, '../client')));

// USE BODY PARSER TO PARSE BODY TO JSON FORMAT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SERVE SWAGGER DOCUMENTATION
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', route);

app.get('/*', (req, res) => {
  res.status(200).send('404 Page Not Found');
});

export default app;
