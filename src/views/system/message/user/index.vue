<template>
  <cs-container
    :scrollTop="scrollTop"
    @scroll="(move) => {this.scrollTop = move.y}">
    <page-footer
      slot="footer"
      :loading="loading"
      :current="page.current"
      :size="page.size"
      :total="page.total"
      @change="() => {}"/>
  </cs-container>
</template>

<script>
export default {
  name: 'system-message-user',
  components: {
    // 'PageMain': () => import('./components/PageMain'),
    'PageFooter': () => import('@/layout/header-aside/components/footer')
  },
  data() {
    return {
      scrollTop: 0,
      loading: true,
      table: [],
      page: {
        current: 1,
        size: 25,
        total: 0
      },
      order: {
        order_type: undefined,
        order_field: undefined
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
