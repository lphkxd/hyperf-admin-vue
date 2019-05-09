<template>
  <cs-container>
    <div class="navigation cs-m">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in menuData"
          :key="`parent${index}`"
          :name="item.menu_id">
          <template slot="title">
            <span><cs-icon class="main" :name="item.icon"/>{{item.title}}</span>
          </template>

          <div class="flex-wrap">
            <li class="block">
              <div class="content">
                <div class="icon">
                  <cs-icon :name="item.icon"/>
                </div>

                <div class="info">
                  <p class="title">首页设置</p>
                  <p class="desc">这是备注说明这是备注说明这是备注说明这是备注说明</p>
                </div>
              </div>
            </li>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </cs-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'system-index',
  data() {
    return {
      root: '/system',
      menuData: [],
      activeNames: []
    }
  },
  computed: {
    ...mapState('careyshop/menu', [
      'aside'
    ])
  },
  watch: {
    aside: {
      handler(val) {
        const { menu, active } = this.dataInit(val)
        this.menuData = menu
        this.activeNames = active
        console.log(menu)
      },
      immediate: true
    }
  },
  methods: {
    dataInit(val) {
      let menu = []
      let active = []
      const key = val.findIndex(item => item.path === this.root)

      if (key !== -1 && val[key].children) {
        for (const item of val[key].children) {
          if (this.$route.path === item.path) {
            continue
          }

          menu.push(item)
          active.push(item.menu_id)
        }
      }

      return { menu, active }
    }
  }
}
</script>

<style lang="scss" scoped>
  .flex-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: -5px auto -10px;
  }
  .navigation {
    padding: 20px;
    background-color: #FFF;
    .main {
      width: 22px;
      color: $color-info;
      font-size: 14px;
    }
    .block {
      width: 20%;
      box-sizing: border-box;
      list-style: none;
    }
    .content {
      padding: 15px;
      color: $color-info;
      background-color: #f5f7fa;
      overflow: hidden;
      display: flex;
      cursor: pointer;
    }
    .icon {
      height: 40px;
      width: 40px;
      font-size: 30px;
      line-height: 42px;
      position: relative;
    }
    .navigation-info {
      width: 90%;
    }
    .navigation-title {
    }
    .navigation-desc {
    }
  }
</style>
