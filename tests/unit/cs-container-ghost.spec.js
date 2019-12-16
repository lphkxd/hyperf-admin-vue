import { mount } from '@vue/test-utils'
import CsContainerGhost from '@/components/cs-container/components/cs-container-ghost.vue'

describe('cs-container-ghost', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(CsContainerGhost)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(CsContainerGhost, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.cs-container-ghost')).toBeTruthy()
    expect(wrapper.contains('.cs-container-ghost__header')).toBeTruthy()
    expect(wrapper.contains('.cs-container-ghost__body')).toBeTruthy()
    expect(wrapper.contains('.cs-container-ghost__footer')).toBeTruthy()
  })

  // 渲染slot
  it('has one or more slots', () => {
    const wrapper = mount(CsContainerGhost, {
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
