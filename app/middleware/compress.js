const compress = require('koa-compress');

module.exports = (options, app) => {
  return compress(options.threshold);
}