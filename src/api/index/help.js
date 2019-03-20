import request from '@/utils/request'

export function getHelpRouter(router) {
  return new Promise(resolve => {
    request({
      url: '/v1/help',
      method: 'post',
      params: {
        method: 'get.help.router'
      },
      data: {
        router: router,
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
  })
}
