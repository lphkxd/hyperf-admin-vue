<template>
  <div :key="key" v-loading="loading" :class="loading ? 'loading' : ''">
    <div v-if="!loading">
      <step-form v-if="isStep" :key="key" :rules="rule" :data-version-enable="versionEnable" :data-versions="versions" :type="stepType" :compute-map="computeMap" :options="options" />
      <v-form v-else :key="key" :rules="rule" :data-version-enable="versionEnable" :data-versions="versions" :compute-map="computeMap" :option="options" />
    </div>
  </div>
</template>

<script>
import VForm from '@/components/scaffold/VForm.vue'
import StepForm from '@/components/scaffold/StepForm'
import request from '@/utils/request'
export default {
  components: {
    VForm,
    StepForm
  },
  data() {
    return {
      isStep: false,
      rule: [],
      loading: true,
      versionEnable: false,
      versions: [],
      stepType: 'card',
      computeMap: {},
      options: {}
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
      request({
        url: this.$route.path,
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
        this.computeMap = res.compute_map
        this.options = res.form_ui || {}
      })
    }
  }
}

</script>

<style scoped>
  .loading {
    height: 500px;
  }
</style>

