import { mount, createLocalVue } from '@vue/test-utils'
import CsIconSelect from '@/components/cs-icon-select/index.vue'
import ElementUI from 'element-ui'

describe('cs-icon-select', () => {
  const localVue = createLocalVue()
  localVue.use(ElementUI)

  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(CsIconSelect, {
      stubs: ['el-popover', 'el-button', 'el-input', 'el-collapse', 'el-collapse-item', 'el-col', 'el-row']
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
