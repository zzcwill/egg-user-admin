import http from '@/utils/http'
//import Qs from 'qs'

// export function loginApi (data) {
//   return http({
//     url: 'login',
//     method: 'post',
//     data: data,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'     
//     },
//     transformRequest: [function (data) {
//       data = Qs.stringify(data)
//       return data
//     }],
//     baseURL: '/mock/',
//   })
// }

export function wechatOauth2AccessToken (data) {
  return http({
    url: 'wechat/oauth2AccessToken',
    method: 'post',
    params: data,
  })
}

export function wechatWxLogin (data) {
  return http({
    url: 'wechat/wxLogin',
    method: 'post',
    params: data,
  })
}