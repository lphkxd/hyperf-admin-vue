module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime/
    '@babel/plugin-transform-runtime'
  ],
  // 允许两种编码引入方式共存,也就是 common 规范与 es6 规范的共存处理
  sourceType: 'unambiguous'
}
