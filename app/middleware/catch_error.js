module.exports = () => {
  return async function catchError(ctx, next) {
    try {
      await next()
    } catch (err) {
      const { resFail, resCodeArr } = ctx.helper.resData;
      const { HttpException } = ctx.helper.httpCode

      // 开发环境
      const isHttpException = err instanceof HttpException;
      const isDev = process.env.NODE_ENV === 'development';
  
      if (isDev) {
        if(!isHttpException) {
          if(err.name === 'SequelizeDatabaseError') {
            ctx.status = 500;
            ctx.body = resFail(err.parent.sqlMessage, resCodeArr[1][0]);        
          }
          if(err.name !== 'SequelizeDatabaseError') {
            throw err;          
          }     
        } 
        if (isHttpException) {
          ctx.status = err.status;
          ctx.body = resFail(err.msg, err.code);
        }        
      }  
      
      if (!isDev) {
        if (isHttpException) {
          ctx.status = err.status;
          ctx.body = resFail(err.msg, err.code);
        }  
        if (!isHttpException) {
          ctx.status = 500; 
          ctx.body = resFail('服务器内部异常', resCodeArr[1][0]);
        }         
      }
    }
  };
};
