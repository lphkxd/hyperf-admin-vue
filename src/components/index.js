import Vue from 'vue'

import csContainer from '@/components/cs-container'
import csPageClose from '@/components/cs-page-close'

Vue.component('cs-container', csContainer)
Vue.component('cs-page-close', csPageClose)

Vue.component('cs-icon', () => import('@/components/cs-icon'))
Vue.component('cs-theme-list', () => import('@/components/cs-theme-list'))
Vue.component('cs-page-cover', () => import('@/components/cs-page-cover'))
