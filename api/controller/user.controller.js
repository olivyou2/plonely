/* eslint-disable no-unused-vars */
const express = require('express');
const wrap = require('../../error/wrap');

const { loginUser, createUser } = require('../../service/user.service');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const loginUserRoute = async (req, res, next) => {
  const { userId, password } = req.body;

  const data = await loginUser(userId, password);
  delete data.user.password;
  res.status(200).json({ data, userId });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const createUserRoute = async (req, res, next) => {
  const { userId, password } = req.body;

  await createUser(userId, password);
  res.status(201).send();
};

module.exports = {
  loginUserRoute: wrap(loginUserRoute),
  createUserRoute: wrap(createUserRoute),
};
