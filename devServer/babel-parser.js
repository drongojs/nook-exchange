const fs = require('fs');
const babel = require('@babel/core');
const config = require('./config');

const removeExtension = (str) => {
  const parts = str.split('.');
  if (parts.length === 1) {
    return str;
  }

  const ext = `.${parts[parts.length - 1]}`;
  if (!config.extensions.includes(ext)) {
    return str;
  }

  parts.pop();

  return parts.join('.');
};

const fileMap = {};
const codeMap = {};

module.exports = () => (req, res) => {
  const x = removeExtension(req.path);

  if (!fileMap[x]) {
    let target = '404';

    config.extensions.find((ext) => {
      const test = `src${x}${ext}`;
      try {
        fs.lstatSync(test);
        target = test;
        return true;
      } catch (e) {
        return false;
      }
    });

    fileMap[x] = target;
  }

  const target = fileMap[x];

  if (target === '404') {
    console.error(`Failed to load ${x} (${target})`);
    return res.status(404).send('file not found');
  }

  if (codeMap[target]) {
    res.set('Content-Type', 'text/javascript');
    return res.send(codeMap[target]);
  }

  fs.readFile(target, 'utf8', (err, raw) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }

    babel.transform(raw, {
      filename: target,
      sourceMaps: 'inline',
    }, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err.message);
      }

      codeMap[target] = result.code;
      res.set('Content-Type', 'text/javascript');
      res.send(result.code);
    });
  });
};
