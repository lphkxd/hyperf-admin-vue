<template>
  <cs-container :is-back-to-top="true" parent-path="setting-logistics-delivery">
    <page-header
      slot="header"
      :title="title"/>

    <page-main
      :table-data="table"
      :loading="loading"/>
  </cs-container>
</template>

<script>
import { getDeliveryAreaList } from '@/api/logistics/area'
import { getDeliveryCompanyItem } from '@/api/logistics/company'

export default {
  name: 'setting-logistics-delivery-area',
  components: {
    'PageHeader': () => import('./components/PageHeader'),
    'PageMain': () => import('./components/PageMain')
  },
  computed: {
    change() {
      const { delivery_id, delivery_item_id } = this.$route.params
      return {
        delivery_id,
        delivery_item_id
      }
    }
  },
  data() {
    return {
      // 加载状态
      loading: true,
      // 头部标题
      title: '',
      // 表格数据
      table: []
    }
  }
}
</script>
