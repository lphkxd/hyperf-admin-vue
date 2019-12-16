import { mount } from '@vue/test-utils'
import CsContainerFull from '@/components/cs-container/components/cs-container-full.vue'

describe('cs-container-full', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(CsContainerFull)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(CsContainerFull, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.cs-container-full')).toBeTruthy()
    expect(wrapper.contains('.cs-container-full__header')).toBeTruthy()
    expect(wrapper.contains('.cs-container-full__body')).toBeTruthy()
    expect(wrapper.contains('.cs-container-full__footer')).toBeTruthy()
  })

  // 渲染slot
  it('has one or more slots', () => {
    const wrapper = mount(CsContainerFull, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.text()).toMatch('header')
    expect(wrapper.text()).toMatch('body')
    expect(wrapper.text()).toMatch('footer')
  })
})
