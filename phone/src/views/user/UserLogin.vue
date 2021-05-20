<template>
  <div class="UserLogin">
    <div class="loginBox">
      <div class="logo">
        <img src="../../assets/images/userLogin/logo.png">
      </div>
      <div class="bg">
        <img src="../../assets/images/userLogin/1.png">
      </div>
      <div class="login">
        <div class="loginTop">
          <div class="loginInput">
            <div class="loginInputLeft">
              <img src="../../assets/images/userLogin/2.png" class="usernameIcon">
            </div>
            <div class="loginInputLeft2">
              <input
                maxlength="11"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                type="tel"
                placeholder="请输入用户名"
                class="input"
                v-model="user.username"
                @blur="judgePone"
              >
            </div>
          </div>
          <div class="loginInput">
            <div class="loginInputLeft">
              <img src="../../assets/images/userLogin/3.png" class="idCardIcon">
            </div>
            <div class="loginInputLeft2">
              <input
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                type="text"
                placeholder="请输入密码"
                class="input"
                v-model="user.password"
                @blur="judgeIdCard"
              >
            </div>
          </div>
        </div>
        <div class="loginBottom">
          <button class="bind" @click="toBindUser">立即绑定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { wechatOauth2AccessToken, wechatWxLogin } from '@/api/user'
import { isEmpty, isPhone, isIdCard, isSixNumberCode, isWechat } from '@/utils/validate.js'

export default {
  name: 'UserLogin',
  data() {
    return {
			code: this.$route.query.code,
      user: {
        username: '',
        password: '',
        openidCacheKey: ''
      },
      codeInfo: {
        isCan: true,
        num: 60,
        tip: '发送验证码'
      }
    }
  },
  created() {
    this.judgeIsWechatLogin()
  },
  mounted() {
	},
  destoryed() {
  },
  methods: {
    judgeIsWechatLogin() {
      if(!isWechat()) {
        this.$za.tip.open({
          text: '请在微信打开页面'
        })
        return
      }
      if(!this.code) {
        this.$router.push({
          path: '/wechatindex',
          query:{
            from:"/userLogin"
          }
        })
        return
      }

      let token = sessionStorage.getItem('token')
      if (token) {
        this.$router.push({
          path: '/bindOk',
        })
        return
      }
      this.judgeUserIsBind()

    },
    async judgeUserIsBind() {
      let data = {
        code: this.code,
      }
      console.info(data)
      let res = await wechatOauth2AccessToken(data)

      if (!res.data.token){
        sessionStorage.setItem('openidCacheKey', res.data.openidCacheKey)
        this.user = {
          ...this.user,
          openidCacheKey: res.data.openidCacheKey
        } 
        return
      }      

      if (res.data.token){
        sessionStorage.setItem('token', res.data.token)
        this.$router.push({
          path: '/bindOk',
          query:{
          }          
        })
      }
    },
    judgePone() {
      if(!isEmpty(this.user.username)) {
        this.$za.tip.open({
          text: '用户名不能为空'
        })
        return false
      }
      // if(!isPhone(this.user.username)) {
      //   this.$za.tip.open({
      //     text: '请输入正确的手机号'
      //   })
      //   return false
      // }
      return true
    },
    judgeIdCard() {
      if(!isEmpty(this.user.password)) {
        this.$za.tip.open({
          text: '密码不能为空'
        })
        return false
      }
      return true
    },
    async toBindUser() {
      if(!this.code) {
        return
      }

      let data = this.user
      let res = await wechatWxLogin(data)
      sessionStorage.setItem('token', res.data.token)

      this.$router.push({
        path: '/bindOk',
        query:{
        }
      })

    }
	},
}
</script>

<style lang="less">
.loginBox {
  position: relative;
  height: 705px;

  .logo {
    position: absolute;
    top: 78px;
    left: 50%;
    margin-left: -102px;
    width: 177px;
    height: 204px;
    img {
      display: block;
      width: 177px;
      height: 204px;
    }
  }

  .bg img {
    display: block;
    width: 750px;
    height: 705px;
    z-index:-1;
  }

  .login {
    position: absolute;
    height: 700px;
    width: 690px;
    top: 360px;
    left: 50%;
    margin-left: -345px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: #ddd 0px 0px 10px;

    .loginTop {
      margin: 0 auto;
      margin-top: 34px;
      width: 600px;
      .loginInput {
        width: 600px;
        height: 110px;
        border-bottom: 1px solid #e5e5e5;
        .loginInputLeft {
          float: left;
          height: 100%;
        }
        .loginInputLeft2 {
          float: left;
          height: 100%;
          width: 350px;
          margin-left: 36px;
        }
        .loginInputLeft4 {
          float: left;
          height: 100%;
          width: 300px;
          margin-left: 36px;
        }
        .dot {
          float: left;
          height: 60px;
          width: 1px;
          margin-top: 25px;
          background-color: #ed1c24;
        }
        .loginInputLeft3 {
          float: left;
          height: 100%;
          width: 160px;
          margin-left: 36px;

          .sendCode {
            margin-top: 40px;
            color: #ed1c24;
            font-size: 26px;
            height: 30px;
            line-height: 30px;
          }
        }

        .input {
          margin-top: 35px;
          display: block;
          width: 100%;
          font-size: 30px;
          height: 40px;
          line-height: 40px;
          color: #000;
        }

        .usernameIcon {
          display: block;
          width: 32px;
          height: 39px;
          margin-top: 35px;
        }
        .idCardIcon {
          display: block;
          width: 36px;
          height: 32px;
          margin-top: 39px;
        }
        .codeIcon {
          display: block;
          width: 34px;
          height: 38px;
          margin-top: 36px;
        }
      }
    }

    .loginBottom {
      margin-top: 130px;
      .bind {
        margin: 0 auto;
        display: block;
        width: 600px;
        height: 88px;
        border-radius: 440px;
        background-color: #ed1c24;
        color: #fff;
        font-size: 30px;
        line-height: 88px;
        text-align: center;
      }
    }
  }
}
</style>
