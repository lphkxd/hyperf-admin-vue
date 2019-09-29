<template>
  <cs-container :is-back-to-top="true" parent-path="goods-admin-list">
    {{goods_id}}
  </cs-container>
</template>

<script>
export default {
  props: {
    goods_id: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
