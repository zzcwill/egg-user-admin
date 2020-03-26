'use strict';
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');


class UploadService extends Service {
  async new(stream) {
    const { ctx } = this;
    
		let filename = (new Date()).getTime() + path.basename(stream.filename);
    let target  = path.join(this.config.baseDir, `app/public/upload_img/${filename}`);
    const result = await new Promise((resolve, reject) => {
        const remoteFileStream = fs.createWriteStream(target);
				stream.pipe(remoteFileStream);
				
        let errFlag;
        remoteFileStream.on('error', err => {
            errFlag = true;
            sendToWormhole(stream);
            remoteFileStream.destroy();
            reject(err);
        });
        
        remoteFileStream.on('finish', async () => {
            if (errFlag) return;
            resolve({ 
							name: filename, 
							url: `${ctx.request.header.origin}/public/upload_img/${filename}`
						});
        });
      });
    return result;  
  }
}

module.exports = UploadService;