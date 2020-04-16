const express = require('express');
const cookieParser = require('cookie-parser');
const babelParser = require('./babel-parser');
const render = require('./render');
const http2 = require('./http2');
const proxy = require('./proxy');
const cookies = require('./cookies');
const config = require('./config');

const app = express();

app.use(cookieParser());

app.use(cookies());

proxy(app);

app.use(config.babelDir, babelParser());

Object.keys(config.static).forEach((key) => {
  const dir = config.static[key];
  if (key === '' || key === '*') {
    app.use(express.static(dir));
  } else {
    app.use(key, express.static(dir));
  }
});

app.use(render(app));

const server = http2(app);

server.listen(config.port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const protocol = config.http2 ? 'https' : 'http';

  console.log(`listening on ${protocol}://localhost:${config.port}`);

  if (process.send) {
    process.send({
      event: 'online',
    });
  }
});
