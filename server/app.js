import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// use body Parser to parser body to json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.status(200).send('Express Is Welcoming You');
});

export default app;
