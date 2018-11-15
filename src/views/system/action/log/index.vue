<template>
  <cs-container>
    <page-header
      slot="header"
      :loading="loading"
      :group="group"
      @submit="handleSubmit"
      ref="header"/>
  </cs-container>
</template>

<script>
export default {
  name: 'system-action-log',
  components: {
    'PageHeader': () => import('./componnets/PageHeader')
  },
  data() {
    return {
      loading: false,
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
