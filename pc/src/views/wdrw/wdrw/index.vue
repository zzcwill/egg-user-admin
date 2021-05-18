<template>
  <div class="app-container">
    <el-card shadow="never" class="m-b-10">
      <div class="el-page-header m-b-20">
        <div class="el-page-header__content m-lr-auto">订单查询</div>
      </div>
      <el-form :inline="true" :model="searchForm" :rules="rules" ref="searchForm" label-width="140px">
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="客户名称：" prop="customer_name">
              <el-input v-model="searchForm.customer_name" placeholder="请输入客户名称" class="same-form-width"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机：" prop="phone">
              <el-input v-model="searchForm.phone" placeholder="请输入手机号" class="same-form-width"></el-input>
            </el-form-item>
          </el-col>          
          <!-- <el-col :span="8">
            <el-form-item label="流程名称：" prop="ftCode">
              <el-select
                v-model="searchForm.ftCode"
                placeholder="请选择"
                class="same-form-width"
                @change="changeFtCode"
              >
                <el-option
                  v-for="item in ftCodeOptions"
                  :key="item.flowType"
                  :label="item.flowName"
                  :value="item.flowType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="流程节点：" prop="flowNode">
              <el-select
                v-model="searchForm.flowNode"
                placeholder="请选择"
                clearable
                filterable
                class="same-form-width"
              >
                <el-option
                  v-for="item in flowNodeOptions"
                  :key="item.nodeCode"
                  :label="item.nodeName"
                  :value="item.nodeCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row :gutter="5">
          <el-col :span="8">
            <el-form-item label="开始提交时间：" prop="createDateTimeStart">
              <el-date-picker
                v-model="searchForm.createDateTimeStart"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
                class="same-form-width"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束提交时间：" prop="createDateTimeOver">
              <el-date-picker
                v-model="searchForm.createDateTimeOver"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择"
                class="same-form-width"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="5">
          <el-col :span="8" :offset="8">
            <el-form-item>
              <el-button type="primary" @click="searchTable('searchForm')">查询</el-button>
              <el-button @click="resetSearchForm('searchForm')">重置</el-button>
              <el-button type="primary" @click="newData()">新增订单</el-button>
              <el-button type="primary" @click="exportData()">导出</el-button>
              <el-button type="primary" @click="exportData2()">导出2</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-tabs v-model="activeTabName" type="card" @tab-click="tabClick">
      <el-tab-pane label="订单列表" name="todo">
        <el-table
          max-height="380"
          v-loading="tableData.tableLoading"
          :data="tableData.tableList"
          border
          fit
          highlight-current-row
          @selection-change="tableSelectionChange"
        >
          <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
          <el-table-column label="订单流水号" align="center" min-width="130">
            <template slot-scope="{row}">
              <span>{{ row.order_code }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单类型" align="center">
            <template slot-scope="{row}">
              <span>{{ row.sale_type | sale_typeFilter }}</span>
            </template>
          </el-table-column>         
          <el-table-column label="客户名称" align="center">
            <template slot-scope="{row}">
              <span>{{ row.customer_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手机号" align="center">
            <template slot-scope="{row}">
              <span>{{ row.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="地址" align="center" min-width="200">
            <template slot-scope="{row}">
              <span>{{ row.address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="快递费用" align="center">
            <template slot-scope="{row}">
              <span>{{ row.express_fee }}</span>
            </template>
          </el-table-column>  
          <el-table-column label="订单实际总额" align="center">
            <template slot-scope="{row}">
              <span>{{ row.order_fee }}</span>
            </template>
          </el-table-column> 
          <el-table-column label="订单优惠总额" align="center">
            <template slot-scope="{row}">
              <span>{{ row.order_discount_fee }}</span>
            </template>
          </el-table-column> 
          <el-table-column label="订单生成时间" align="center" min-width="130">
            <template slot-scope="{row}">
              <span>{{ row.create_time }}</span>
            </template>
          </el-table-column>  
          <el-table-column label="订单修改时间" align="center" min-width="130">
            <template slot-scope="{row}">
              <span>{{ row.modify_time }}</span>
            </template>
          </el-table-column>                                                      
          <el-table-column label="操作" align="center" min-width="180">
            <template slot-scope="{row}">
              <el-button @click="toOperate(row)" type="text">修改</el-button>
              <el-button @click="toDelete(row)" type="text">删除</el-button>
              <el-button @click="toOperate3(row)" type="text">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="tableData.tableTotal>0"
          :total="tableData.tableTotal"
          :page.sync="searchForm.page"
          :limit.sync="searchForm.pageSize"
          @pagination="getTableList"
        ></pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  orderList,
  orderDelete,

  exportOrder,
  exportOrder2
} from '@/api/wdrw/wdrw'
import Pagination from '@/components/Pagination'
import { getToken } from '@/utils/config'

import {
  formateObjToParamStr
} from '@/utils/config'

export default {
  name: 'wdrwWdrw',
  filters: {
    isSecondHandCarFilter(value) {
      let arr = ['', '是', '否']
      return arr[value] || '-'
    },
    sale_typeFilter(value) {
      let arr = ['', '零售', '批发', '代卖']
      return arr[value] || '-'
    }
  },
  components: {
    Pagination,
  },
  data() {
    return {
      searchForm: {
        page: 1,
        pageSize: 10,
        customer_name: '',
        phone: '',
        createDateTimeStart: '',
        createDateTimeOver: ''
      },
      rules: {
        // cname: [{ required: true, message: '请输入客户信息', trigger: 'blur' }],
        // ftCode: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ]
      },
      tableData: {
        tableLoading: true,
        tableList: [],
        tableTotal: 0,
      },
      // ftCodeOptions: [],
      // flowNodeOptions: [],
      activeTabName: 'todo',
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
    // this.getFtCodeOptions()
    // this.changeFtCode(this.searchForm.ftCode)
    this.getTableList()
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields()
    },
    searchTable(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getTableList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    tableSelectionChange(val) {
      console.info(val)
    },
    // 如果有跳转路由，关闭
    cancelSearchForm(toPath, fn) {
      let tags = this.visitedViews
      let selectedTag = {}
      for (let tag of tags) {
        if (tag.path === toPath) {
          selectedTag = tag
        }
      }
      this.closeSelectedTag(selectedTag, fn)
    },  
    closeSelectedTag(view, fn) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          fn()
        })
    },      
    toOperate(row) {
      let that = this;
      this.cancelSearchForm('/wdrw/wdrw/page/flow', function () {
        //传参query 最好不要用Boolean
        that.$router.push({
          path: '/wdrw/wdrw/page/flow',
          query: {
            orderId: row.id,
            type: 'change'
          }
        })        
      })
      //传参query 最好不要用Boolean
      // this.$router.push({
      //   path: '/wdrw/wdrw/page/flow',
      //   query: {
      //     orderId: row.id,
      //     type: 'change'
      //   }
      // })
    },
    toDelete(row) {
        let that = this;
        this.$confirm('是否删除该订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let apiData = {
            id: row.id
          }
          console.info(apiData)
          let toApi = await orderDelete(apiData)

          if(toApi.data.isOK === 1) {
            that.$message({
              type: 'success',
              message: '订单删除成功'
            }); 
            that.getTableList();                      
          }
        })
    },
    toOperate3(row) {
      let that = this;
      this.cancelSearchForm('/wdrw/wdrw/page/info', function () {
        that.$router.push({
          path: '/wdrw/wdrw/page/info',
          query: {
            orderId: row.id
          }
        })       
      })

      // this.$router.push({
      //   path: '/wdrw/wdrw/page/info',
      //   query: {
      //     orderId: row.id,
      //     type: 'info'
      //   }
      // })
    },    
    async getTableList() {
      this.tableData.tableLoading = true

      //自行改接扣调用
      let apiData = await orderList(this.searchForm)

      console.info(apiData.data.list)

      this.tableData.tableList = apiData.data.list
      this.tableData.tableTotal = apiData.data.count
      this.tableData.tableLoading = false
    },
    // async getFtCodeOptions() {
    //   let apiData = await flowGet()
    //   this.ftCodeOptions = apiData.data
    // },
    // async changeFtCode(val) {
    //   this.searchForm.flowNode = ''

    //   let data = {
    //     businessTypeCode: val,
    //   }
    //   let apiData = await flowNodes(data)
    //   this.flowNodeOptions = apiData.data
    // },
    tabClick(tab) {
      if (tab.name === 'todo') {
      }
      if (tab.name === 'done') {
      }
      this.getTableList()
    },
    newData() {
      let that = this;
      this.cancelSearchForm('/wdrw/wdrw/page/flow', function () {
        that.$router.push({
          path: '/wdrw/wdrw/page/flow',
          query: {
            orderId: '',
            type: 'new'
          }
        })       
      })

      // this.$router.push({
      //   path: '/wdrw/wdrw/page/flow',
      //   query: {
      //     orderId: '',
      //     type: 'new'
      //   }
      // })
    },
    exportData() {
      let data = formateObjToParamStr(this.searchForm)
      console.info(data)
      let exportUrl = exportOrder() + '?token=' + getToken() + '&' + data
      window.location.href = exportUrl
    },
    exportData2() {
      let data = formateObjToParamStr(this.searchForm)
      console.info(data)
      let exportUrl = exportOrder2() + '?token=' + getToken() + '&' + data
      window.location.href = exportUrl
    }    
  }
}
</script>
<style lang="scss" scoped>
</style>