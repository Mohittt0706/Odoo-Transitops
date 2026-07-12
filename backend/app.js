const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware');
const { CLIENT_URL } = require('./config/env');

const app = express();

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
