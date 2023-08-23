require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/rateLimiter');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;
const app = express();

const handlerError = require('./middlewares/handlererror');

mongoose.connect(DB_URL);
app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errors());

app.use(handlerError);

app.listen(PORT);
