import Vue from 'vue'
import csContainer from './cs-container'

// 注意 有些组件使用异步加载会有影响
Vue.component('cs-container', csContainer)
Vue.component('cs-highlight', () => import('./cs-highlight'))
Vue.component('cs-icon', () => import('./cs-icon'))
Vue.component('cs-icon-select', () => import('./cs-icon-select'))
Vue.component('cs-icon-svg', () => import('./cs-icon-svg'))
Vue.component('cs-help', () => import('./cs-help'))
