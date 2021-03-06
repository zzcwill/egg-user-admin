import request from '@/utils/request'

//查询列表页start
export function orderList(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data   
  })
}
export function orderAdd(data) {
  return request({
    url: '/order/add',
    method: 'post',
    data   
  })
}
export function orderUpdate(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data   
  })
}
export function orderDelete(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    data   
  })
}
export function orderInfo(data) {
  return request({
    url: '/order/info',
    method: 'post',
    data   
  })
}


export function customerAllList() {
  return request({
    url: '/customer/all/list',
    method: 'post'
  })
}
export function goodsAllList() {
  return request({
    url: '/goods/all/list',
		method: 'post',	
  })
}
export function exportOrder() {
  return  process.env.VUE_APP_BASE_API + '/export/order'
}
export function exportOrder2() {
  return  process.env.VUE_APP_BASE_API + '/export/order2'
}
//查询列表页end

//贷款详情页start
export function loanApprovalInfoGetApprovalBaseInfo(data) {
  return request({
    url: '/loanApprovalInfo/getApprovalBaseInfo',
		method: 'post',
    data		
  })
}
//贷款详情end

//贷款流程页start
export function opinionSave(data) {
  return request({
    url: '/opinion/save',
		method: 'post',
    data		
  })
}
export function loanReviewPreSubmit(data) {
  return request({
    url: '/loanReview/preSubmit',
		method: 'post',
    data		
  })
}
export function loanReviewSubmit2next(data) {
  return request({
    url: '/loanReview/submit2next',
		method: 'post',
    data		
  })
}
//贷款流程页end

//多媒体资料页start
export function loanApprovalInfoGetApprovalDocumentDir(data) {
  return request({
    url: '/loanApprovalInfo/getApprovalDocumentDir',
		method: 'post',
    data		
  })
}
export function loanApprovalInfoGetApprovalDocument(data) {
  return request({
    url: '/loanApprovalInfo/getApprovalDocument',
		method: 'post',
    data		
  })
}
//上传图片-base64
export function loanDocumentUploadFileString(data) {
  return request({
    url: '/loanDocument/uploadFileString',
		method: 'post',
    data      	
  })
}
//上传图片-文件流
export function uploadNew(data) {
  return request({
    //本地egg-user-admin
    url: '/upload/new',
		method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [function(data) {
      return data  
    }],   
    baseURL: '/egg'		
  })
}
//多媒体资料页end