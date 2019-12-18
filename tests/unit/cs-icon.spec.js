import { mount } from '@vue/test-utils'
import CsIcon from '@/components/cs-icon/index.vue'

describe('cs-icon', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(CsIcon)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(CsIcon, {
      propsData: {
        name: 'font-awesome'
      }
    })

    expect(wrapper.is('.iconfont')).toBeTruthy()
    expect(wrapper.contains('.iconfont-awesome')).toBeTruthy()
  })

  // props
  it('has props', () => {
    const wrapper = mount(CsIcon, {
      propsData: {
        name: 'font-awesome'
      }
    })

    expect(wrapper.props().name).toEqual('font-awesome')
  })
})
