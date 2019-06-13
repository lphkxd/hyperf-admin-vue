import axios from 'axios'

export function getHelpRouter(router) {
  let host = process.env.VUE_APP_BASE_API
  if (process.env.NODE_ENV !== 'development') {
    host = 'https://demo.careyshop.cn/api'
  }

  return new Promise(resolve => {
    axios({
      /**
       * 帮助文档内容使用远程官方接口,便于文档统一
       * 如二次开发后文档与实际内容不一致,那么可以将
       * url 修改为 /v1/help ,表示使用本地接口
       */
      url: host + '/v1/help',
      method: 'post',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      params: {
        method: 'get.help.router'
      },
      data: {
        router,
        ver: '1.0.1',
        module: 'admin'
      }
    })
      .then(res => {
        let content = '暂无帮助内容'
        const style = 'style="float: right; margin-bottom: -10px;" class="el-button el-button--text el-button--small"'

        if (Object.keys(res.data).length > 0) {
          content = `<div class="help-content">${res.data.content}</div>`

          if (res.data.url) {
            content += `
              <div class="help-url">
                <a href="${res.data.url}" ${style} target="_blank">点击查看详细</a>
              </div>`
          }
        }

        resolve(content)
      })
      .catch(err => {
        resolve(err)
      })
  })
}
