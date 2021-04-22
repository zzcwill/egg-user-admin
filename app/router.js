'use strict';

module.exports = app => {
  require('./router/web')(app);
  require('./router/api')(app);

  // require('./router/upload')(app);
  // require('./router/mysql')(app);
};