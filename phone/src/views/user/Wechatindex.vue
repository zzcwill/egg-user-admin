<template>
  <div class="Wechatindex">
  </div>
</template>

<script>
import { getTurnUrl } from '@/utils/env'
export default {
  name: 'Wechatindex',
  created() {
    window.location.href =
      getTurnUrl() + this.$route.query.from + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
  }
}
</script>

<style lang="less">
</style>
