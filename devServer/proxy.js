const config = require('./config');

module.exports = (app) => {
  if (!config.proxies.length) {
    return;
  }
  
  const { createProxyMiddleware: proxy } = require('http-proxy-middleware');
  config.proxies.forEach((opts) => {
    const proxyConfig = {
      context: opts.path,
      target: opts.target,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        [`^${opts.path}`]: opts.rewrite == null ? '' : opts.rewrite,
      },
    };

    app.use(proxy(opts.path, proxyConfig));
  });
};
