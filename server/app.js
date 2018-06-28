import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import route from './routes/index';
import swaggerDocument from './../swagger.json';

const app = express();

// enable cors
app.use(cors());

// use body Parser to parser body to json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', route);

app.get('*', (req, res) => {
  res.status(200).send('Express Is Welcoming You');
});

export default app;
