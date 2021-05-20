export function getTurnUrl() {

  let base = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='

  let appid = 'wxe232456cb62be35a'
  let envUrl = 'http://zzc.cdreamy.cn'

  // if(window.location.origin === 'http://zzc.cdreamy.cn') {
  //   appid = 'wxe2a7c21fe894a92d'
  //   envUrl = 'http://zzc.cdreamy.cn'
  // }

  return base + appid + '&redirect_uri=' + envUrl
}

