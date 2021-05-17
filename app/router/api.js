'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const apiRouter = app.router.namespace('/api');
	const { router, controller, config, middleware } = app;

	const { userController, imgController, excelController, emailController, menuController, roleController, orderController, customerController, goodsController } = controller.api;

	const page = middleware.page();

	// user-about
	apiRouter.post('/login', userController.login);
	apiRouter.post('/logout', userController.logout);
	apiRouter.post('/userInfo', userController.userInfo);
	apiRouter.post('/createUser', userController.createUser);
	apiRouter.post('/changePassword', userController.changePassword);


	//文件上传
	apiRouter.post('/upload', imgController.upload);


	//excel导出
	apiRouter.get('/excel', excelController.get);
	apiRouter.get('/excel2', excelController.get2);
	apiRouter.get('/export/order', excelController.exportOrder);

	//发送邮件
	apiRouter.post('/email', emailController.send);
	apiRouter.post('/emailMq', emailController.sendMq);

	//菜单
	apiRouter.post('/menu', page, menuController.menu);
	apiRouter.post('/userMenu', page, menuController.userMenu);

	//角色
	apiRouter.post('/role', roleController.role);
	apiRouter.post('/userRole', roleController.userRole);

	//订单
	apiRouter.post('/order/list', orderController.list);
	apiRouter.post('/order/add', orderController.add);
	apiRouter.post('/order/update', orderController.update);
	apiRouter.post('/order/delete', orderController.delete);
	apiRouter.post('/order/info', orderController.info);

	//客户
	apiRouter.post('/customer/all/list', customerController.allList);
	apiRouter.post('/customer/list', customerController.list);
	apiRouter.post('/customer/add', customerController.add);
	apiRouter.post('/customer/update', customerController.update);
	apiRouter.post('/customer/delete', customerController.delete);

	//商品
	apiRouter.post('/goods/all/list', goodsController.allList);

};

