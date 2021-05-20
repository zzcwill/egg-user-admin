<template>
  <div class="BindOk">
    <div class="stateBox Hpercent100">
      <div class="bg">
        <img src="../../assets/images/bindOk/1.png" />
        <img
          src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDU5ICg4NjEyNykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+UmVjdGFuZ2xlIDIyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IumCgOivt+mTvuaOpSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Iuafpeeci+aJgOacieWIh+WbvuWkh+S7vSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc0LjAwMDAwMCwgLTgxMC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Imxhbmh1LWljb24tU2xpY2luZyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzQuMDAwMDAwLCA4MTAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uEIj4KICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yMiIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMS44MTM4NzIyLDQuMTU2NDM1NiBDMTIuMTI0ODQxOSw0LjQ1NTEwOTU1IDEyLjA0NjE1MTMsNC44NzY0NjU5NiAxMS41Nzc4MDAzLDUuNDIwNTA0ODEgTDkuOTU3LDcuMjkyIEw5Ljk2MjA4NTA3LDcuMjk3ODUxOTUgTDkuMzQzODEwNTYsNy45NzcwNTUzMyBMMTAuNTI3NTY0MSw5LjI5OTU1NDIxIEM5LjYyMTAzNTc3LDEwLjE5NDg3OTcgOC42ODM4MDUxMywxMC45MTEwNjc3IDcuNzE1ODcyMTgsMTEuNDQ4MTE3OSBDNi43NDc5MzkyMiwxMS45ODUxNjgyIDUuNTA5MzE1MTYsMTIuMTMwMjU1NyA0LDExLjg4MzM4MDMgTDguODk1LDYuMzQyIEw4Ljg5MjA1ODUsNi4zMzk0OTgxNCBMMTAuNTU2NjExNyw0LjU0MzQ1Nzk0IEMxMS4wODM4MTU2LDMuOTg2NzY5MSAxMS41MDI5MDI0LDMuODU3NzYxNjUgMTEuODEzODcyMiw0LjE1NjQzNTYgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LjAwMDAwMCwgOC4wMDAwMDApIHJvdGF0ZSgyLjAwMDAwMCkgdHJhbnNsYXRlKC04LjAwMDAwMCwgLTguMDAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="
          alt
        />
      </div>
      <div class="state">
        <img src="../../assets/images/bindOk/success.png" class="ok" />
        <p class="tip">{{tipContent}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BindOk',
  data() {
    return {
      tipContent: '账号绑定成功！'
    }
  },
  created() {
    this.reScroll()
  },
  mounted() {},
  methods: {
    closeH5() {
      if (WeixinJSBridge === undefined) {
        return
      }
      WeixinJSBridge.call('closeWindow')
    },
    reScroll() {
      let currentPosition = document.documentElement.scrollTop || document.body.scrollTop
      currentPosition += 1
      window.scrollTo(0, currentPosition) //页面向下滚动
    }
  },
}

</script>

<style lang="less">
.BindOk {
  height: 100%;
  background: white;
  .stateBox {
    position: relative;
    width: 750px;
    height: 600px;
    .bg img {
      display: block;
      width: 750px;
      height: 600px;
    }
    .state {
      position: absolute;
      top: 130px;
      left: 30px;
      right: 30px;
      .ok {
        margin: 0 auto;
        display: block;
        width: 170px;
        height: 170px;
      }
      .tip {
        margin-top: 30px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 34px;
        color: #333;
      }
      .goout {
        margin: 40px auto;
        margin-top: 70px;
        display: block;
        width: 394px;
        height: 353px;
      }
      .back {
        font-size: 28px;
        text-align: center;
        color: #666666;
        line-height: 40px;
      }
      .back2 {
        margin-top: 100px;
        display: block;
        width: 690px;
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
