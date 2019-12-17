<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">
      <el-form-item v-has="'/member/user/address/add'">
        <el-button
          icon="el-icon-plus"
          :disabled="loading"
          @click="handleCreate">新增地址</el-button>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-table
      v-loading="loading"
      :data="currentTableData"
      :highlight-current-row="true">
      <el-table-column
        label="收货人"
        prop="consignee"
        width="100">
      </el-table-column>

      <el-table-column
        label="所在地区"
        prop="region"
        min-width="150"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="详细地址"
        prop="address"
        min-width="200"
        :show-overflow-tooltip="true">
      </el-table-column>

      <el-table-column
        label="邮编"
        prop="zipcode">
      </el-table-column>

      <el-table-column
        label="手机"
        prop="mobile"
        width="120">
      </el-table-column>

      <el-table-column
        label="电话"
        prop="tel"
        width="120">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="150">
        <template slot-scope="scope">
          <el-button
            v-has="'/member/user/address/set'"
            @click="handleUpdate(scope.$index)"
            size="small"
            type="text">编辑</el-button>

          <el-button
            v-has="'/member/user/address/del'"
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>

          <el-button
            v-has="'/member/user/address/default'"
            @click="handleDefault(scope.row.user_address_id)"
            :disabled="scope.row.user_address_id === addressId"
            size="small"
            type="text">
            {{scope.row.user_address_id === addressId ? '默认地址' : '设为默认'}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @open="openDialog"
      width="600px">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="80px">
        <el-form-item
          label="姓名"
          prop="consignee">
          <el-input
            v-model="form.consignee"
            placeholder="请输入姓名"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="所在地区"
          prop="regions">
          <el-cascader
            v-model="form.regions"
            placeholder="请选择所在地区"
            :options="treeData"
            :props="treeProps"
            style="width: 100%;"
            clearable/>
        </el-form-item>

        <el-form-item
          label="详细地址"
          prop="address">
          <el-input
            v-model="form.address"
            placeholder="请输入详细地址"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="邮编"
          prop="zipcode">
          <el-input
            v-model="form.zipcode"
            placeholder="可输入邮编"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="手机"
          prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          label="电话"
          prop="tel">
          <el-input
            v-model="form.tel"
            placeholder="可输入电话"
            :clearable="true"/>
        </el-form-item>

        <el-form-item
          v-if="form.user_address_id !== addressId"
          prop="is_default">
          <el-checkbox
            v-model="form.is_default"
            :true-label="1"
            :false-label="0">
            是否设为默认收货地址
          </el-checkbox>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="dialogStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="create"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="update"
          size="small">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addUserAddressItem,
  delUserAddressList,
  isUserAddressMaximum,
  setUserAddressDefault,
  setUserAddressItem
} from '@/api/user/address'
import util from '@/utils/util'
import { getRegionSonList } from '@/api/logistics/region'

export default {
  props: {
    loading: {
      default: false
    },
    addressId: {
      default: 0
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      dialogLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑地址',
        create: '新增地址'
      },
      form: {
        client_id: undefined,
        consignee: undefined,
        regions: undefined,
        address: undefined,
        zipcode: undefined,
        tel: undefined,
        mobile: undefined,
        is_default: undefined
      },
      rules: {
        consignee: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '姓名不能大于 30 个字符',
            trigger: 'blur'
          }
        ],
        regions: [
          {
            required: true,
            message: '所在地区不能为空',
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: '详细地址不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '详细地址不能大于 255 个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '手机不能为空',
            trigger: 'blur'
          },
          {
            min: 7,
            max: 15,
            message: '长度在 7 到 15 个字符',
            trigger: 'blur'
          }
        ],
        zipcode: [
          {
            max: 20,
            message: '邮编不能大于 20 个字符',
            trigger: 'blur'
          }
        ],
        tel: [
          {
            max: 20,
            message: '电话不能大于 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      treeData: [],
      treeProps: {
        value: 'region_id',
        label: 'region_name',
        children: 'children'
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      }
    }
  },
  methods: {
    // 请求删除
    handleDelete(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delUserAddressList(
            this.$route.params.client_id,
            [this.currentTableData[index].user_address_id]
          )
            .then(() => {
              this.currentTableData.splice(index, 1)
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 请求设为默认地址
    handleDefault(val) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          setUserAddressDefault(val)
            .then(() => {
              this.$emit('update:addressId', val)
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 初始化对话框
    openDialog() {
      if (!this.treeData.length) {
        getRegionSonList({ region_id: 1 })
          .then(res => {
            const setParent = { key: 'parent_id', value: [1] }
            this.treeData = util.formatDataToTree(res.data, 'region_id', 'parent_id', setParent)
          })
      }
    },
    // 弹出创建对话框
    handleCreate() {
      isUserAddressMaximum(this.$route.params.client_id)
        .then(() => {
          this.form = {
            client_id: this.$route.params.client_id,
            consignee: undefined,
            regions: undefined,
            address: undefined,
            zipcode: undefined,
            tel: undefined,
            mobile: undefined,
            is_default: 0
          }

          this.$nextTick(() => {
            this.$refs.form.clearValidate()
          })

          this.dialogStatus = 'create'
          this.dialogLoading = false
          this.dialogFormVisible = true
        })
        .catch(() => {
          this.dialogFormVisible = false
        })
    },
    // 请求创建
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 将地区数组拆分为对应字段
          this.form.regions.forEach((value, index) => {
            switch (index) {
              case 0:
                this.form.province = value
                break
              case 1:
                this.form.city = value
                break
              case 2:
                this.form.district = value
                break
            }
          })

          this.dialogLoading = true
          addUserAddressItem({ ...this.form })
            .then(res => {
              if (this.form.is_default === 1) {
                this.$emit('update:addressId', res.data.user_address_id)
              }

              this.currentTableData.push(res.data)
              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 弹出编辑对话框
    handleUpdate(index) {
      this.currentIndex = index
      this.form = {
        ...this.currentTableData[index],
        client_id: this.$route.params.client_id
      }

      this.form.regions = [
        this.form.province || 0,
        this.form.city || 0,
        this.form.district || 0
      ]

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })

      this.dialogStatus = 'update'
      this.dialogLoading = false
      this.dialogFormVisible = true
    },
    // 请求编辑
    update() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 将地区数组拆分为对应字段
          this.form.regions.forEach((value, index) => {
            switch (index) {
              case 0:
                this.form.province = value
                break
              case 1:
                this.form.city = value
                break
              case 2:
                this.form.district = value
                break
            }
          })

          this.dialogLoading = true
          setUserAddressItem({ ...this.form })
            .then(res => {
              if (this.form.is_default === 1) {
                this.$emit('update:addressId', res.data.user_address_id)
              }

              this.$set(
                this.currentTableData,
                this.currentIndex,
                {
                  ...this.currentTableData[this.currentIndex],
                  ...res.data
                })

              this.dialogFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    }
  }
}
</script>
