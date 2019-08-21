<template>
  <div class="cs-navi">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="(item, index) in menuData"
        :key="`parent${index}`"
        :name="item.menu_id">
        <template slot="title">
          <span><cs-icon class="cs-navi__title" :name="item.icon || 'folder-o'"/>{{item.title}}</span>
        </template>

        <div class="flex-wrap">
          <div
            v-for="(sub, key) in item.children"
            :key="`sub${key}`"
            class="cs-navi__block"
            @click="handleMenuSelect(sub.path)">
            <div class="cs-navi__content">
              <div class="cs-navi__icon">
                <cs-icon :name="sub.icon || 'file-o'"/>
              </div>
              <div class="cs-navi__info">
                <p class="cs-navi__sub_title">{{sub.title}}</p>
                <p class="cs-navi__desc" :title="sub.remark">{{sub.remark}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'

export default {
  props: {
    // 外部v-model值
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      menuData: [],
      activeNames: []
    }
  },
  mixins: [
    menuMixin
  ],
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
      },
      immediate: true
    }
  },
  methods: {
    dataInit(val) {
      let menu = []
      let active = []
      const key = val.findIndex(item => item.path === this.value)

      if (key !== -1 && val[key].children) {
        // eslint-disable-next-line no-unused-vars
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
    display: flex;
    flex-wrap: wrap;
    margin: -15px auto -10px;
  }
  .cs-navi {
    padding: 20px;
    background-color: #FFF;
    .cs-navi__title {
      width: 22px;
      color: $color-info;
      font-size: 14px;
    }
    .cs-navi__block {
      width: 20%;
      box-sizing: border-box;
      padding: 0 7.5px;
      margin-top: 15px;
    }
    .cs-navi__content {
      display: flex;
      cursor: pointer;
      color: $color-info;
      border-radius: 4px;
      background-color: #F5F7FA;
      padding: 10px;
      overflow: hidden;
    }
    .cs-navi__icon {
      @extend %flex-center-row;
      min-width: 60px;
      font-size: 32px;
    }
    .cs-navi__info {
      p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cs-navi__sub_title {
        color: $color-text-main;
        height: 24px;
        font-size: 14px;
        font-weight: bold;
      }
      .cs-navi__desc {
        font-size: 12px;
        height: 23px;
      }
    }
  }
</style>
