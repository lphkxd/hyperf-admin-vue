<template>
  <div class="cs-p">
    <el-form
      :inline="true"
      size="small">

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleCreate">
            <cs-icon name="plus"/>
            新增目录
          </el-button>

          <el-button
            :disabled="loading"
            @click="$refs.upload.handleUploadDlg()">
            <cs-icon name="upload"/>
            上传
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="allCheckBox">
            <cs-icon name="check-square-o"/>
            全选
          </el-button>

          <el-button
            :disabled="loading"
            @click="reverseCheckBox">
            <cs-icon name="minus-square-o"/>
            反选
          </el-button>

          <el-button
            :disabled="loading"
            @click="cancelCheckBox">
            <cs-icon name="square-o"/>
            取消
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="handleMove(null)">
            <cs-icon name="arrows"/>
            移动
          </el-button>

          <el-button
            :disabled="loading"
            @click="handleDelete(null)">
            <cs-icon name="trash-o"/>
            删除
          </el-button>
        </el-button-group>
      </el-form-item>

      <el-popover
        style="float: right"
        placement="bottom-end"
        width="400"
        trigger="hover"
        title="提示"
        @show="getHelp">
        <div class="popover-content" v-html="helpContent"></div>
        <el-button
          size="small"
          slot="reference">
          <cs-icon name="question"/>
        </el-button>
      </el-popover>
    </el-form>

    <el-breadcrumb class="breadcrumb cs-mb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <a @click="switchFolder(0)">资源管理</a>
      </el-breadcrumb-item>

      <el-breadcrumb-item
        v-for="item in naviData"
        :key="item.storage_id">
        <a @click="switchFolder(item.storage_id)">{{item.name}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-checkbox-group v-model="checkList">
      <ul class="storage-list">
        <li v-for="(item, index) in currentTableData" :key="index">
          <dl>
            <dt>
              <div class="picture cs-m-15">
                <el-checkbox :label="item.storage_id" class="storage-check">&nbsp;</el-checkbox>
                <a @click="openStorage(index)"><img :src="item | getImageThumb" alt=""></a>
              </div>
              <span class="storage-name cs-ml-10" :title="item.name">{{item.name}}</span>
              <el-dropdown placement="bottom" :show-timeout="50" size="small">
                <cs-icon class="more" name="angle-double-down"/>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <cs-icon name="edit" class="more-icon"/>重命名
                  </el-dropdown-item>

                  <el-dropdown-item divided v-if="item.type !== 2">
                    <cs-icon name="cloud-upload" class="more-icon"/>替换上传
                  </el-dropdown-item>

                  <el-dropdown-item v-if="item.type === 0">
                    <cs-icon name="image" class="more-icon"/>设为封面
                  </el-dropdown-item>

                  <el-dropdown-item v-if="item.type === 2">
                    <cs-icon name="folder-open-o" class="more-icon"/>{{item.is_default ? '取消默认' : '设为默认'}}
                  </el-dropdown-item>

                  <el-dropdown-item divided>
                    <cs-icon name="arrows" class="more-icon"/>转移目录
                  </el-dropdown-item>

                  <el-dropdown-item>
                    <cs-icon name="trash-o" class="more-icon"/>删除文件
                  </el-dropdown-item>

                  <el-dropdown-item v-if="item.type === 0">
                    <cs-icon name="refresh" class="more-icon"/>清除缓存
                  </el-dropdown-item>

                  <el-dropdown-item divided v-if="item.type !== 2">
                    <cs-icon name="external-link" class="more-icon"/>复制外链
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </dt>
            <dd class="cs-ml-10">
              <p>
                <span>创建日期: {{item.create_time}}</span>
              </p>
              <p>
                <span v-if="item.type === 0">原图尺寸: {{`${item.pixel['width']},${item.pixel['height']}`}}</span>
                <span v-else>文件类型: <cs-icon :name="item.type === 1 ? 'file-o' : 'folder-o'"/></span>
              </p>
            </dd>
          </dl>
        </li>
      </ul>
    </el-checkbox-group>

    <cs-upload
      style="display: none"
      ref="upload"
      type="slot"
      :storage-id="storageId"
      @confirm="getUploadFileList"/>

    <el-dialog
      :title="nameMap[nameStatus]"
      :visible.sync="nameFormVisible"
      :append-to-body="true"
      width="600px">
      <el-form
        :model="nameForm"
        :rules="rules"
        ref="name"
        label-width="80px">
        <el-form-item
          label="名称"
          prop="name">
          <el-input
            v-model="nameForm.name"
            placeholder="请输入目录名称"
            clearable/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="nameFormVisible = false"
          size="small">取消</el-button>

        <el-button
          v-if="nameStatus === 'create'"
          type="primary"
          :loading="dialogLoading"
          @click="create"
          size="small">确定</el-button>

        <el-button
          v-else type="primary"
          :loading="dialogLoading"
          @click="() => {}"
          size="small">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="移动资源"
      :visible.sync="moveFormVisible"
      :append-to-body="true"
      width="600px">

      <el-tree
        style="margin-top: -25px;"
        node-key="storage_id"
        :data="directoryList"
        :props="directoryProps"
        :highlight-current="true"
        :default-expand-all="true"
        ref="directory">
        <span class="custom-tree-node" slot-scope="{node}">
          <i class="fa fa-folder-o" style="width: 16px;"></i>
          <span>{{node.label}}</span>
        </span>
      </el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="moveFormVisible = false"
          size="small">取消</el-button>

        <el-button
          type="primary"
          :loading="dialogLoading"
          @click="moveStorage"
          size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/utils/util'
import storage from '../mixins'
import { getHelpRouter } from '@/api/index/help'
import {
  delStorageList,
  addStorageDirectoryItem,
  getStorageDirectorySelect,
  moveStorageList
} from '@/api/upload/storage'

export default {
  mixins: [storage],
  components: {
    'csUpload': () => import('@/components/cs-upload')
  },
  props: {
    tableData: {
      default: () => []
    },
    naviData: {
      default: () => []
    },
    loading: {
      default: false
    },
    storageId: {
      default: 0
    }
  },
  data() {
    return {
      currentTableData: [],
      helpContent: '',
      checkList: [],
      dialogLoading: false,
      nameForm: {},
      nameFormVisible: false,
      nameStatus: '',
      nameMap: {
        update: '重命名',
        create: '新增目录'
      },
      moveFormVisible: false,
      moveIdList: [],
      directoryList: [],
      directoryProps: {
        label: 'name',
        children: 'children'
      },
      rules: {
        name: [
          {
            required: true,
            message: '目录名称不能为空',
            trigger: 'blur'
          },
          {
            max: 255,
            message: '长度不能大于 255 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.checkList = []
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    // 获取帮助文档
    getHelp() {
      if (!this.helpContent) {
        this.helpContent = '正在获取内容,请稍后...'
        getHelpRouter(this.$route.path).then(res => { this.helpContent = res })
      }
    },
    // 打开资源
    openStorage(index) {
      // 当前资源对象
      const storage = this.currentTableData[index]
      switch (storage['type']) {
        case 0:
          this.$preview('//' + storage['url'])
          break

        case 1:
          util.open(util.getDownloadUrl(storage, ''))
          break

        case 2:
          this.switchFolder(storage['storage_id'])
          break

        default:
          this.$message.warning('打开资源出现异常操作')
      }
    },
    // 资源上传成功后处理
    getUploadFileList(files) {
      let pos = -1
      this.currentTableData.forEach((value, index) => {
        if (value.type === 2) {
          pos = index
        }
      })

      for (const value of files) {
        if (value.status !== 'success') {
          continue
        }

        const response = value.response
        if (!response || response.status !== 200) {
          continue
        }

        this.currentTableData.splice(pos + 1, 0, response.data[0])
      }
    },
    // 批量删除
    handleDelete(val) {
      const storageId = val ? [val] : this.checkList
      if (storageId.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delStorageList(storageId)
            .then(() => {
              for (let i = this.currentTableData.length - 1; i >= 0; i--) {
                if (storageId.indexOf(this.currentTableData[i].storage_id) !== -1) {
                  this.currentTableData.splice(i, 1)
                }
              }

              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', this.storageId)
              }

              this.directoryList = []
              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 新建目录
    handleCreate() {
      this.nameForm = {
        name: undefined,
        parent_id: this.storageId
      }

      this.$nextTick(() => {
        this.$refs.name.clearValidate()
      })

      this.dialogLoading = false
      this.nameStatus = 'create'
      this.nameFormVisible = true
    },
    // 请求创建目录
    create() {
      this.$refs.name.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          addStorageDirectoryItem(this.nameForm)
            .then(res => {
              this.currentTableData.unshift({
                ...res.data
              })

              this.directoryList = []
              this.nameFormVisible = false
              this.$message.success('操作成功')
            })
            .catch(() => {
              this.dialogLoading = false
            })
        }
      })
    },
    // 获取可选择目录
    getStorageDirectory() {
      if (!this.directoryList.length) {
        getStorageDirectorySelect()
          .then(res => {
            this.directoryList = res.data.list.length
              ? util.formatDataToTree(res.data.list, 'storage_id')
              : []

            this.directoryList.unshift({
              storage_id: 0,
              parent_id: 0,
              name: '根目录'
            })
          })
      }
    },
    // 移动目录
    handleMove(val) {
      const storageId = val ? [val] : this.checkList
      if (storageId.length === 0) {
        this.$message.error('请选择要操作的数据')
        return
      }

      this.getStorageDirectory()
      this.moveIdList = storageId
      this.dialogLoading = false
      this.moveFormVisible = true
    },
    // 请求移动目录
    moveStorage() {
      const node = this.$refs.directory.getCurrentNode()
      if (!node) {
        this.$message.error('请选择需要移动到的目录')
        return
      }

      this.dialogLoading = true
      moveStorageList(this.moveIdList, node.storage_id)
        .then(res => {
          if (res.data.length) {
            this.$emit('refresh', this.storageId)
          }

          this.checkList = []
          this.directoryList = []
          this.moveFormVisible = false
          this.$message.success('操作成功')
        })
        .catch(() => {
          this.dialogLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .breadcrumb {
    background-color: #fff;
    border: 1px solid $color-border-1;
    padding: 10px !important;
  }
  .storage-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    margin: 0;
    border-style: solid;
    border-color: $color-border-1;
    border-width: 1px 0 0 1px;
    background-color: #fff;
  }
  .storage-list li {
    float: left;
    width: 204px;
    height: 298px;
    font-size: 13px;
    opacity: 1;
    border-style: solid;
    border-color: $color-border-1;
    border-width: 0 1px 1px 0;
  }
  .storage-list>li:hover {
     background-color: $color-bg;
  }
  .storage-list>li:hover .more {
    display: inline-block;
  }
  .storage-list li dl dt .picture {
    border: solid 1px #FAFAFA;
  }
  .storage-list li dl dt .covers a,
  .storage-list li dl dt .picture a {
    background-color: #fff;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
    width: 172px;
    height: 172px;
    overflow: hidden;
    cursor: pointer;
  }
  .storage-list li dl dt .covers a img,
  .storage-list li dl dt .picture a img {
    max-width: 172px;
    max-height: 172px;
    vertical-align: middle;
    border: 0;
  }
  .storage-list li:after {
    content: "";
    height: 100%;
  }
  .storage-list li:after,
  .storage-list li span {
    display: inline-block;
    vertical-align: middle;
  }
  .storage-list li span {
    line-height: normal;
    color: $color-text-sub;
    transition: color .15s linear;
  }
  .storage-list .storage-name {
    color: $color-text-main;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    width:170px;
    height: 20px;
  }
  .storage-list .more {
    width: 20px;
    height: 15px;
    color: $color-primary;
    cursor: pointer;
    display: none;
  }
  .more-icon {
    width: 16px;
    margin-right: 10px !important;
  }
  .storage-check {
    position: absolute;
    margin: 3px 0 0 3px;
    width: 30px;
    height: 30px;
  }
</style>
