/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { Router } = require('express');
const fs = require('fs');

const router = Router();

fs.readdirSync('./api/route').forEach((val) => {
  if (val !== 'index.js') {
    const downRouterName = val.split('.route.js')[0];
    const downRouter = require(`./${val}`);

    router.use(`/${downRouterName}`, downRouter);
  }
});

module.exports = router;
