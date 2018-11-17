import Vue from 'vue'
import csContainer from './cs-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('cs-container', csContainer)
Vue.component('cs-page-cover', () => import('./cs-page-cover'))
Vue.component('cs-highlight', () => import('./cs-highlight'))
Vue.component('cs-icon', () => import('./cs-icon'))
Vue.component('cs-icon-svg', () => import('./cs-icon-svg'))
Vue.component('cs-icon-select', () => import('./cs-icon-select'))
