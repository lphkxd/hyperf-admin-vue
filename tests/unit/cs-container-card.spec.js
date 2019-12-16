import { mount } from '@vue/test-utils'
import CsContainerCard from '@/components/cs-container/components/cs-container-card.vue'

describe('cs-container-card', () => {
  // 存在且是Vue组件实例
  it('is a vue instance', () => {
    const wrapper = mount(CsContainerCard)

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // 包含特定类名
  it('contains specific classnames', () => {
    const wrapper = mount(CsContainerCard, {
      slots: {
        default: '<div>body</div>',
        header: '<div>header</div>',
        footer: '<div>footer</div>'
      }
    })

    expect(wrapper.is('.cs-container-card')).toBeTruthy()
    expect(wrapper.contains('.cs-container-card__header')).toBeTruthy()
    expect(wrapper.contains('.cs-container-card__body')).toBeTruthy()
    expect(wrapper.contains('.cs-container-card__body-card')).toBeTruthy()
    expect(wrapper.contains('.cs-container-card__footer')).toBeTruthy()
  })

  // 渲染slot
  it('has one or more slots', () => {
    const wrapper = mount(CsContainerCard, {
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
