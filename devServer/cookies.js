const config = require('./config');

const BRAND_MAP = {
  reg: '9e02eda8-39aa-4e3f-bcd8-3fd018917294',
  he: 'b9c8f0f0-60dd-4cab-9da8-512b352d9c1a',
  hi: '21b197f8-ee90-4e29-aa3d-0533717490d2',
  df: '314053f5-0092-496c-b899-e9923f4b4f05',
  tso: '43950e44-16d4-42bc-a45b-baac5964cc47',
  velia: '15d5a34a-2847-4b57-b2af-cad3b298e646',
};
const MARKET_MAP = {
  reg: 'GB',
  he: 'DE',
  hi: 'DE',
  df: 'DE',
  tso: 'DE',
  velia: 'GB',
};

module.exports = () => (req, res, next) => {
  const domain = req.headers.host;
  const parts = domain.split('.');

  let brandId = BRAND_MAP.reg;
  let market = MARKET_MAP.reg;

  if (parts.length >= 3) {
    const brand = parts[0];

    brandId = BRAND_MAP[brand] || brandId;
    market = MARKET_MAP[brand] || market;
  }

  if (!config.cookies.brand_id) {
    res.cookie('brand_id', brandId, {
      maxAge: 900000,
    });
  }
  if (!config.cookies.market) {
    res.cookie('market', market, {
      maxAge: 900000,
    });
  }

  Object.keys(config.cookies).forEach((key) => {
    const value = config.cookies[key];
    if (value) {
      res.cookie(key, value, { maxAge: 90000 });
    }
  });

  next();
};
