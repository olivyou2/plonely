const app = require('./api/index');

// require 함으로써 socket 서버 실행
require('./socket/index');

const { APIPORT } = require('./service/env.service');

app.listen(APIPORT, () => {
  console.log(`Web server listen on ${APIPORT}`);
});
