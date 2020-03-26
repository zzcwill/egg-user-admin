module.exports = app => {
	const { router, controller } = app;
	router.get('/', controller.home.index);
	router.redirect('/home', '/news');

	const uppercase = app.middleware.uppercase()
	router.get('/user', uppercase,controller.home.user);
};