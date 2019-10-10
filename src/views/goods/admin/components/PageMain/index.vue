<template>
  <div class="cs-p">
    <el-form :inline="true" size="small">
      <el-form-item v-if="tabPane !== 'delete'">
        <el-button
          :disabled="loading"
          @click="() => {}">
          <cs-icon name="plus"/>
          新增商品
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane === 'stock'">
        <el-button
          :disabled="loading"
          @click="() => {}">
          <cs-icon name="level-up"/>
          上架
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane === 'sale'">
        <el-button
          :disabled="loading"
          @click="() => {}">
          <cs-icon name="level-down"/>
          下架
        </el-button>
      </el-form-item>

      <el-form-item v-if="tabPane !== 'delete'">
        <el-dropdown placement="bottom">
          <el-button
            :disabled="loading">
            <cs-icon name="thumbs-o-up"/>
            推荐
            <cs-icon name="angle-down"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设为推荐</el-dropdown-item>
            <el-dropdown-item>取消推荐</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item v-if="tabPane !== 'delete'">
        <el-dropdown placement="bottom">
          <el-button
            :disabled="loading">
            <cs-icon name="star-o"/>
            新品
            <cs-icon name="angle-down"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设为新品</el-dropdown-item>
            <el-dropdown-item>取消新品</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item v-if="tabPane !== 'delete'">
        <el-dropdown placement="bottom">
          <el-button
            :disabled="loading">
            <cs-icon name="sun-o"/>
            热卖
            <cs-icon name="angle-down"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设为热卖</el-dropdown-item>
            <el-dropdown-item>取消热卖</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>

      <el-form-item>
        <el-button-group>
          <el-button
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="trash-o"/>
            {{tabPane === 'delete' ? '彻底删除' : '删除'}}
          </el-button>

          <el-button
            v-if="tabPane === 'delete'"
            :disabled="loading"
            @click="() => {}">
            <cs-icon name="reply"/>
            恢复
          </el-button>
        </el-button-group>
      </el-form-item>

      <cs-help
        :router="$route.path"
        style="padding-bottom: 19px;">
      </cs-help>
    </el-form>

    <el-tabs
      v-model="tabPane"
      v-loading="loading"
      :before-leave="handleBefore"
      class="tab-box">
      <el-tab-pane
        v-for="(item, index) in tabList"
        :key="index"
        :label="item"
        :name="index">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      default: false
    },
    tableData: {
      default: () => []
    },
    tabsConfig: {
      default: () => {}
    }
  },
  data() {
    return {
      tabPane: 'sale',
      tabList: { 'sale': '出售中', 'stock': '已下架', 'delete': '回收站' }
    }
  },
  methods: {
    // 点击切换标签
    handleBefore(activeName) {
      let config = { status: 1, is_delete: 0 }
      switch (activeName) {
        case 'stock':
          config.status = 0
          break

        case 'delete':
          config.is_delete = 1
          break
      }

      this.$emit('tabs', config)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tab-box {
    padding: 5px 10px;
    background-color: #FFF;
  }
</style>
