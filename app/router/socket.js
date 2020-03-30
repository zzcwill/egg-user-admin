module.exports = app => {
	const { router, controller,io } = app;

	io.of('/').route('exchange', io.controller.nsp.exchange);
};