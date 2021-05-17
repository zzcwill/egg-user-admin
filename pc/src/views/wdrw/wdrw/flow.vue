<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">订单处理</div>
      </div>
      <el-tabs type="card">
        <el-tab-pane label="基本信息">
          <el-form
            :inline="true"
            :model="searchForm"
            :rules="rules"
            ref="searchForm"
            label-width="140px"
          >
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="客户id：" prop="customer_id">
                  <el-select
                    v-model="searchForm.customer_id"
                    placeholder="请选择客户id"
                    class="same-form-width"
                    @change="changeCustomer_id"
                  >
                    <el-option
                      v-for="item in customer_idOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="客户名称：" prop="customer_name">
                  <el-input
                    v-model="searchForm.customer_name"
                    placeholder="请输入客户名称"
                    class="same-form-width"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机：" prop="phone">
                  <el-input
                    v-model="searchForm.phone"
                    placeholder="请输入客户手机号"
                    class="same-form-width"
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
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <el-form-item label="订单优惠总额：" prop="order_discount_fee">
                  <el-input
                    v-model="searchForm.order_discount_fee"
                    placeholder="请输入订单优惠总额"
                    class="same-form-width"
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

            <el-row :gutter="5">
              <el-col :span="3" :offset="21">
                <el-form-item>
                  <el-button type="primary" @click="toAddRole"
                    >新增销售商品</el-button
                  >
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
                <template slot-scope="{ row }">
                  <span>{{ row.order_id }}</span>
                </template>
              </el-table-column>
              <el-table-column label="品牌" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.goods_brand }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品货号" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.goods_code }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品男女款" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.goods_sex | goods_sexFilter }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品颜色" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.goods_color }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品数量" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.num }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品实际销售价格" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.actual_price }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品实际总额" align="center">
                <template slot-scope="{ row }">
                  <span>{{ row.actual_fee }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="商品销售时间"
                align="center"
                min-width="130"
              >
                <template slot-scope="{ row }">
                  <span>{{ row.create_time }}</span>
                </template>
              </el-table-column>
            </el-table>

            <br />
            <el-row :gutter="5">
              <el-col :span="6" :offset="9">
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitSearchTable('searchForm')"
                    >提交</el-button
                  >
                  <el-button @click="cancelSearchForm()">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      title="销售商品"
      width="600px"
      append-to-body
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="dialogForm"
        :rules="dialogRules"
        ref="dialogForm"
        label-width="100px"
      >
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="商品id：" prop="goods_id">
              <el-select
                v-model="dialogForm.goods_id"
                placeholder="请选择商品id"
                class="same-form-width"
                @change="changeGoods_id"
              >
                <el-option
                  v-for="item in goods_idOptions"
                  :key="item.id"
                  :label="getGoodsLabelName(item)"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="销售数量：" prop="num">
              <el-input
                v-model="dialogForm.num"
                placeholder="请输入销售数量"
                class="same-form-width"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="商品实际价格：" prop="actual_price">
              <el-input
                v-model="dialogForm.actual_price"
                placeholder="请输入商品实际价格"
                class="same-form-width"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogForm">取消</el-button>
        <el-button type="primary" @click="saveNewRole" v-show="isNewPerson"
          >新增</el-button
        >
        <el-button type="primary" @click="saveUpdateRole" v-show="!isNewPerson"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  orderInfo,
  customerAllList,
  goodsAllList,
  orderAdd,
  orderUpdate,
} from '@/api/wdrw/wdrw'

export default {
  name: 'wdrwWdrwPageFlow',
  filters: {
    goods_sexFilter(value) {
      let arr = ['女', '男']
      return arr[value] || '-'
    },
  },
  data() {
    return {
      type: '',
      searchForm: {
        id: '',
        customer_name: '',
        sale_type: 1,

        customer_id: '',
        phone: '',
        address: '',
        shop_id: '1',

        express_fee: '0',
        order_fee: '',
        order_discount_fee: '0',
        shoesArr: '',
      },
      shoesArr: [],
      rules: {
        order_fee: [
          { required: true, message: '订单实际总额不能为空', trigger: 'blur' },
        ],
      },
      customer_idOptions: [],
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

      // 商品弹窗-商品列表
      goods_idOptions: [],
      dialogForm: {
        goods_id: '',
        num: '',
        actual_price: ''
      },
      dialogRules: {
        goods_id: [{ required: true, message: '商品id不能为空', trigger: 'blur' }],
      },
      dialogFormVisible: false,
      isNewPerson: true,
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },  
  created() {
    this.searchForm = {
      ...this.searchForm,
      id: this.$route.query.orderId,
    }
    this.type = this.$route.query.type

    this.getCustomer_idOptions()
    if (this.searchForm.id) {
      this.getLoanInfo()
    }
  },
  methods: {
    async getCustomer_idOptions() {
      let apiData = await customerAllList()
      this.customer_idOptions = apiData.data.list
      console.info(this.customer_idOptions)
    },
    async changeCustomer_id(val) {
      // customer_idOptions
      let item = {}
      for (var key = 0; key < this.customer_idOptions.length; key++) {
        if (val === this.customer_idOptions[key].id) {
          item = this.customer_idOptions[key]
        }
      }

      console.info(item)
      this.searchForm = {
        ...this.searchForm,
        customer_name: item.name,
        phone: item.phone,
        address: item.address,
      }
    },
    async getLoanInfo() {
      //自行改接扣调用
      let params = {
        id: this.searchForm.id,
      }
      let apiData = await orderInfo(params)

      this.searchForm = {
        ...this.searchForm,
        ...apiData.data,
        shoesArr: JSON.stringify(apiData.data.shoesArr)
      }
      this.shoesArr = apiData.data.shoesArr

      this.tableData = {
        tableLoading: false,
        tableList: this.shoesArr,
        tableTotal: this.shoesArr.length,
      }
    },
    tableSelectionChange(val) {
      console.info(val)
    },
    async submitSearchTable() {
      let that = this

      if (this.searchForm.order_fee === '') {
        this.$message('订单实际总额不能为空')
        return
      }

      this.$confirm('是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(async () => {
          let submitData
          if (that.type === 'new') {
            submitData = await orderAdd(this.searchForm)
          }
          if (that.type === 'change') {
            submitData = await orderUpdate(this.searchForm)
          }
          if (submitData.data.isOK === 1) {
            that.cancelSearchForm()
            this.$message('订单处理成功')
            that.cancelSearchForm()
          }
          if (submitData.data.isOK === 0) {
            that.cancelSearchForm()
            this.$message('订单处理失败')
          }
        })
        .catch(() => {})
    },
    //关闭当前页start
    cancelSearchForm() {
      let tags = this.visitedViews
      let selectedTag = {}
      for (let tag of tags) {
        if (tag.path === this.$route.path) {
          selectedTag = tag
        }
      }
      this.closeSelectedTag(selectedTag)
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        if (view.name === 'dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    //关闭当前页end

    //商品弹窗
    getGoodsLabelName(item) {
      let name = '';
      let sex = item.goods_sex ? '男' : '女';
      return `${item.goods_code}-${item.goods_color}-${sex}`
    },
    async getGoods_idOptions() {
      let apiData = await goodsAllList()
      this.goods_idOptions = apiData.data.list
      console.info(this.goods_idOptions)
    },
    async changeGoods_id(val) {
      // customer_idOptions
      let item = {}
      for (var key = 0; key < this.goods_idOptions.length; key++) {
        if (val === this.goods_idOptions[key].id) {
          item = this.goods_idOptions[key]
        }
      }

      // console.info(item)
      let todata = this.dialogForm

      this.dialogForm = {
        ...this._.pick(item, ['goods_brand', 'goods_code', 'goods_sex', 'goods_color']),
        ...todata
      }
    },
    toOperate(row) {
      this.isNewPerson = false
      this.dialogForm = row
      this.openDialogForm()
    },
    toAddRole() {
      this.isNewPerson = true
      this.openDialogForm()
    },
    toSum(arr) {
      var sum = 0;
      for (let i = 0; i < arr.length ; i++) {
          sum += arr[i].actual_fee*1;
      }
      return sum;
    },
    saveNewRole() {
      let that = this;
      this.$refs['dialogForm'].validate(async (valid) => {
        if (valid) {
          let arr = this.shoesArr
          this.dialogForm = {
            ...this.dialogForm,
            actual_fee: ((this.dialogForm.actual_price*1)*(this.dialogForm.num*1))  
          }
          arr.push(this.dialogForm)
          this.shoesArr = arr

          console.info(this.shoesArr)

          this.tableData = {
            tableLoading: false,
            tableList: this.shoesArr,
            tableTotal: this.shoesArr.length,
          } 

          
          
          this.searchForm = {
            ...this.searchForm,
            order_fee: that.toSum(this.shoesArr),
            shoesArr: JSON.stringify(that.shoesArr)
          }

          this.closeDialogForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    saveUpdateRole() {
      this.$refs['dialogForm'].validate(async (valid) => {
        if (valid) {
          // let arr = this.shoesArr
          // arr.push(this.dialogForm)
          // this.shoesArr = arr

          this.closeDialogForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialogForm() {
      this.dialogFormVisible = false
      this.dialogForm = {
        goods_id: '',
        num: '',
        actual_price: ''
      }
    },
    openDialogForm() {
      this.dialogFormVisible = true
      this.getGoods_idOptions()
    },
  },
}
</script>
<style lang="scss" scoped>
</style>