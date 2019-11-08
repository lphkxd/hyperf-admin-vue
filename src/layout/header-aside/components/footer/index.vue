<template>
  <el-pagination
    :current-page="current"
    :page-size="size"
    :total="total"
    :page-sizes="sizes"
    :disabled="loading"
    :layout="sizes.includes(size) ? layout : simple"
    style="margin: -10px -5px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    current: {
      default: 0
    },
    size: {
      default: 0
    },
    total: {
      default: 0
    },
    loading: {
      default: false
    }
  },
  data() {
    return {
      sizes: [10, 25, 50, 100, 250, 500],
      layout: 'total, sizes, prev, pager, next, jumper',
      simple: 'total, prev, pager, next, jumper'
    }
  },
  methods: {
    ...mapActions('careyshop/db', [
      'databasePage'
    ]),
    handleSizeChange(val) {
      this.databasePage({ user: true })
        .then(res => {
          res.set('size', val).write()
        })

      this.$emit('change', {
        current: this.current,
        size: val,
        total: this.total
      })
    },
    handleCurrentChange(val) {
      this.$emit('change', {
        current: val,
        size: this.size,
        total: this.total
      })
    }
  }
}
</script>
