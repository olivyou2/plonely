const express = require('express');
const cors = require('cors');
const errorMiddleware = require('../error/middleware');
const router = require('./route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

module.exports = app;
