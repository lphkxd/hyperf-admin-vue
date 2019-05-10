<template>
  <cs-container>
    <page-navi class="cs-m" v-model="root"/>
  </cs-container>
</template>

<script>
export default {
  name: 'setting-index',
  components: {
    'PageNavi': () => import('@/layout/header-aside/components/header-navi')
  },
  data() {
    return {
      root: '/setting'
    }
  }
}
</script>
