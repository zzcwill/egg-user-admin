<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前登录用户: {{ userInfo.username }}</div>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {  
  name: 'dashboard',
  filters: {
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },    
  data() {
    return {
    }
  },  
  created() {
  },
  methods: {
  }  
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 20px;
    line-height: 46px;
  }
}
</style>
