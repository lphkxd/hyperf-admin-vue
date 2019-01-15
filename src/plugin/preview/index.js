import PreviewComponent from './components/preview'

export default {
  install(Vue, options) {
    const PreviewConstructor = Vue.extend(PreviewComponent)
    const preview = new PreviewConstructor()

    // preview.$mount(document.createElement('div'))
    // document.body.appendChild(preview.$el)
    preview.$mount(preview.$el)

    Vue.prototype.$preview = function(imageUrl) {
      preview.showImagePreview(imageUrl)
    }
  }
}
