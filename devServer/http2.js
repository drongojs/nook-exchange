const config = require('./config');

module.exports = (app) => {
  if (!config.http2) {
    return app;
  }
  
  const fs = require('fs');
  const spdy = require('spdy');
  const key = fs.readFileSync('server.key', 'utf8');
  const cert = fs.readFileSync('server.cert', 'utf8');
  const options = {
    key,
    cert,
  };
  return spdy.createServer(options, app);
};
