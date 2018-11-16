/**
 * 获取顾客组类型
 * @returns {Promise<any>}
 */
export function getClientType() {
  return new Promise(resolve => {
    resolve({
      '1': '管理组',
      '0': '顾客组',
      '-1': '游客组'
    })
  })
}
