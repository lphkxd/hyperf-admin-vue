<template>
  <div class="cs-contentmenu-list" @click="rowClick">
    <div v-for="item in menulist" :key="item.value" :data-value="item.value" class="cs-contentmenu-item" flex="cross:center main:center">
      <i v-if="item.icon" :class="item.icon"/>
      <div class="cs-ml-5" flex-box="1">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cs-contextmenu-list',
  props: {
    menulist: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    rowClick(event) {
      let target = event.target
      while (!target.dataset.value) {
        target = target.parentNode
      }
      this.$emit('rowClick', target.dataset.value)
    }
  }
}
</script>

<style lang="scss">
.cs-contentmenu-list {
  .cs-contentmenu-item {
    padding: 8px 20px 8px 15px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    &:hover {
      background: #ecf5ff;
      color: #66b1ff;
    }
  }
}
</style>
