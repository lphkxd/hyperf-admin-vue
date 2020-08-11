<template>
  <div :key="key" v-loading="loading" :class="loading ? 'loading' : ''">
    <div v-if="!loading">
      <v-form
        :key="key"
        :rules="rule"
        :data-version-enable="versionEnable"
        :data-versions="versions"
        :compute-when="computeWhen"
        save-api="/dev/make"
        :router-back="false"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VForm from '@/components/scaffold/VForm.vue'
import request from '@/utils/request'
import { strVarReplace } from '@/utils'
import VJson from '@/components/Common/VJson'

Vue.component('v-jsoneditor', VJson)
export default {
  components: {
    VForm
  },
  data() {
    return {
      isStep: false,
      rule: [],
      loading: true,
      versionEnable: false,
      versions: [],
      stepType: 'card',
      computeWhen: {
        resource: {},
        computeMap: {}
      }
    }
  },
  computed: {
    key: function() {
      this.formRule()
      return this.$route.query._ver || ''
    }
  },
  created() {},
  methods: {
    formRule() {
      const part = this.$route.path.split('/')
      request({
        url: '/dev/' + part[2] || 'controllermaker',
        method: 'get',
        params: this.$route.query
      }).then(res => {
        this.rule = res.form
        this.rule.forEach(item => {
          if (item.section !== undefined) {
            this.isStep = true
          }
        })
        this.versionEnable = res.version_enable
        this.versions = res.version_list
        this.stepType = res.step_type || 'card'
        this.loading = false
        this.computeWhen.computeMap = res.compute_map
      })
    },
    onChange(fApi, field, val) {
      console.log('marker', fApi, field, val)
      if (field === 'pool') {
        const url = strVarReplace(fApi.getRule('database').props.selectApi, fApi.formData())
        request({ url }).then(res => {
          console.log('maker', res)
          fApi.updateRule('database', { options: res, props: { remote: false }})
        })
      }
      if (field === 'database') {
        const url = strVarReplace(fApi.getRule('table').props.selectApi, fApi.formData())
        request({ url }).then(res => {
          console.log('maker', res)
          fApi.updateRule('table', { options: res, props: { remote: false }})
        })
      }
      if (field === 'table') {
        const url = strVarReplace('/dev/tableSchema?pool={pool}&db={database}&table={table}', fApi.formData())
        request({ url }).then(res => {
          console.log('maker schema', res)
          fApi.updateRule('form', { value: res })
        })
      }
    }
  }
}

</script>

<style scoped>
  .loading {
    height: 500px;
  }
</style>

