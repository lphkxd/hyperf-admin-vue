import { mount } from '@vue/test-utils'
import CsContainerFrame from '@/components/cs-container-frame/index.vue'

describe('cs-container-frame', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(CsContainerFrame, {
      stubs: ['cs-container']
    })

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(CsContainerFrame, {
      stubs: ['cs-container']
    })

    expect(wrapper.contains('.cs-container-frame')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(CsContainerFrame, {
      stubs: ['cs-container'],
      propsData: {
        src: 'https://www.careyshop.cn/'
      }
    })

    expect(wrapper.props().src).toEqual('https://www.careyshop.cn/')
  })
})
