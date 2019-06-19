<template>
  <el-dialog
    :visible.sync="visible"
    :append-to-body="true"
    :close-on-click-modal="false"
    width="600px">
    <div style="margin-top: -25px;">
      <el-divider>所辖区域</el-divider>
      <el-tag
        v-for="item in value"
        :key="item.region_id"
        :disable-transitions="true"
        class="region-tag"
        effect="plain"
        type="info"
        @close="handleClose(item)"
        closable>
        {{item.name}}
      </el-tag>

      <div v-if="value.length <= 0" class="not-region">
        <span>暂无区域</span>
      </div>

      <el-divider>区域选择</el-divider>
      <el-tree
        v-if="visible"
        v-loading="treeLoading"
        class="tree-scroll"
        node-key="region_id"
        :props="treeProps"
        :load="loadNode"
        lazy>
          <span class="custom-tree-node action" slot-scope="{node, data}">
            <span>{{node.label}}</span>

            <span class="active">
              <el-button
                type="text"
                size="mini"
                @click.stop="() => addRegion(data)"
                icon="el-icon-plus">加入到所辖区域</el-button>
            </span>
          </span>
      </el-tree>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button
        @click="visible = false"
        size="small">取消</el-button>

      <el-button
        type="primary"
        :loading="loading"
        @click="update"
        size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRegionList } from '@/api/logistics/region'
import { setDeliveryAreaItem } from '@/api/logistics/area'

export default {
  props: {
    // 外部v-model值
    value: {
      type: Array,
      required: false,
      default: () => []
    },
    // 确认按钮事件
    confirm: {
      type: Function
    }
  },
  data() {
    return {
      areaId: 0,
      visible: false,
      loading: false,
      regionId: 1,
      treeLoading: false,
      treeProps: {
        label: 'region_name',
        children: 'children'
      }
    }
  },
  methods: {
    // 初始化弹出对话框
    handleRegionDlg(id) {
      this.areaId = id
      this.loading = false
      this.visible = true
    },
    // 移除一个区域
    handleClose(tag) {
      this.value.splice(this.value.indexOf(tag), 1)
    },
    // 动态加载节点
    loadNode(node, resolve) {
      this.treeLoading = node.level === 0
      this.getRegionData(node.level ? node.key : this.regionId, resolve)
    },
    // 获取节点
    getRegionData(regionId, resolve) {
      getRegionList({ region_id: regionId })
        .then(res => {
          const data = res.data.length ? res.data : []
          resolve(data)
        })
        .finally(() => {
          this.treeLoading = false
        })
    },
    // 添加区域
    addRegion(value) {
      const node = this.value.find(item => item.region_id === value.region_id)
      if (node) {
        this.$message.warning(`${node.name} 在所辖区域中已存在`)
        return
      }

      this.value.push({
        name: value.region_name,
        region_id: value.region_id
      })
    },
    // 修改所辖区域
    update() {
      this.loading = true
      setDeliveryAreaItem({
        delivery_area_id: this.areaId,
        region: this.value.map(item => { return item.region_id })
      })
        .then(res => {
          this.$emit('confirm', res.data.region)
          this.visible = false
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>
  .tree-scroll {
    height: 250px;
    overflow: auto;
    padding-bottom: 1px;
  }
  .region-tag {
    margin: 0 10px 10px 0;
  }
  .not-region {
    color: #99a9bf;
    text-align: center;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .active {
    display: none;
  }
  .action:hover .active{
    display: block;
  }
</style>
