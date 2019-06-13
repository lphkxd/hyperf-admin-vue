<template>
  <cs-container-frame src="https://doc.d2admin.fairyever.com/zh/"/>
</template>

<script>
export default {
  name: 'cloud',
  props: {
  },
  components: {
    'CsContainerFrame': () => import('@/components/cs-container-frame')
  }
}
</script>
