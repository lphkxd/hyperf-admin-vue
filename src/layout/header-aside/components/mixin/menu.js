import util from '@/utils/util'

export default {
  methods: {
    handleMenuSelect(index, indexPath) {
      if (!index || /^cs-menu-empty-\d+$/.test(index)) {
        this.$message.warning('临时菜单')
      } else if (/^https:\/\/|http:\/\//.test(index)) {
        util.open(index)
      } else {
        this.$router.push({ path: index })
      }
    }
  }
}
