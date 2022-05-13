/* eslint-disable no-unused-vars */
const express = require('express');
const wrap = require('../../error/wrap');
const { createGroup, findGroupContains } = require('../../service/group.service');
const { getUser } = require('../../service/user.service');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const createGroupRoute = async (req, res, next) => {
  const { userId } = req.body;

  const user = await getUser(userId);
  if (!user) {
    throw new Error("User doesn't exists");
  }

  const group = await createGroup(user.id);
  res.status(200).send({ group });
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getContainGroupRoute = async (req, res, next) => {
  const { userId } = req.body;

  const groups = await findGroupContains(userId);
  res.status(200).send(groups);
};

module.exports = {
  createGroupRoute: wrap(createGroupRoute),
  getContainGroupRoute: wrap(getContainGroupRoute),
};
