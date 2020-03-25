'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  
  const middle = app.middleware.middle();
  router.get('/news',middle,controller.news.list);
};
