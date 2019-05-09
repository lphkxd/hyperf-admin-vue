<template>
  <cs-container :is-back-to-top="true">
    <div class="navigation cs-m">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(item, index) in menuData"
          :key="`parent${index}`"
          :name="item.menu_id">
          <template slot="title">
            <span><cs-icon class="icon" :name="item.icon"/>{{item.title}}</span>
          </template>

          <div
            v-for="(sub, key) in item.children"
            :key="`sub${key}`">
            {{sub.title}}
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
  .navigation {
    padding: 20px;
    background-color: #FFF;
    .icon {
      width: 22px;
      color: $color-text-normal;
      font-size: 14px;
    }
  }
</style>
