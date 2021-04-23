'use strict';

const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');
const bytes = require('bytes');


const { Controller } = require('egg');
const { request } = require('https');

class ImgController extends Controller {
	async upload() {	
		const { ctx, service, config } = this;
		const { resOk } = ctx.helper.resData;
		const { cache, imgService } = service;
		const { checkParam, lodash } = ctx.helper;
		const { Forbidden, ParameterException } = ctx.helper.httpCode;
		
		// token校验
		const imgStream = await ctx.getFileStream();

		console.info(imgStream)

		console.info(ctx.request)

		// console.info(ctx.request.body)
		// console.info(imgStream.fields)

		return

		let token = '';
		if(imgStream.fields.token) {
			token = imgStream.fields.token;
		}
		// 无带token
		if (!token) {
			throw new Forbidden('需要传token');
			return
		}
		let tokenCache = await cache.get(token);
		if(!tokenCache) {
			throw new Forbidden('无效的token');
			return
		}
		ctx.request.user = tokenCache;

		console.info(imgStream)

		// if(imgStream.size > config.uploadOption.maxSize) {
		// 	throw new ParameterException('上传图片太大');
		// 	await next();
		// 	return
		// }


    try {
			const filename = (new Date()).getTime() + path.basename(imgStream.filename);
			const target = path.join(config.baseDir, `${config.uploadOption.uploadsUrl}${filename}`);
			const readFileStream = fs.createWriteStream(target);
			imgStream.pipe(readFileStream);

			let newImg = {
				file_type: imgStream.mimetype,
				// file_size: imgStream.size,
				file_path: `${config.hostname}:${config.port}/public/${config.uploadOption.uploadsUrl}${imgStream.filename}`,
				file_name: imgStream.filename
			};
	
			let imgData = await imgService.add(newImg)
	
			if(imgData) {
				ctx.body = resOk(
					imgData,
					10000,
					'图片上传成功'
				)
			}


    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(imgStream);
      ctx.logger.warn(err);

			ctx.body = resOk(
				'',
				20000,
				'图片上传失败'
			)			
    }
	}
}

module.exports = ImgController;
