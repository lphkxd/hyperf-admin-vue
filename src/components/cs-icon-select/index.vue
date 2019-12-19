<template>
  <span>
    <el-popover
      ref="pop"
      v-model="pop"
      :placement="placement"
      width="300"
      trigger="click">
      <el-row type="flex" justify="end" class="cs-mb-10" v-if="clearable">
        <el-button type="danger" icon="el-icon-delete" size="mini" class="cs-fr" @click="selectIcon()">清空</el-button>
      </el-row>
      <el-input
        v-model="searchText"
        :clearable="true"
        placeholder="搜索 比如 'plus'"
        prefix-icon="el-icon-search">
      </el-input>
      <el-collapse v-if="!searchMode" class="group" v-model="collapseActive">
        <el-collapse-item v-for="(item, index) in icon.glyphs" :key="index" :title="item.name" :name="index" class="class">
          <el-row class="class-row">
            <el-col class="class-col" v-for="(iconItem, iconIndex) in item.item" :key="iconIndex" :span="4" @click.native="selectIcon(iconItem.font_class)">
              <i :class="'iconfont icon' + iconItem.font_class" :title="iconItem.name"/>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
      <div v-if="searchMode" class="group">
        <div class="class" v-for="(item, index) in iconFilted" :key="index">
          <div class="class-title">{{item.name}}</div>
          <el-row class="class-row">
            <el-col class="class-col" v-for="(iconItem, iconIndex) in item.item" :key="iconIndex" :span="4" @click.native="selectIcon(iconItem.font_class)">
              <i :class="'iconfont icon' + iconItem.font_class" :title="iconItem.name"/>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-popover>

    <el-input
      v-if="userInput"
      v-model="currentValue"
      v-bind="bind"
      :readonly="!userInput">
      <i v-if="value" slot="prefix" class="el-input__icon icon-view" :class="'iconfont icon' + value"/>
      <el-button icon="el-icon-menu" v-popover:pop slot="append"/>
    </el-input>
  </span>
</template>

<script>
import icon from './libs/iconfont.json'

export default {
  name: 'cs-icon-select',
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: ''
    },
    // 占位符
    placeholder: {
      type: String,
      required: false,
      default: '请选择'
    },
    // 弹出界面的方向
    placement: {
      type: String,
      required: false,
      default: 'right'
    },
    // 是否可清空
    clearable: {
      type: Boolean,
      required: false,
      default: true
    },
    // 是否允许用户输入
    userInput: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否在选择后自动关闭
    autoClose: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      // 绑定弹出框
      pop: false,
      // 所有图标
      icon,
      // 组件内输入框的值
      currentValue: '',
      // 搜索的文字
      searchText: '',
      // 不是搜索的时候显示的折叠面板绑定的展开数据
      collapseActive: [0]
    }
  },
  computed: {
    // 输入框上绑定的设置
    bind() {
      return {
        placeholder: this.placeholder,
        clearable: this.clearable,
        ...this.$attrs
      }
    },
    // 是否在搜索
    searchMode() {
      return !!this.searchText
    },
    // 过滤后的图标
    iconFilted() {
      return this.icon.glyphs.map(iconClass => ({
        name: iconClass.name,
        item: iconClass.item.filter(icon => icon.font_class.indexOf(this.searchText) >= 0)
      })).filter(iconClass => iconClass.item.length > 0)
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    },
    currentValue(value) {
      this.selectIcon(value)
    }
  },
  methods: {
    selectIcon(iconName = '') {
      this.$emit('input', iconName)
      if (iconName && this.autoClose) {
        this.pop = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-view {
    font-size: 24px;
    line-height: 40px;
  }
  .group {
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: scroll;
    border-top: none;
    border-bottom: none;
    .class {
      .class-title {
        line-height: 30px;
        text-align: center;
        background-color: $color-bg;
        border-radius: 4px;
        margin: 10px 0;
      }
      .class-row {
        .class-col {
          text-align: center;
          color: $color-text-sub;
          .iconfont {
            line-height: 40px;
            font-size: 24px;
          }
          &:hover {
            color: $color-text-main;
            background-color: $color-bg;
            border-radius: 4px;
            box-shadow: inset 0 0 0 1px $color-border-1;
            .iconfont {
              font-size: 38px;
            }
          }
        }
      }
    }
  }
</style>
