import PreviewComponent from './components/preview'

export default {
  install(Vue, options) {
    const PreviewConstructor = Vue.extend(PreviewComponent)
    const preview = new PreviewConstructor()

    preview.$mount(preview.$el)
    Vue.prototype.$preview = (imageUrl, isDialog = true) => {
      const result = preview.getImageUrl(imageUrl)
      if (isDialog) {
        preview.show(result)
        return
      }

      return result
    }
  }
}
