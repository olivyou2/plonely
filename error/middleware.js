/* eslint-disable no-unused-vars */
const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(err.status).send(err.message);
};

module.exports = errorMiddleware;
