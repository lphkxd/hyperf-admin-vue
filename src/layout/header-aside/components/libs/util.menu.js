import { uniqueId } from 'lodash'

// 创建 el-menu-item
export function elMenuItem(createElement, menu) {
  return createElement('el-menu-item',
    {
      props: {
        index: menu.path || uniqueId('cs-menu-empty-')
      }
    }, [
      ...menu.icon ? [
        createElement('i', {
          attrs: {
            class: `iconfont icon${menu.icon}`
          }
        })
      ] : [],
      ...!menu.icon && !menu.iconSvg ? [
        createElement('i', {
          attrs: { class: 'el el-icon-document' }
        })
      ] : [],
      ...menu.iconSvg ? [
        createElement('cs-icon-svg', {
          props: { name: menu.iconSvg }
        })
      ] : [],
      createElement('span', { slot: 'title' }, menu.title || '未命名菜单')
    ])
}

// 创建 el-submenu
export function elSubmenu(createElement, menu) {
  return createElement('el-submenu',
    {
      props: {
        index: menu.path || uniqueId('cs-menu-empty-')
      }
    }, [
      ...menu.icon ? [
        createElement('i', {
          slot: 'title', attrs: { class: `iconfont icon${menu.icon}` }
        })
      ] : [],
      ...!menu.icon && !menu.iconSvg ? [
        createElement('i', {
          slot: 'title', attrs: { class: 'el el-icon-folder' }
        })
      ] : [],
      ...menu.iconSvg ? [
        createElement('cs-icon-svg', {
          slot: 'title', props: { name: menu.iconSvg }
        })
      ] : [],
      createElement('span', { slot: 'title' }, menu.title || '未命名菜单'),
      ...menu.children.map(child => (child.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, child))
    ])
}
