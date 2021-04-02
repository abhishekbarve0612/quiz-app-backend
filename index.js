import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import routes from './src/routes/quizRoutes';

const app = express();
const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/quiz', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'JWT'
  ) {
    jwt.verify(req.headers.authorization.split(' ')[1], 'ASecretWord', (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

routes(app);

app.route('/').get((req, res) => {
  res.send(`App running on server ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
