<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">订单详情</div>
      </div>
      <el-tabs type="card">
        <el-tab-pane label="基本信息">
          <el-tabs type="border-card" class="m-b-20">
            <el-tab-pane>
              <span slot="label">
                <i class="el-icon-date"></i>客户信息
              </span>
              <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" label-width="140px" disabled>
                <el-row :gutter="5">
                  <el-col :span="8">
                    <el-form-item label="客户名称：" prop="customer_name" >
                      <el-input
                        v-model="searchForm.customer_name"
                        placeholder="客户名称"
                        class="same-form-width"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="销售类型：" prop="sale_type" >
                      <el-select
                        v-model="searchForm.sale_type"
                        placeholder="请选择"
                        class="same-form-width"
                      >
                        <el-option
                          v-for="item in sale_typeOptions"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- <el-tab-pane label="过程信息">过程信息</el-tab-pane> -->
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { orderInfo } from '@/api/wdrw/wdrw'

export default {
  name: 'wdrwWdrwInfo',
  filters: {},
  data() {
    return {
      projectId: '',
      searchForm: {
        customer_name: '',
        sale_type: ''
      },
      rules: {
        // customer_name: [{ required: true, message: '请输入客户信息', trigger: 'blur' }],
      },
      sale_typeOptions: [
        {
          name: '零售',
          value: 1,
        },
        {
          name: '批发',
          value: 2,
        },
        {
          name: '代卖',
          value: 3,
        }
      ]   
    }
  },
  created() {
    this.orderId = this.$route.query.orderId
    this.getLoanInfo()
  },
  methods: {
    async getLoanInfo() {
      //自行改接扣调用
      let params = {
        id: this.orderId,
      }
      let apiData = await orderInfo(params)

      this.searchForm = apiData.data
    }
  },
}
</script>
<style lang="scss" scoped>
</style>