<template>
  <cs-container>
    <template slot="header">Page 1 header</template>
    <router-view/>
    <template slot="footer">footer</template>
  </cs-container>
</template>

<script>
export default {
  name: 'page1'
}
</script>
