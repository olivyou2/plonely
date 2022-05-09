const dotenv = require('dotenv');

dotenv.config({
  path: 'env.env',
});

module.exports = {
  JWTKEY: process.env.JWTKEY,
  DBHOST: process.env.DBHOST,
  APIPORT: process.env.APIPORT,
  SOCKETPORT: process.env.SOCKETPORT,
};
