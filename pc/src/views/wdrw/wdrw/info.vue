<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">订单详情</div>
      </div>
      <el-tabs type="card">
        <el-tab-pane label="基本信息">
            <el-form
              :inline="true"
              :model="searchForm"
              :rules="rules"
              ref="searchForm"
              label-width="140px"
              disabled
            >
              <el-row :gutter="5">
                <el-col :span="8">
                  <el-form-item label="客户名称：" prop="customer_name">
                    <el-input
                      v-model="searchForm.customer_name"
                      placeholder="请输入客户名称"
                      class="same-form-width"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机：" prop="phone">
                    <el-input
                      v-model="searchForm.phone"
                      placeholder="请输入客户手机号"
                      class="same-form-width"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="16">
                  <el-form-item label="客户地址：" prop="address">
                    <el-input
                      v-model="searchForm.address"
                      placeholder="请输入客户地址"
                      class="big-same-form-width"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="5">
                <el-col :span="8">
                  <el-form-item label="订单实际总额：" prop="order_fee">
                    <el-input
                      v-model="searchForm.order_fee"
                      placeholder="请输入订单实际总额"
                      class="same-form-width"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="快递费：" prop="express_fee">
                    <el-input
                      v-model="searchForm.express_fee"
                      placeholder="请输入快递费"
                      class="same-form-width"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="8">
                  <el-form-item
                    label="订单优惠总额："
                    prop="order_discount_fee"
                  >
                    <el-input
                      v-model="searchForm.order_discount_fee"
                      placeholder="请输入订单优惠总额"
                      class="same-form-width"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="5">
                <el-col :span="8">
                  <el-form-item label="销售类型：" prop="sale_type">
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
                            
              <el-table
                max-height="380"
                v-loading="tableData.tableLoading"
                :data="tableData.tableList"
                border
                fit
                highlight-current-row
                @selection-change="tableSelectionChange"
              >
                <el-table-column label="订单编号" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.order_id }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="品牌" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.goods_brand }}</span>
                  </template>
                </el-table-column>                
                <el-table-column label="商品货号" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.goods_code }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="商品男女款" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.goods_sex | goods_sexFilter }}</span>
                  </template>
                </el-table-column> 
                <el-table-column label="商品颜色" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.goods_color }}</span>
                  </template>
                </el-table-column>                                               
                <el-table-column label="商品数量" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.num }}</span>
                  </template>
                </el-table-column>         
                <el-table-column label="商品实际销售价格" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.actual_price }}</span>
                  </template>
                </el-table-column>  
                <el-table-column label="商品实际总额" align="center">
                  <template slot-scope="{row}">
                    <span>{{ row.actual_fee }}</span>
                  </template>
                </el-table-column>  
                <el-table-column label="商品销售时间" align="center" min-width="130">
                  <template slot-scope="{row}">
                    <span>{{ row.create_time }}</span>
                  </template>
                </el-table-column>                                                               
              </el-table>                                    
            </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { orderInfo } from '@/api/wdrw/wdrw'

export default {
  name: 'wdrwWdrwInfo',
  filters: {
    goods_sexFilter(value) {
      let arr = ['女', '男']
      return arr[value] || '-'
    }
  },
  data() {
    return {
      projectId: '',
      searchForm: {
        customer_name: '',
        sale_type: '',

        customer_id: '',
        phone: '',
        address: '',
        shop_id: '',

        express_fee: '',
        order_fee: '',
        order_discount_fee: '',
        shoesArr: []
      },
      rules: {
        // customer_name: [{ required: true, message: '请输入客户信息', trigger: 'blur' }],
      },
      tableData: {
        tableLoading: false,
        tableList: [],
        tableTotal: 0,
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
        },
      ],
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

      this.searchForm = apiData.data;

      this.tableData = {
        tableLoading: false,
        tableList: this.searchForm.shoesArr,
        tableTotal: this.searchForm.shoesArr.length,
      }
    },
    tableSelectionChange(val) {
      console.info(val)
    }
  },
}
</script>
<style lang="scss" scoped>
</style>