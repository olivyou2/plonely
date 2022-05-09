const express = require('express');
const errorMiddleware = require('../error/middleware');
const router = require('./route');

const app = express();

app.use(express.json());
app.use(router);

app.use(errorMiddleware);

module.exports = app;
