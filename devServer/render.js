const config = require('./config');

module.exports = (app) => {
  console.log(config.views);
  app.set('views', config.views);
  app.set('view engine', 'ejs');

  return (req, res) => {
    res.render('index');
  };
};
