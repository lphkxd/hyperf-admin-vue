<template>
  <cs-container>
    <page-navi class="cs-m" v-model="root"/>
  </cs-container>
</template>

<script>
export default {
  name: 'promotion-index',
  components: {
    'PageNavi': () => import('@/layout/header-aside/components/header-navi')
  },
  data() {
    return {
      root: '/promotion'
    }
  }
}
</script>
