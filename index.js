const app = require('./api/index');

const { APIPORT } = require('./service/env.service');

app.listen(APIPORT, () => {
  console.log('server open');
});
